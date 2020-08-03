let stream, recorder;
let comenzar = document.getElementById("btn-comenzar");
let grabar = document.getElementById("btn-grabar");
let finalizar = document.getElementById("btn-finalizar");
let subir = document.getElementById("btn-subgifo");
let mensajeUno = document.getElementById("primer-mensaje");
let mensajeDos = document.getElementById("segundo-mensaje");
let pasoUno = document.getElementById("paso-comenzar");
let pasoDos = document.getElementById("paso-grabo");
let pasoTres = document.getElementById("paso-subogifo");
let overlay = document.getElementById("overlay-video");
let dayStarted;
let contador = document.getElementById("contador");
let repCaptura = document.getElementById("nueva-captura");

comenzar.addEventListener("click", Inicializar);
grabar.addEventListener("click",grabacion);
finalizar.addEventListener("click",detener);

async function Inicializar(){
    pasoUno.style.backgroundColor = "#572ee5";
    pasoUno.style.color = "#FFFFFF";
    comenzar.style.display = "none";
    mensajeUno.style.display = "none";
    mensajeDos.style.display = "block";
    overlay.style.display = "none";

    let constraints =  {audio: false, video: {width: 480, height: 320}};
    navigator.mediaDevices.getUserMedia(constraints)
        .then(async function(stream){
        
            mensajeDos.style.display = "none";
            pasoDos.style.backgroundColor = "#572ee5";
            pasoDos.style.color = "#FFFFFF";
            pasoUno.style.backgroundColor = "#FFFFFF";
            pasoUno.style.color = "#572ee5";
            grabar.style.display = "block";

            recorder = RecordRTC(stream, {
                type: 'gif'
            });
            let video = document.querySelector("video");
            video.srcObject = stream;
            video.onloadedmetadata = function(e){
                video.play();
            }
        
        });

}

async function grabacion(){
    
    grabar.style.display = 'none';
    finalizar.style.display = 'block';

    recorder.startRecording();
    console.log("Inicio la Grabacion");

    dateStarted = new Date().getTime();
    contador.style.display = 'block';
    (function looper() {
    contador.innerText = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
   setTimeout(looper,1000); 
})();
}

async function detener(){

    grabar.style.display = "none";
    finalizar.style.display = "block";
    pasoTres.style.backgroundColor = "#572ee5";
    pasoTres.style.color = "#FFFFFF";
    pasoDos.style.backgroundColor = "#FFFFFF";
    pasoDos.style.color = "#572ee5";
    recorder.stopRecording(function (){
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
    });
    finalizar.style.display = "none";
    repCaptura.style.display = "block";
    nueva
}

function calculateTimeDuration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    return hr + ':' + min + ':' + sec;
}