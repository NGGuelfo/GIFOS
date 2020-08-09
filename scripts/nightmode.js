let body = document.getElementById("body");
let btnDark = document.getElementById("btnDark");
let local = localStorage.getItem("nightmode");
let logoDesk = document.getElementById("logoDesk");
let logoMob = document.getElementById("logoMob");

btnDark.addEventListener("click", change);

if (local === "activado") {
    nightmode();
}

function change() {

    local = localStorage.getItem("nightmode");

    if (local !== "activado") {
        nightmode();

    } else {
        daymode();

    }
}


function nightmode() {

    body.classList.add("darkBody");
    btnDark.innerText = "Modo Diurno";
    localStorage.setItem("nightmode", "activado");

    if (btnDark.innerText == "Modo Nocturno") {
        logoDesk.setAttribute("src", "./media/logo-desktop.svg");
        logoMob.setAttribute("src", "./media/logo-mobile.svg");
        
    } else {
        logoDesk.setAttribute("src", "./media/logo-desktop-modo-noc.svg");
        logoMob.setAttribute("src", "./media/logo-mobile-modo-noc.svg");
    }
}

function daymode() {

    body.classList.remove("darkBody");
    btnDark.innerText = "Modo Nocturno";
    localStorage.setItem("nightmode", null);

    if (btnDark.innerText == "Modo Nocturno") {
        logoDesk.setAttribute("src", "./media/logo-desktop.svg");
        logoMob.setAttribute("src", "./media/logo-mobile.svg");
        
    } else {
        logoDesk.setAttribute("src", "./media/logo-desktop-modo-noc.svg");
        logoMob.setAttribute("src", "./media/logo-mobile-modo-noc.svg");
    }
}