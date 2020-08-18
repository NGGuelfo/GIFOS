//inicializo las variables
let btnCerrar = document.getElementById("btnCerrar");
let btnFav = document.getElementById("btnFav");
let btnDownload = document.getElementById("btnDload");

//realizo las llamadas a la funcion a partir del input en pantalla
btnCerrar.addEventListener("click", cerrar);
btnDownload.addEventListener("click", descargamodal);
btnFav.addEventListener("click", favoritos);

//cierro la pantalla de maximizado
function cerrar() {

    modal.style.display = "none";
}
//descargo el gif que estoy visualizando
async function descargamodal() {

    let url = document.getElementById("maxGif").src;
    let blob = await fetch(url).then(r => r.blob());
    invokeSaveAsDialog(blob, "archivo.gif");
}
//envio el gif visualizado a favoritos
function favoritos() {

    let idGif = document.getElementById("maxGif").alt;

    let arr;
    let arrayFav = localStorage.getItem("favoritos");
    if (arrayFav == null) {
        arr = [];

    } else {

        arr = JSON.parse(arrayFav);
    }
    if (arr.indexOf(idGif) == -1) {
        arr.push(idGif);
        arrayFav = JSON.stringify(arr);
        localStorage.setItem("favoritos", arrayFav);
    } else {
        alert("Este gif ya se encuentra en favoritos");
    }
}