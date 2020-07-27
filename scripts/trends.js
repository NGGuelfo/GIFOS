let trend = document.getElementById("trend");
window.onload(trendActuales);

function trendActuales(){

    let url = `https://api.giphy.com/v1/trending/searches?0TjYzyUG56Ijc0o2URNRjDjomYqhh7KT`;

fetch(url)
.then(response => response.json() )
.then(content => {

    trend.innerHTML =`
    
    <h3>Trending:</h3>

    <h4>${content.data}</h4>
    
    `;
})
.catch(err => {

console.log(err);

});

}