//inicializo las variables
let videos = [];
let container = document.getElementById("mgifContenedor");
let btnVMas = document.getElementById("misGifosVerMas");
//llamo a funcion una vez cargada la pagina
document.addEventListener('DOMContentLoaded', gifosGrabados);
//llamo al local y me traigo todos los gifs que he grabado
function gifosGrabados() {

    if (localStorage.getItem('misGifos') == null) {

        container.innerHTML = `

        <div id="misgifosVacio">
            <img src="media/icon-mis-gifos-sin-contenido.svg" alt="mis-gifos-vacio">
            <h3 class="sinGifos">¡Anímate a crear tu primer GIFO!</h3>
        </div>


`;
        btnVMas.style.display = 'none';

    } else {

        videos.push(JSON.parse(localStorage.getItem("misGifos")));

        fetch(`https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${videos.toString()}`)
            .then(response => response.json())
            .then(obj => {
                for (let i = 0; i < obj.data.length; i++) {
                    container.innerHTML += `
                
                <div class="contenedor">
                    <div class="overlay">
                                <div class="iconos">
                                    <button onclick="noMisGifos('${obj.data[i].id}')"><i class="far fa-trash-alt"></i></button>
                                    <button onclick="descargar('${obj.data[i].images.downsized.url}')"><i class="fas fa-download"></i></button>
                                    <button onclick="maximizar('${obj.data[i].images.downsized.url}','${obj.data[i].title}','${obj.data[i].username}','${obj.data[i].id}')"><i class="fas fa-expand-alt"></i></button>
                                </div>
                                <h4>User: </h4>
                                <h3>Titulo</h3>
                    </div>
                            <img src="${obj.data[i].images.downsized.url}" alt="ejemplo">
                </div>
                `;
                }
            })
            .catch(err => console.log(err));
    }

}

//descargo el gif seleccionado
async function descargar(valor) {

    let blob = await fetch(valor).then(r => r.blob())
        .catch(err => console.log(err));

    invokeSaveAsDialog(blob, "archivo.gif");

}
//amplio el gif seleccionado
function maximizar(url, titulo, usuario, altImagen) {

    let imagen = document.getElementById("maxGif");
    let tituloMax = document.getElementById("tituloMax");
    let user = document.getElementById("usuarioMax");
    modal.style.display = "block";

    imagen.src = url;
    tituloMax.innerText = titulo;
    user.innerText = "Usuario: " + usuario;
    imagen.alt = altImagen;
}
//envio el gif seleccionado a favoritos
function fav(variable) {

    let arr;
    let arrayFav = localStorage.getItem("favoritos");
    if (arrayFav == null) {
        arr = [];

    } else {

        arr = JSON.parse(arrayFav);
    }
    if (arr.indexOf(variable) == -1) {
        arr.push(variable);
        arrayFav = JSON.stringify(arr);
        localStorage.setItem("favoritos", arrayFav);
    } else {
        alert("Este gif ya se encuentra en favoritos");
    }
}
//elimino el gif de misGifos
function noMisGifos(valor) {

    let auxiliar = [];
    let arr = localStorage.getItem("misGifos");
    auxiliar = JSON.parse(arr);
    let indice = auxiliar.indexOf(valor);

    auxiliar.splice(indice, 1);

    const newgifos = JSON.stringify(auxiliar);
    if (newgifos == '[]') {
        localStorage.removeItem("misGifos");
    } else {
        localStorage.setItem("misGifos", newgifos);
    }
}