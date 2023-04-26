//IMPORT
import * as $  from "jquery";
import data from '../json/categories.json';
import Swiper from '../../node_modules/swiper/swiper-bundle.esm.browser.min'


/*****HEADER*****/
//Menu
//Inserta el menú desplegable, el mostra. Quan es tanca, s'esborra
const contentMenu = '<ul class="menuUl"><li><a href="./about.html">Sobre Nara</a></li><li><a href="./category.html">Punts d&apos;interès</a></li><li><a href="./category.html">Gastronomia</a></li><li><a id="activitats" href="./category.html">Activitats</a></li><li><a href="./category.html">Allotjaments turístics</a></li></ul>'

$(".iconMenu").on("click", function(){
    if($(".menu").find(".menuUl").length <= 0){
        $(".menu").append(contentMenu).hide();
        $(".menu").slideDown("slow");
    }else{
        $(".menu").slideUp("slow");
        setTimeout(() => {
            $(".menuUl").remove();
        }, 2000);   
    } 
});

//Si es prem fora del menú, es tanca
$(document).on('click',function(e){
    if(!(($(e.target).closest(".menuUl").length > 0 ) || ($(e.target).closest(".iconMenu").length > 0))){
        $(".menu").slideUp("slow");
        setTimeout(() => {
            $(".menuUl").remove();
        }, 2000);   
   }
});

//Slider de les imatges de la capçalera
let slideIndex = 1;
showDivs(slideIndex);

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

let n = 1;
setInterval(() => {
    showDivs(slideIndex += n);
    n++;
    n == 4 ? n = 1 : n;
}, 5000);


/*****INDEX*****/
//Afegeix el mapa a la pàgina principal
if($(".containerIndex")[0]){
    createMap('mapIndex', 34.413836863583136, 135.86368042265963, "https://upload.wikimedia.org/wikipedia/commons/2/2f/T%C5%8Ddai-ji_Kon-d%C5%8D.jpg", "Prefectura de Nara", 10);
}



/*****CATEGORY******/
let categoryClicked = localStorage.getItem("category");

//Rep l'id de l'element selecionat (<a>) i l'emmagatzema en localStorage
$(".navBigScreen a").on("click", function(event){
    categoryClicked = event.target.id;
    localStorage.setItem("category", categoryClicked);
});

$(".menu a").on("click", function(event){
    categoryClicked  = event.target.id;
    localStorage.setItem("category", categoryClicked);
});

$("footer a").on("click", function(event){
    categoryClicked  = event.target.id;
    localStorage.setItem("category", categoryClicked);
});

//Crea el contingut de la pàgina
if ($(".containerCategory")[0]) {
    const arrArch = data["architecture"].information;
    arrArch.forEach( a => {
        $(".containerCategory ul").append(`<li class="categoryCard">
                                                    <img src="${a.img[0].url}" alt="">
                                                        <h4>${a.name}</h4>
                                                        <a href="./detail.html" id="arch${a.id}">Més informació</a>
                                                    
                                            </li>`);
    });
    /*
            
    */
}


/*****DETAIL*****/
//Rep l'id de l'element selecionat (<a>) i l'emmagatzema en localStorage
let detailClicked = localStorage.getItem("detail");
$(".categoryCard a").on("click", function(event){
    detailClicked  = event.target.id;
    localStorage.setItem("detail", detailClicked);
});

