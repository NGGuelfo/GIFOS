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

    let arr;
    let arrayFav = localStorage.getItem("favoritos");
    if(arrayFav == null){
        arr = [];
    
    } else {

        arr = JSON.parse(arrayFav);
    }
    arr.push(idGif);
    arrayFav = JSON.stringify(arr);
    localStorage.setItem("favoritos", arrayFav);
}