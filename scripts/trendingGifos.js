let trendingGifos = document.getElementById("tGifos");

document.addEventListener("DOMContentLoaded", gifosActuales);

function gifosActuales(){

    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=2`)
    .then(response => response.json())
    .then(content => {

        for(let i = 0; i < content.data.length; i++){

        
        trendingGifos.innerHTML += `
        <div class="contenedor">
        <div class="overlay">
                        <div class="iconos">
                            <button><i class="far fa-heart"></i></button>
                            <button><i class="fas fa-download"></i></button>
                            <button><i class="fas fa-expand-alt"></i></button>
                        </div>
                        <h4>${content.data[i].username}</h4>
                        <h3>${content.data[i].title}</h3>
        </div>
                    <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}">
                    </div>
        `;
    }

    })
    .catch(err => {
        console.log(err);
    })
}