let datos = [];
let gifsTraidos = document.getElementById("gifFav");
let btnMas = document.getElementById("masFav");

document.addEventListener('DOMContentLoaded', cargaDatos);

function cargaDatos() {

    if (localStorage.getItem('favoritos') == null) {

        gifsTraidos.innerHTML = `

            <div id="noFavoritos">
                <img src="media/icon-fav-sin-contenido.svg" alt="imagen-sin-favoritos">
                <h3 class="textoNoFav">"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"</h3>
            </div>


`;
        btnMas.style.display = 'none';
    
    } else {

        datos.push(JSON.parse(localStorage.getItem("favoritos")));

            fetch(`https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${datos.toString()}`)
            .then(response => response.json())
            .then(obj => {
                debugger;
                for (let i = 0; i < obj.data.length; i++) {
                rellenar(obj.data[i]);
                }
            })
            .catch(err => console.log(err));
    }

}


function rellenar(params){

    gifsTraidos.innerHTML += `
                
                <div class="contenedor">
                    <div class="overlay">
                                <div class="iconos">
                                    <button onclick="noFav('${params.id}')"><i class="fas fa-heart"></i></button>
                                    <button onclick="descargar('${params.images.downsized.url}')"><i class="fas fa-download"></i></button>
                                    <button onclick="maximizar('${params.images.downsized.url}','${params.title}','${params.username}','${params.id}')"><i class="fas fa-expand-alt"></i></button>
                                </div>
                                <h4>User: ${params.username}</h4>
                                <h3>${params.title}</h3>
                    </div>
                            <img src="${params.images.downsized.url}" alt="${params.id}">
                </div>
                `;


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