//Verifica que sigui la pàgina Detail i crea el contingut de la pàgina
if ($(".containerDetail")[0]) {
    const infoCategory = data[categoryClicked];
    
    //Crea la pàgina d'Allotjaments
    if(categoryClicked === "accommodations"){
        const title = `<h2>${infoCategory.title}</h2>`;
        const introduction = `<p>${infoCategory.introduction}</p>`;
        const objHotels = infoCategory.information;
        $(".containerDetail article").addClass("accommodation");
        $(".containerDetail article").append(title);
        $(".containerDetail article").append(introduction);
        objHotels.forEach(hotel => {
            $(".containerDetail article").append(`<section>
                                                    <h3>${hotel.name}</h3>
                                                    <p>${hotel.description}</p>
                                                    <p class="price">El preu per nit és de ${hotel.price}€.</p>
                                                    <div id="map${hotel.id}" class="accommodationMap"></div>
                                                    <p>Per a més informació visiti la web oficial: <a href="${hotel.url}">${hotel.name}</a></p>
                                                </section>`);
            
            createMap(`map${hotel.id}`, hotel.latitude, hotel.altitude, "", hotel.ubication, 15);
        });
    }

    //Crea la pàgina Gastronomia
    if(categoryClicked === "gastronomy"){
        const title = `<h2>${infoCategory.title}</h2>`;
        const objFoods = infoCategory.information;
        $(".containerDetail article").addClass("gastronomy");
        $(".containerDetail article").append(title);

        objFoods.forEach( food => {
            $(".containerDetail article").append(`<section>
                                                    <h3>${food.name}</h3>
                                                    <p>${food.description}</p>
                                                    <figure>
                                                        <img src="${food.img}" alt="">
                                                        <figcaption><a href="${food.attribution.url}">${food.attribution.author}</a></figcaption>
                                                    </figure>
                                                    
                                                </section>`);
        });
            
    }

    //Crea la pàgina Punts d'interès
    if (categoryClicked === "architecture") {
        const title = `<h2>${infoCategory.title}</h2>`;
        const objArch = infoCategory.information;
        $(".containerDetail article").addClass("architecture");
        $(".containerDetail article").append(title);
        console.log(detailClicked);
            objArch.forEach(a => {
                console.log(a);
            });
    }
}


//Busca en el document JSON la informació segons la categoria i el detall per crea la pàgina de detall
/*
const getDetail = localStorage.getItem("detail");
const infoCategory = data[categoryClicked];
let objDetail = {};
let otherDetail = [];

if(getDetail != undefined){
    infoCategory.forEach(element => {
        objDetail = element[getDetail];
    });

    infoCategory.map(a => {
        Object.keys(a).map( o => {
            if(o !== getDetail){
                otherDetail.push(a[o]);
            }
        });
    });
    
    let htmlDetail = "<h2>"+objDetail.title+"</h2>"+
                            "<img class='imgCover' src='"+objDetail.img[0][0]+"' alt=''>"+
                            "<p>"+objDetail.description[0][0]+"</p>"+
                            "<img class='imgCover' src='"+objDetail.img[0][1]+"' alt=''>"+
                            "<p>"+objDetail.description[0][1]+"</p>"+
                            "<img class='imgCover' src='"+objDetail.img[0][2]+"' alt=''>"+
                            "<p>"+objDetail.description[0][2]+"</p>";
                            
    $(".containerDetail article").append(htmlDetail);

    otherDetail.forEach( el => {
        let n = 1;
        let htmlOtherPage = '<div class="swiper-slide">'+
                        '<div class="card">'+
                            '<img src="img/1.jpg" alt="">'+
                            '<h4>Detall</h4>'+
                        '</div>'+
                    '</div>';
        $(".containerDetail .swiper-wrapper").append(htmlOtherPage);
        n++;
    });
}
*/

/**********GENEREAL FUNCTIONS***********/
//Crea el mapa segons la latitud i l'altitud
function createMap(el, lat, alt, img, title, zoom){
    const mapOptions = {
        center: [lat, alt],
        zoom: zoom
    }
    
    const map = new L.map(el, mapOptions);
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png');
    map.addLayer(layer);
    
    let markerOptions = {
        title: "Prefectrua de Nara",
        clickable: true,
        draggable: true
    }
    const marker = new L.Marker([lat, alt], markerOptions);
    if(img === ""){
        marker.bindPopup('<p style="text-align: center">'+title+'</p>').openPopup();
    }else{
        marker.bindPopup('<img style="width: 200px" src="'+img+'"><p style="text-align: center">'+title+'</p>').openPopup();
    }
    marker.addTo(map);
}

//Canvia el número de columnes de SwiperJS
function gridSwiper(wWidth) {
    if (wWidth < 479){
        $('swiper-container').attr('slides-per-view', '1');
        createSwiper(1);
    }else if(wWidth < 800){
        $('swiper-container').attr('slides-per-view', '2');
        createSwiper(2);
    }else if (wWidth > 801){
        $('swiper-container').attr('slides-per-view', '4');
        createSwiper(4);
    }
}

//Crea un swiper per la pàgina de Detall
function createSwiper(numCol) {
    let swiper = new Swiper(".swiperDetail .swiper-container", {
        loop: true,
        slidesPerView: numCol,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
      });
}

$(function() {
    let wWidth = $(window).width();
    gridSwiper(wWidth);
});

$(window).on("resize", function(){  
    let wWidth = $(window).width();
    gridSwiper(wWidth);
});
    
