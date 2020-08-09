let btnCerrar = document.getElementById("btnCerrar");
let btnFav = document.getElementById("btnFav");
let btnDownload = document.getElementById("btnDload");
let modal = document.getElementById("modal");
let gif = document.getElementById("maxGif").src;
let idGif = document.getElementById("maxGif").alt;
btnCerrar.addEventListener("click", cerrar);
btnDownload.addEventListener("click", descargamodal);
btnFav.addEventListener("click", favoritos);

function cerrar(){

    modal.style.display = "none";
}

async function descargamodal(){

    let blob = await fetch(gif).then(r => r.blob());
    invokeSaveAsDialog(blob,"archivo.gif");
}

function favoritos(){

    let favoritos = [];

    if(localstorage.getItem("favoritos") == null){
        favoritos.push(idGif);
        localstorage.setItem("favoritos", JSON.stringify(favoritos));
    } else{
        favoritos.push(JSON.parse(localstorage.getItem("favoritos")));
        favoritos.push(idGif);
        localstorage.setItem("favoritos", JSON.stringify(favoritos));
    }
    
}