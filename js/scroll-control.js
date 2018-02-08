var clearDiv;

window.onload = function() {
    var h=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
    clearDiv = document.getElementById("clearDiv");

    clearDiv.style.height = h+'px';

    // console.log(clearDiv.offsetHeight);
    // console.log(clear.style.height);
};

window.onresize = function() {
    var h=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;

    clearDiv.style.height = h+'px';


};

window.addEventListener('scroll', function(e) {

    var header = document.getElementsByTagName("header")[0];
    var intro = document.getElementById("intro");

    if (window.scrollY > clearDiv.offsetHeight*0.8) {
        header.classList.remove("hide");
        header.classList.add("showHeader");

        intro.classList.add("hide");
        
    } else {
        header.classList.remove("showHeader");
        header.classList.add("hide");

        intro.classList.remove("hide");
    }

    var w01 = document.getElementsByClassName("work1")[0];
    var w01Img = document.getElementById("w01-img");
    var w01Desc = document.getElementById("w01-desc");

    if (window.scrollY > w01.offsetHeight) {
        w01Img.classList.add("animation-run");
        w01Desc.classList.add("animation-run");
    }


    var w02 = document.getElementsByClassName("work2")[0];
    var w02Img = document.getElementById("w02-img");
    var w02Desc = document.getElementById("w02-desc");

    if (window.scrollY > w02.offsetHeight*2) {
        w02Img.classList.add("animation-run");
        w02Desc.classList.add("animation-run");
    }

    var w03 = document.getElementsByClassName("work3")[0];
    var w03Img = document.getElementById("w03-img");
    var w03Desc = document.getElementById("w03-desc");

    if (window.scrollY > w03.offsetHeight*4) {
        w03Img.classList.add("animation-run");
        w03Desc.classList.add("animation-run");
    }




});