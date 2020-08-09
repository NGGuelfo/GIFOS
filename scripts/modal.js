let btnCerrar = document.getElementById("btnCerrar");
let btnFav = document.getElementById("btnFav");
let btnDownload = document.getElementById("btnDload");
btnCerrar.addEventListener("click", cerrar);
btnDownload.addEventListener("click", descargamodal);
btnFav.addEventListener("click", favoritos);

function cerrar() {

    modal.style.display = "none";
}

async function descargamodal() {

    let url = document.getElementById("maxGif").src;
    let blob = await fetch(url).then(r => r.blob());
    invokeSaveAsDialog(blob, "archivo.gif");
}

function favoritos() {

    let idGif = document.getElementById("maxGif").alt;

    let favoritos = [];

    if (localStorage.getItem("favoritos") == null) {
        localStorage.setItem("favoritos", JSON.stringify(favoritos.push(idGif)));
    } else {
        favoritos.push(JSON.parse(localStorage.getItem("favoritos")));
        favoritos.push(idGif);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
}