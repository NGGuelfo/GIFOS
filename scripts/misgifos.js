let videos = [];
let container = document.getElementById("mgifContenedor");
document.addEventListener('DOMContentLoaded', gifosGrabados);

function gifosGrabados() {

    if (localStorage.getItem('misGifos') == null) {

        container.innerHTML = `

        <div id="misgifosVacio">
            <img src="media/icon-mis-gifos-sin-contenido.svg" alt="mis-gifos-vacio">
            <h3 class="sinGifos">¡Anímate a crear tu primer GIFO!</h3>
        </div>


`;
        //btnMas.style.display = 'none';
    
    } else {

        datos.push(JSON.parse(localStorage.getItem("misGifos")));

            fetch(`https://api.giphy.com/v1/gifs/?api_key=${apikey}&ids=${datos[i]}`)
            .then(response => response.json())
            .then(obj => {

                container.innerHTML += `
                
                <div class="contenedor">
                    <div class="overlay">
                                <div class="iconos">
                                    <button onclick="noFav('${obj.data.id}')"><i class="far fa-trash-alt"></i></button>
                                    <button onclick="descargar('${obj.data.downsized.url}')"><i class="fas fa-download"></i></button>
                                    <button onclick="maximizar('${obj.data.downsized.url}','${obj.data.title}','${obj.data.username}','${obj.data.id}')"><i class="fas fa-expand-alt"></i></button>
                                </div>
                                <h4>User: </h4>
                                <h3>Titulo</h3>
                    </div>
                            <img src="media/697b023b-64a5-49a0-8059-27b963453fb1.gif" alt="ejemplo">
                </div>
                `;
            })
            .catch(err => console.log(err));
    }

}


async function descargar(valor){

    let blob = await fetch(valor).then(r => r.blob())
    .catch(err => console.log(err));

    invokeSaveAsDialog(blob,"archivo.gif");
    
}

function maximizar(url,titulo,usuario,altImagen){

let imagen = document.getElementById("maxGif");
let tituloMax = document.getElementById("tituloMax");
let user = document.getElementById("usuarioMax");
modal.style.display = "block";

imagen.src = url;
tituloMax.innerText = titulo;
user.innerText = "Usuario: " + usuario;
imagen.alt = altImagen;
}

function fav(variable){


    let fav = [];

    if (localStorage.getItem("favoritos") == null) {
        fav.push(variable);
        const auxiliar = JSON.stringify(fav);
        localStorage.setItem("favoritos", auxiliar);
    } else {
        let auxiliar = localStorage.getItem("favoritos");
        const vueltaLocal = JSON.parse(auxiliar); 
        fav.push(vueltaLocal);
        fav.push(variable);
        const resubida = JSON.stringify(fav);
        localStorage.setItem("favoritos", resubida);
    }
}