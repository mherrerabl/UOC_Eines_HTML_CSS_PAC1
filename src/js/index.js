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
//Canvia el número de columnes de SwiperJS
function gridSwiper(wWidth) {
    if (wWidth < 479){
        $('swiper-container').attr('slides-per-view', '1');
    }else if(wWidth < 800){
        $('swiper-container').attr('slides-per-view', '2');
    }else if (wWidth > 801){
        $('swiper-container').attr('slides-per-view', '4');
    }
}

$(function() {
    let wWidth = $(window).width();
    gridSwiper(wWidth);
    swiperDetail(wWidth)
});

$(window).on("resize", function(){  
    let wWidth = $(window).width();
    gridSwiper(wWidth);
    swiperDetail(wWidth);
});

//Afegeix el mapa a la pàgina principal
if($(".containerIndex")[0]){
    const mapOptions = {
        center: [34.413836863583136, 135.86368042265963],
        zoom: 10
    }
    
    const map = new L.map('mapIndex', mapOptions);
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png');
    map.addLayer(layer);
    
    let markerOptions = {
        title: "Prefectrua de Nara",
        clickable: true,
        draggable: true
    }
    const marker = new L.Marker([34.413836863583136, 135.86368042265963], markerOptions);
    //repetir marker
    marker.bindPopup('<img style="width: 200px" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/T%C5%8Ddai-ji_Kon-d%C5%8D.jpg"><p style="text-align: center">Prefectura de Nara</p>').openPopup();
    marker.addTo(map);
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


/*****DETAIL*****/
//Rep l'id de l'element selecionat (<a>) i l'emmagatzema en localStorage
let detailClicked = localStorage.getItem("detail");
$(".categoryCard a").on("click", function(event){
    detailClicked  = event.target.id;
    localStorage.setItem("detail", detailClicked);
});

//Busca en el document JSON la informació segons la categoria i el detall per crea la pàgina de detall
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
        let htmlOtherPage = "<div class='card'>"+
                                "<img src='"+el.img[0][0]+"' alt=''>"+
                                "<h4>"+el.title+"</h4>"+
                            "</div>";
        
        $(".swiper1").add("p");
        n++;
    });

}

function swiperDetail(wWidth){
    let swiper;

    if (wWidth < 479){
        swiper = new Swiper(".swiper-container", {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
          });
    }else if(wWidth < 800){
        swiper = new Swiper(".swiper-container", {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
          });
    }else if (wWidth > 801){
        swiper = new Swiper(".swiper-container", {
            loop: true,
            slidesPerView: 4,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
          });
    }
}
    
