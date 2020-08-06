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

btnBuscar.addEventListener("click", buscando);
textoBuscado.addEventListener("keyup",sugerencias);
opciones.addEventListener("click",sugerido);

function buscando(){

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${textoBuscado.value}&limit=12&offset=0`)
    .then(data => data.json())
    .then(response => {
        
        seccionResult.style.display = 'flex';
        tituloResultado.innerText = textoBuscado.value;
        textoBuscado.value = "";
        opciones.innerHTML = ``;
        lupaGris.style.display = "none";
        lupa.style.display = "flex";
        cruz.style.display = "none";
        for(let i=0;i< response.data.length;i++){
        resultados(response.data[i]);
        }
    })
    .catch(err => console.log(err));
}

function resultados(params){

        result.innerHTML += `
        
        <img src="${params.images.downsized.url}" alt="${params.title}">
        
        
        `;
    
}

function sugerencias(){

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

function sugerido(e){

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${e.target.innerText}&limit=12&offset=0`)
    .then(data => data.json())
    .then(response => {
        seccionResult.style.display = 'flex';
        tituloResultado.innerText = e.target.innerText;
        textoBuscado.value = "";
        opciones.innerHTML = ``;
        lupaGris.style.display = "none";
        lupa.style.display = "flex";
        cruz.style.display = "none";
        for(let i=0;i< response.data.length;i++){
        resultados(response.data[i]);
        }
    })
    .catch(err => console.log(err));
}