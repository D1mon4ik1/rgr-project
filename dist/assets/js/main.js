function myFunction(x){
    if(x.matches){
        window.onscroll = function() {scrollFunction()};
        function scrollFunction() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.getElementById("header1").style.height = "5vh";
                document.getElementById("logo").style.height = "5vh";
                document.getElementById("name").style.fontSize = "1.8vh";
                document.getElementById("name").style.paddingTop = "0";
                document.getElementById("name").style.width = "12vw";
                document.getElementById("menu").style.marginLeft = "10.7vw";
                document.getElementById("top").style.display = "block";
            } else {
                document.getElementById("header1").style.height = "10vh";
                document.getElementById("logo").style.height = "9vh";
                document.getElementById("name").style.fontSize = "2.5vh";
                document.getElementById("name").style.paddingTop = "1vh";
                document.getElementById("name").style.width = "15vw";
                document.getElementById("menu").style.marginLeft = "5.7vw";
                document.getElementById("top").style.display = "none";
            }
        }
    } else {
        window.onscroll = function() {scrollFunction1()};
        function scrollFunction1() {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                document.getElementById("header1").style.height = "5vh";
                document.getElementById("logo").style.height = "4.5vh";
                document.getElementById("name").style.fontSize = "1.5vh";
                document.getElementById("name").style.paddingTop = "0.2vh";
                document.getElementById("name").style.width = "35vw";
                document.getElementById("top").style.display = "block";
                document.getElementById("myDropdown").style.marginTop = "5vh";
            } else {
                document.getElementById("header1").style.height = "7vh";
                document.getElementById("logo").style.height = "6.5vh";
                document.getElementById("name").style.fontSize = "2vh";
                document.getElementById("name").style.paddingTop = "0.5vh";
                document.getElementById("name").style.width = "45vw";
                document.getElementById("top").style.display = "none";
                document.getElementById("myDropdown").style.marginTop = "7vh";
            }
        }
    }
}
let x = window.matchMedia("(min-width: 1200px)")
myFunction(x)
x.addListener(myFunction)
function topFunction() {
    document.documentElement.scrollTop = 0;
}


function functionMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

$(document).ready(function (){
    $('.slider').slick({
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        dots: true,
        speed: 1000,
        cssEase: 'linear',
    });
})

$('.lArrow').on('click', function() {
    $('.slider').slick('slickPrev');
});
$('.rArrow').on('click', function() {
    $('.slider').slick('slickNext');
});


$(function() {
    $( "#accordion" ).accordion({
        active: false,
        collapsible: true
    });
});
