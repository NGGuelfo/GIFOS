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
let apikey = "aABJW22BM12Yf086ZASgx2ZDaOkwCw0e";
let modas = document.getElementById("modas");

document.addEventListener("DOMContentLoaded", trendActuales);
btnBuscar.addEventListener("click", buscando);
textoBuscado.addEventListener("keyup", sugerencias);
opciones.addEventListener("click", sugerido);
vermas.addEventListener("click", masResultados);
modas.addEventListener("click", sugerido);

function buscando() {

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

function resultados(params) {

    result.innerHTML += `
        
        <div class="contenedor">
            <div class="overlay">
                        <div class="iconos">
                            <button><i class="far fa-heart"></i></button>
                            <button><i class="fas fa-download"></i></button>
                            <button><i class="fas fa-expand-alt"></i></button>
                        </div>
                        <h4>${params.username}</h4>
                        <h3>${params.title}</h3>
            </div>
                    <img src="${params.images.downsized.url}" alt="${params.id}">
        </div>
        `;

}

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

function sugerido(e) {

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${e.target.innerText}&limit=12&offset=0`)
        .then(data => data.json())
        .then(response => {
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

function masResultados() {

    offset = offset + 12;
    buscando();
}

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

function favoritos() {


}