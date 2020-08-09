//Genero las Varibales Correspondientes
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
let form = new FormData();
let cargando = document.getElementById("cargandoGif");
let gifSubido = document.getElementById("gifCargado");
let btnDescargar = document.getElementById("botones-post");
let apikey = 'aABJW22BM12Yf086ZASgx2ZDaOkwCw0e';

let bajada = document.getElementById("descargar");

//Realizo las llamadas a las funciones a partir de la accion recibida desde la pagina
comenzar.addEventListener("click", Inicializar);
grabar.addEventListener("click", grabacion);
finalizar.addEventListener("click", detener);
subir.addEventListener("click", cargarGifo);
repCaptura.addEventListener("click", repitoCaptura);
bajada.addEventListener("click", descargar);

//funcion para activar la camara y el microfono
async function Inicializar() {
    pasoUno.style.backgroundColor = "#572ee5";
    pasoUno.style.color = "#FFFFFF";
    comenzar.style.display = "none";
    mensajeUno.style.display = "none";
    mensajeDos.style.display = "block";
    overlay.style.display = "none";

    let constraints = { audio: false, video: { width: 480, height: 320 } };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(async function (stream) {

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
            video.onloadedmetadata = function (e) {
                video.play();
            }

        });

}

//Funcion para grabar el GIF
async function grabacion() {

    grabar.style.display = 'none';
    finalizar.style.display = 'block';

    recorder.startRecording();
    console.log("Inicio la Grabacion");

    dateStarted = new Date().getTime();
    contador.style.display = 'block';
    (function looper() {
        contador.innerText = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
        setTimeout(looper, 1000);
    })();
}

//Funcion para detener la grabacion del GIF y Obtener el contenido grabado
async function detener() {

    video.pause();
    grabar.style.display = "none";
    finalizar.style.display = "block";
    pasoTres.style.backgroundColor = "#572ee5";
    pasoTres.style.color = "#FFFFFF";
    pasoDos.style.backgroundColor = "#FFFFFF";
    pasoDos.style.color = "#572ee5";
    subir.style.display = "block";
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        form.append('file', blob, 'myGif.gif');
        form.append('api_key', apikey);
    });

    console.log(form.get('file'));

    finalizar.style.display = "none";
    repCaptura.style.display = "block";
    contador.style.display = "none";
}

//Funcion para que me aparezca el timer en pantalla (llamada dentro de la funcion de grabacion)
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

//Funcion para borrar el contenido grabado y volver a grabarlo
function repitoCaptura() {

    form.delete('file');
    subir.style.display = "none";
    repCaptura.style.display = "none";
    grabacion();
    video.play();
}

//Funcion para subir el video grabado a la plataforma GIPHY y almacenarlo en el localstorage
async function cargarGifo() {

    overlay.style.display = "flex";
    cargando.style.display = "flex";
    debugger;
    fetch(`https://upload.giphy.com/v1/gifs`, {
        method: "POST",
        body: form

    })
        .then(data => {
            return data.json();
        })
        .then(obj => {
            cargando.style.display = "none";
            gifCargado.style.display = 'flex';
            btnDescargar.style.display = "flex";
            let arr = [];

            if(localStorage.getItem("misgifos") == null){
                arr.push(obj.data.id);
            localStorage.setItem('misGifos', JSON.stringify(arr));
            } else{
                arr.push(JSON.parse(localStorage.getItem("misgifos")));
                arr.push(obj.data.id);
                localStorage.setItem('misGifos', JSON.stringify(arr));
            }
        })
        .catch(err => console.log(err));

}

//Funcion para descargar el video grabado a la PC
function descargar() {

    invokeSaveAsDialog(form.get('file'));
}