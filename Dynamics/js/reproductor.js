const inputBusqueda = document.getElementById("texto-input");
const resultadoCancion = document.getElementById("result-cancion");
const resultadoAutor = document.getElementById("result-autor");
const resultadoAlbum = document.getElementById("result-album");
const contenedorBusqueda = document.getElementById("resultadosBusqueda");

inputBusqueda.addEventListener("input", function () {

  let frase=normalizar(this.value);//normalizar(this.value);
  let coincidenciasCancion = 0;
  let coincidenciasArtista = 0;  
  let coincidenciasAlbum = 0;  
  contenedorBusqueda.style.display = "flex";
  resultadoCancion.innerHTML = ``;
  resultadoAutor.innerHTML = '';
  resultadoAlbum.innerHTML = '';
  
  if(frase == ''){
    contenedorBusqueda.style.display = "none";
    return;
  }  
  for (let i = 0; i < baseDatosJSON.canciones.length; i++) {
    if(normalizar(baseDatosJSON.canciones[i].nombre).includes(frase) && coincidenciasCancion < 5){
      resultadoCancion.innerHTML += `<div class="resultadoCancion" id="cancion${i}">${baseDatosJSON.canciones[i].nombre}-${baseDatosJSON.canciones[i].artista} </div>  `;     //Talvez necesite poner i+1 en el id
      coincidenciasCancion++;
    }
  }
  for (let i = 0; i < baseDatosJSON.artistas.length; i++) {
    if(normalizar(baseDatosJSON.artistas[i].nombre).includes(frase) && coincidenciasArtista < 5){
      resultadoAutor.innerHTML += `<div class="resultadoArtista">${baseDatosJSON.artistas[i].nombre}-Artista</div> `;
      coincidenciasArtista++;
    }
  }
  for (let i = 0; i < baseDatosJSON.album.length; i++) {
    if(normalizar(baseDatosJSON.album[i].nombre).includes(frase) && coincidenciasAlbum < 5){
      resultadoAlbum.innerHTML += `<div class="resultadoAlbum">${baseDatosJSON.album[i].nombre}-Álbum</div> `;
      coincidenciasAlbum++;
    }
  }

  if(resultadoCancion.innerHTML == '')
    resultadoCancion.innerHTML = '<div class="resultadoCancion"> No hay canciones registradas con ese nombre </div>';
  if(resultadoAutor.innerHTML == '')
    resultadoAutor.innerHTML = '<div class="resultadoArtista"> No hay artistas registrados con ese nombre </div>';
  if(resultadoAlbum.innerHTML == '')
    resultadoAlbum.innerHTML = '<div class="resultadoAlbum"> No hay albumes registrados con ese nombre </div>';
});

//----------- Selecciona la opcion ------------------- 
let cancionReproduciendo = document.getElementById("nombreCancion");
let artistaCancionReproduciendo = document.getElementById("autorCancion");
let imagenCancionReproduciendo = document.getElementById("imagenReproduciendo");
contenedorBusqueda.addEventListener("click", function (evento) {
  let cancionLink;
  let nombreCancion;
  let autorCancion;
  let albumCancion;
  let imagenCancion;
  let padre = evento.target.closest("div");
  let abuelo = padre.parentElement.closest("div");
  if(abuelo.id === "result-cancion")
  {
    let cancionNum = evento.target.id.replace(/[a-zA-Z]/g, "");
    cancionLink = baseDatosJSON.canciones[cancionNum].link;
    nombreCancion = baseDatosJSON.canciones[cancionNum].nombre;
    autorCancion = baseDatosJSON.canciones[cancionNum].artista;
    albumCancion = baseDatosJSON.canciones[cancionNum].id_album;
    imagenCancion = baseDatosJSON.album[albumCancion-1].url_img;
    //Inicializar Reproductor
    player.loadVideoById(cancionLink);
    cancionReproduciendo.innerHTML = `${nombreCancion}`;
    artistaCancionReproduciendo.innerHTML = `-${autorCancion}`;
    imagenCancionReproduciendo.src = imagenCancion;
  }
  resultadoCancion.innerHTML = ``;
  resultadoAutor.innerHTML = '';
  resultadoAlbum.innerHTML = '';
  contenedorBusqueda.style.display = "none";
});
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};
// Inicia Reproductor 

let player;
let duration = 0;
let lastVolume;
let previousVolume;
let updateInterval;

const seekbar = document.getElementById("seekBar");
const volumeSlider = document.getElementById("volumeSlider");
const playPauseBtn = document.getElementById("playPauseBtn");

function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",{
        videoId: "LsXRIrUrCac",
        playerVars:{
            controls: 0
        },
        events:{
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    })
}
function onPlayerReady(){
    duration = player.getDuration();
    player.playVideo();
    seekbar.max = duration;
    volumeSlider.value = player.getVolume
    updateInterval = setInterval(()=>{
        if(player && player.getPlayerState() === YT.PlayerState.PLAYING){
            seekbar.value = player.getCurrentTime();
        }
        currentVolume = player.getVolume();
        if(currentVolume == currentVolume){
            volumeSlider.value = currentVolume;
            previousVolume = currentVolume;
        }
    }, 100);

}
function onPlayerStateChange(){
  duration = player.getDuration();
  seekbar.max = duration;   
}

//PlayPause
playPauseBtn.addEventListener("click", ()=>{
    let state = player.getPlayerState();
//    console.log(state);
    if(state === YT.PlayerState.PLAYING){
        player.pauseVideo();
        playPauseBtn.innerHTML = ""
        playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`
    }else{
        player.playVideo();
        playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`
    }
})

//Volumen
volumeSlider.addEventListener("input",()=>{
    let volume = parseInt(volumeSlider.value,10);
    player.setVolume(volume);

    if(player.isMuted() && volume > 0){
        player.unMute();
    }
    lastVolume = volume;
    previousVolume = volume;

})

//Mute
const muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener("click",()=>{
if(player.isMuted()){
    player.unMute();
    muteBtn.innerHTML=`<i class="fa-solid fa-volume-high"></i>`;
    volumeSlider.value = lastVolume;
}else{
    player.mute();
    muteBtn.innerHTML=`<i class="fa-solid fa-volume-off"></i>`;
}
})
seekbar.addEventListener("input",()=>{
    let seekTo = seekbar.value;
    player.seekTo(seekTo, true);
})
