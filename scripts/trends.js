let trend = document.getElementById("trend");
let apikey = "aABJW22BM12Yf086ZASgx2ZDaOkwCw0e"
document.addEventListener("DOMContentLoaded", trendActuales);

function trendActuales(){

   

fetch(`https://api.giphy.com/v1/trending/searches?api_key=${apikey}`)
.then(response => response.json() )
.then(content => {

    trend.innerHTML =`
    
    <h3>Trending:</h3>

    <h4>${content.data[0]}, ${content.data[1]}, ${content.data[2]}, ${content.data[3]}, ${content.data[4]}</h4>
    
    `;
})
.catch(err => {

console.log(err);

});

}