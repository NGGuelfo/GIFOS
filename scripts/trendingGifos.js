let trendingGifos = document.getElementById("tGifos");
let apikey = 'aABJW22BM12Yf086ZASgx2ZDaOkwCw0e';

document.addEventListener("DOMContentLoaded", gifosActuales);

function gifosActuales() {

    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=4`)
        .then(response => response.json())
        .then(content => {

            for (let i = 0; i < content.data.length; i++) {
                trendingGifos.innerHTML += `
        <div class="contenedor">
        <div class="overlay">
                        <div class="iconos">
                            <button class="btnFavorito"><i class="far fa-heart"></i></button>
                            <button class="btnDescarga"><i class="fas fa-download"></i></button>
                            <button class="btnAumentar"><i class="fas fa-expand-alt"></i></button>
                        </div>
                        <h4>User: "${content.data[i].username}"</h4>
                        <h3>${content.data[i].title}</h3>
        </div>
                    <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].id}">
                    </div>
        `;
            }

        })
        .catch(err => {
            console.log(err);
        })
}