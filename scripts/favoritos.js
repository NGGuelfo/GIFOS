let datos = [];
let contenedor = document.getElementById("gifFav");
let btnMas = document.getElementById("masFav");

document.addEventListener('DOMContentLoaded', cargaDatos);

function cargaDatos() {

    if (localStorage.getItem('favoritos') == null) {

        contenedor.innerHTML = `

            <div id="noFavoritos">
                <img src="media/icon-fav-sin-contenido.svg" alt="imagen-sin-favoritos">
                <h3 class="textoNoFav">"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"</h3>
            </div>


`;
        btnMas.style.display = 'none';
    
    } else {

        datos.push(JSON.parse(localStorage.getItem("favoritos")));

            fetch(`https://api.giphy.com/v1/gifs/?api_key=${apikey}&ids=${datos}`)
            .then(response => response.json())
            .then(obj => {
                debugger;  
                contenedor.innerHTML += `
                
                <div class="contenedor">
                    <div class="overlay">
                                <div class="iconos">
                                    <button onclick="noFav('${obj.data.id}')"><i class="fas fa-heart"></i></button>
                                    <button onclick="descargar('${obj.data.downsized.url}')"><i class="fas fa-download"></i></button>
                                    <button onclick="maximizar('${obj.data.downsized.url}','${obj.data.title}','${obj.data.username}','${obj.data.id}')"><i class="fas fa-expand-alt"></i></button>
                                </div>
                                <h4>User: ${obj.data.username}</h4>
                                <h3>${obj.data.title}</h3>
                    </div>
                            <img src="${obj.data.images.downsized.url}" alt="${obj.data.id}">
                </div>
                `;
            })
            .catch(err => console.log(err));
    }

}

function noFav(valor){

    localStorage.removeItem('favoritos',valor);
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
        const vueltaLocal = JSON.parse(localStorage.getItem("favoritos")); 
        fav.push(vueltaLocal);
        fav.push(variable);
        const resubida = JSON.stringify(fav);
        localStorage.setItem("favoritos", resubida);
    }
}