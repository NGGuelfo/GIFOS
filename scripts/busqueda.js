let tituloResultado = document.getElementById("tituloResultado");
let btnBuscar = document.getElementById("btnBuscar");
let textoBuscado = document.getElementById("textoBuscado");
let resultados = document.getElementById("resultadoBusqueda");

btnBuscar.addEventListener("click", buscarGif);
textoBuscado.addEventListener("keyup", sugerencias);

function buscarGif(){

    debugger;
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${textoBuscado.value}&limit=2`)
    .then(response => response.json())
    .then(content =>{

        textoBuscado.innerText = "";

        for(let i=0; i < content.data.lenth; i++){

        resultados.innerHTML = `
        
        <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}">
        
        `;
        }
    })
    .catch(err => {
        console.log(err);
     })
}

function sugerencias(){}