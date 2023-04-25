//IMPORT
import * as $  from "jquery";
import data from '../json/categories.json';

/*****HEADER*****/
//Menu
const content = '<ul class="menuUl"><li><a href="./about.html">Sobre Nara</a></li><li><a href="./category.html">Punts d&apos;interès</a></li><li><a href="">Gastronomia</a></li><li><a href="">Planifica el teu viatge</a></li></ul>'

$(".iconMenu").on("click", function(){
    if($(".menu").find(".menuUl").length <= 0){
        $(".menu").append(content).hide();
        $(".menu").slideDown("slow");
    }else{
        $(".menu").slideUp("slow");
        setTimeout(() => {
            $(".menuUl").remove();
        }, 2000);   
    } 
});

$(document).on('click',function(e){
    if(!(($(e.target).closest(".menuUl").length > 0 ) || ($(e.target).closest(".iconMenu").length > 0))){
        $(".menu").slideUp("slow");
        setTimeout(() => {
            $(".menuUl").remove();
        }, 2000);   
   }
  });

//Slider img
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


/*****Index*****/
//Change the number of items of SwiperJS
function gridSwiper(wWidth) {
    if (wWidth < 479){
        $('swiper-container').attr('slides-per-view', '1');
    }else if(wWidth < 800){
        $('swiper-container').attr('slides-per-view', '2');
    }else if (wWidth > 801){
        $('swiper-container').attr('slides-per-view', '4')
    }
}

$(function() {
    let wWidth = $(window).width();
    gridSwiper(wWidth);
});

$(window).on("resize", function(){  
    let wWidth = $(window).width();

    gridSwiper(wWidth);
});

//map
const mapOptions = {
    center: [34.413836863583136, 135.86368042265963],
    zoom: 10
}

const map = new L.map('mapIndex', mapOptions);
const layer = new L.TileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png');
map.addLayer(layer);
/*
let markerOptions = {
    title: "Prefectrua de Nara",
    clickable: true,
    draggable: true
}*/
const marker = new L.Marker([34.413836863583136, 135.86368042265963]/*, markerOptions*/);
//repetir marker
marker.bindPopup('<img style="width: 200px" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/T%C5%8Ddai-ji_Kon-d%C5%8D.jpg"><p style="text-align: center">Prefectura de Nara</p>').openPopup();
marker.addTo(map);








