let stream, recorder;
let comenzar = document.getElementById("btn-comenzar");
let grabar = document.getElementById("btn-grabar");
let finalizar = document.getElementById("btn-finalizar");
let subir = document.getElementById("btn-subgifo");
let pasoUno = document.getElementById("paso-comenzar");
let pasoDos = document.getElementById("paso-grabo");
let pasoTres = document.getElementById("paso-subogifo");

comenzar.addEventListener("click", Inicializar);

async function Inicializar(){
    pasoUno.style.backgroundColor = "#572ee5";
    pasoUno.style.color = "#FFFFFF";
    comenzar.style.display = "none";

    var constraints =  {audio: false, video: {width: 480, height: 320}};
    navigator.mediaDevices.getUserMedia(constraints)
        .then(async function(stream){
            recorder = RecordRTC(stream, {
                type: 'gif'
            });
            var video = document.querySelector("video");
            video.srcObject = stream;
            video.onloadedmetadata = function(e){
                video.play();
            }
        
        });

}