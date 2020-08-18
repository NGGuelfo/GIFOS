//Inicializo las variables
let body = document.getElementById("body");
let btnDark = document.getElementById("btnDark");
let local = localStorage.getItem("nightmode");
let logoDesk = document.getElementById("logoDesk");
let logoMob = document.getElementById("logoMob");
let css = document.getElementById("css");
let cruzBlanca = document.getElementById("close");
let camara = document.getElementById("camara");
let rollo = document.getElementById("rollo");
let btncrea = document.getElementById("masHover");
let btncreaDos = document.getElementById("masNoHover");
let lupita = document.getElementById("lupa");
let cruzBuscador = document.getElementById("cruz");

//llamo a la funcion cuando hago click en el cambio de modo
btnDark.addEventListener("click", change);

if (local === "activado") {
    nightmode();
}
//dependiendo el modo actual, cambia de modo de visualizacion
function change() {

    local = localStorage.getItem("nightmode");

    if (local !== "activado") {
        nightmode();

    } else {
        daymode();

    }
}

//visualizacion MODO NOCTURNO
function nightmode() {

    body.classList.add("darkBody");
    btnDark.innerText = "Modo Diurno";
    localStorage.setItem("nightmode", "activado");

    if (btnDark.innerText == "Modo Nocturno") {
        logoDesk.setAttribute("src", "./media/logo-desktop.svg");
        logoMob.setAttribute("src", "./media/logo-mobile.svg");
        btncrea.setAttribute("src", "./media/button-crear-gifo-hover.svg");
        btncreaDos.setAttribute("src", "./media/button-crear-gifo.svg");
        if (lupita !== null) {
            lupita.setAttribute("src", "./media/icon-search.svg");
            cruzBuscador.setAttribute("src", "./media/close.svg");
        }
        if (camara !== null) {
            camara.setAttribute("src", "./media/camara.svg");
            rollo.setAttribute("src", "./media/pelicula.svg");
        }
        if (cruzBlanca !== null) {
            cruzBlanca.setAttribute("src", "./media/button-close.svg");
        }
        if (css !== null) {
            css.setAttribute('href', "styles/creagifo.css");
        }
    } else {
        logoDesk.setAttribute("src", "./media/logo-desktop-modo-noc.svg");
        logoMob.setAttribute("src", "./media/logo-mobile-modo-noc.svg");
        btncrea.setAttribute("src", "./media/button-crear-gifo-dark.svg");
        btncreaDos.setAttribute("src", "./media/button-crear-gifo-hover.svg");
        if (lupita !== null) {
            lupita.setAttribute("src", "./media/icon-search-mod-noc.svg");
            cruzBuscador.setAttribute("src", "./media/button-close-modo-noc.svg");
        }
        if (camara !== null) {
            camara.setAttribute("src", "./media/camara-modo-noc.svg");
            rollo.setAttribute("src", "./media/pelicula-modo-noc.svg");
        }
        if (cruzBlanca !== null) {
            cruzBlanca.setAttribute('src', "./media/button-close-modo-noc.svg");
        }
        if (css !== null) {
            css.setAttribute('href', "styles/creagifooscuro.css");
        }
    }
}
//visualizacion MODO DIURNO
function daymode() {

    body.classList.remove("darkBody");
    btnDark.innerText = "Modo Nocturno";
    localStorage.setItem("nightmode", null);

    if (btnDark.innerText == "Modo Nocturno") {
        logoDesk.setAttribute("src", "./media/logo-desktop.svg");
        logoMob.setAttribute("src", "./media/logo-mobile.svg");
        btncrea.setAttribute("src", "./media/button-crear-gifo-hover.svg");
        btncreaDos.setAttribute("src", "./media/button-crear-gifo.svg");
        if (lupita !== null) {
            lupita.setAttribute("src", "./media/icon-search.svg");
            cruzBuscador.setAttribute("src", "./media/close.svg");
        }
        if (camara !== null) {
            camara.setAttribute("src", "./media/camara.svg");
            rollo.setAttribute("src", "./media/pelicula.svg");
        }
        if (cruzBlanca !== null) {
            cruzBlanca.setAttribute("src", "./media/button-close.svg");
        }
        if (css !== null) {
            css.setAttribute('href', "styles/creagifo.css");
        }
    } else {
        logoDesk.setAttribute("src", "./media/logo-desktop-modo-noc.svg");
        logoMob.setAttribute("src", "./media/logo-mobile-modo-noc.svg");
        btncrea.setAttribute("src", "./media/button-crear-gifo-dark.svg");
        btncreaDos.setAttribute("src", "./media/button-crear-gifo-hover.svg");
        if (lupita !== null) {
            lupita.setAttribute("src", "./media/icon-search-mod-noc.svg");
            cruzBuscador.setAttribute("src", "./media/button-close-modo-noc.svg");
        }
        if (camara !== null) {
            camara.setAttribute("src", "./media/camara-modo-noc.svg");
            rollo.setAttribute("src", "./media/pelicula-modo-noc.svg");
        }
        if (cruzBlanca !== null) {
            cruzBlanca.setAttribute("src", "./media/button-close-modo-noc.svg");
        }
        if (css !== null) {
            css.setAttribute('href', "styles/creagifooscuro.css");
        }
    }
}