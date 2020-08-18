//Creo las variables
let textoBuscado = document.getElementById("textoBuscado");
let opciones = document.getElementById("gifos-sugerencias");
let btnBuscar = document.getElementById("btnBuscar");
let bordeContenedor = document.getElementById("busqueda");
let result = document.getElementById("resultadoBusqueda");
let lupaGris = document.getElementById("lupa-gris");
let lupa = document.getElementById("lupa");
let cruz = document.getElementById("cruz");
let tituloResultado = document.getElementById("tituloResultado");
let seccionResult = document.getElementById("seccion-resultados");
let vermas = document.getElementById("mas");
let offset = 0;
let trend = document.getElementById("trend");
let modas = document.getElementById("modas");

//realizo las llamadas a funcion
document.addEventListener("DOMContentLoaded", trendActuales);
btnBuscar.addEventListener("click", buscando);
textoBuscado.addEventListener("keyup", sugerencias);
opciones.addEventListener("click", sugerido);
vermas.addEventListener("click", masResultados);
modas.addEventListener("click", sugerido);

//Llamo a la api para que me traiga los gifs acorde a lo que estoy buscando
function buscando() {

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${textoBuscado.value}&limit=12&offset=${offset}`)
        .then(data => data.json())
        .then(response => {
            result.innerHTML = '';
            seccionResult.style.display = 'flex';
            tituloResultado.innerText = textoBuscado.value;
            opciones.innerHTML = ``;
            lupaGris.style.display = "none";
            lupa.style.display = "flex";
            cruz.style.display = "none";
            if (response.data == 0) {
                result.innerHTML = `
                
                <div id="fallaBusqueda">
                    <img src="media/icon-busqueda-sin-resultado.svg" alt="imagen-error-busqueda">
                    <h3 class="textoError">Intenta con otra Busqueda</h3>
                </div>
                `;
                vermas.style.display = 'none';
            } else {
                for (let i = 0; i < response.data.length; i++) {
                    resultados(response.data[i]);
                }
            }
        })
        .catch(err => console.log(err));
}

//traigo 12 gifs nuevos y los muestro en pantalla (mismo input que el de la funcion anterior)
function buscandoVerMas() {

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${textoBuscado.value}&limit=12&offset=${offset}`)
        .then(data => data.json())
        .then(response => {

            seccionResult.style.display = 'flex';
            tituloResultado.innerText = textoBuscado.value;
            opciones.innerHTML = ``;
            lupaGris.style.display = "none";
            lupa.style.display = "flex";
            cruz.style.display = "none";
            for (let i = 0; i < response.data.length; i++) {
                resultados(response.data[i]);
            }
        })
        .catch(err => console.log(err));
}

//imprimo los gifs traidos a la pantalla
function resultados(params) {

    result.innerHTML += `
        
        <div class="contenedor">
            <div class="overlay">
                        <div class="iconos">
                            <button onclick="fav('${params.id}')"><i class="far fa-heart"></i></button>
                            <button onclick="descargar('${params.images.downsized.url}')"><i class="fas fa-download"></i></button>
                            <button onclick="maximizar('${params.images.downsized.url}','${params.title}','${params.username}','${params.id}')"><i class="fas fa-expand-alt"></i></button>
                        </div>
                        <h4>User: "${params.username}"</h4>
                        <h3>${params.title}</h3>
            </div>
                    <img src="${params.images.downsized.url}" alt="${params.id}">
        </div>
        `;

}

//esta funcion me trae palabras similares a la que estoy escribiendo
function sugerencias() {

    fetch(`https://api.giphy.com/v1/tags/related/${textoBuscado.value}?api_key=${apikey}`)
        .then(data => data.json())
        .then(resp => {

            lupaGris.style.display = "inline-block";
            lupa.style.display = "none";
            cruz.style.display = "flex";
            opciones.innerHTML = `
        
        <li><img src="media/icon-search-gris.svg" alt="icon-search-gris"><a class="extra">${resp.data[0].name}</a></li>
        <li><img src="media/icon-search-gris.svg" alt="icon-search-gris"><a class="extra">${resp.data[1].name}</a></li>
        <li><img src="media/icon-search-gris.svg" alt="icon-search-gris"><a class="extra">${resp.data[2].name}</a></li>

        
        
        `;
        })
        .catch(err => console.log(err));
}
//esta funcion me permite buscar gifs acorde a alguna de las sugerencias presionadas
function sugerido(e) {

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${e.target.innerText}&limit=12&offset=0`)
        .then(data => data.json())
        .then(response => {
            result.innerHTML = '';
            textoBuscado.value = e.target.innerText;
            seccionResult.style.display = 'flex';
            tituloResultado.innerText = e.target.innerText;
            opciones.innerHTML = ``;
            lupaGris.style.display = "none";
            lupa.style.display = "flex";
            cruz.style.display = "none";
            for (let i = 0; i < response.data.length; i++) {
                resultados(response.data[i]);
            }
        })
        .catch(err => console.log(err));
}

//recibe el click del boton ver mas y luego ejecuta la funcion que me trae los 12 nuevos gifs
function masResultados() {

    offset = offset + 12;
    buscandoVerMas();
}

//me trae las trends que se muestran debajo del input de busqueda
function trendActuales() {



    fetch(`https://api.giphy.com/v1/trending/searches?api_key=${apikey}`)
        .then(response => response.json())
        .then(content => {

            modas.innerHTML = `
    <li class="trend"><a>${content.data[0]}</a>,</li>
    <li class="trend"><a>${content.data[1]}</a>,</li>
    <li class="trend"><a>${content.data[2]}</a>,</li>
    <li class="trend"><a>${content.data[3]}</a>,</li>
    <li class="trend"><a>${content.data[4]}</a></li></ul>
    
    `;
        })
        .catch(err => {

            console.log(err);

        });

}
//me permite descargar el gif sobre el que estoy parado
async function descargar(valor) {

    let blob = await fetch(valor).then(r => r.blob())
        .catch(err => console.log(err));
    invokeSaveAsDialog(blob, "archivo.gif");

}
//me amplia el gif seleccionado
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
//guarda el gif en favoritos
function fav(variable) {

    let arr;
    let arrayFav = localStorage.getItem("favoritos");
    if (arrayFav == null) {
        arr = [];

    } else {

        arr = JSON.parse(arrayFav);
    }
    arr.push(variable);
    arrayFav = JSON.stringify(arr);
    localStorage.setItem("favoritos", arrayFav);
}