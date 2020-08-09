let trendingGifos = document.getElementById("tGifos");
let apikey = 'aABJW22BM12Yf086ZASgx2ZDaOkwCw0e';
let arr = [];
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
                            <button onclick="fav('${content.data[i].id}')" class="btnFavorito"><i class="far fa-heart"></i></button>
                            <button onclick="descargar('${content.data[i].images.downsized.url}')" class="btnDescarga"><i class="fas fa-download"></i></button>
                            <button onclick="maximizar('${content.data[i].images.downsized.url}','${content.data[i].title}','${content.data[i].username}','${content.data[i].id}')" class="btnAumentar"><i class="fas fa-expand-alt"></i></button>
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

function fav(variable){

    let arrayFav = localStorage.getItem("favoritos");
    if(arrayFav == null){
        arr = [];
    
    } else {

        arr = JSON.parse(arrayFav);
    }
    arr.push(variable);
    arrayFav = JSON.stringify(arr);
    localStorage.setItem("favoritos", arrayFav);
}