let tituloResultado = document.getElementById("tituloResultado");
let btnBuscar = document.getElementById("btnBuscar");
let textoBuscado = document.getElementById("textoBuscado");
let resultados = document.getElementById("resultadoBusqueda");
let listado = document.getElementById("gifos-sugerencias");
let contornoBusqueda = document.getElementById("busqueda");

btnBuscar.addEventListener("click", buscarGif);
textoBuscado.addEventListener("keyup", sugerencias);

function buscarGif(){

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${textoBuscado.value}&limit=12&offset=0`)
    .then(response => response.json())
    .then(content =>{

        textoBuscado.innerText = "";

        imprimirResultados(content.data);
        })
    .catch(err => {
        console.log(err);
     })
}

function imprimirResultados(params){

    for(let i=0; i < params.length; i++){

        resultados.innerHTML += `
        
        <img src="${params[i].images.downsized.url}" alt="${params[i].title}">
        
        `;
}
}

function sugerencias(){

    fetch(`https://api.giphy.com/v1/tags/related/${textoBuscado.value}?api_key=${apikey}`)
    .then(response => response.json())
    .then(resp => {

        busqueda.style.height = '200px';
        listado.innerHTML =`
        
        <li><img src="media/icon-search-gris.svg" alt="icon-search-gris">${resp.data[0].name}</li>
        <li><img src="media/icon-search-gris.svg" alt="icon-search-gris">${resp.data[1].name}</li>
        <li><img src="media/icon-search-gris.svg" alt="icon-search-gris">${resp.data[2].name}</li>
        
        `;
    })
    .catch(err => console.log(err));

}