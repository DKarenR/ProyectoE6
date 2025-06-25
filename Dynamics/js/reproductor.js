const inputBusqueda = document.getElementById("texto-input");
const resultadoCancion = document.getElementById("result-cancion");
const resultadoAutor = document.getElementById("result-autor");
const resultadoAlbum = document.getElementById("result-album");
//for(let i=0; i < baseDatosJSON.canciones.length; i++)
//  bd[0].push(baseDatosJSON.canciones[i].nombre);
baseDatosJSON.canciones.forEach(element => bd[0].push(element.nombre));
for(let i=0; i < baseDatosJSON.artistas.length; i++)
  bd[1].push(baseDatosJSON.artistas[i].nombre);
for(let i=0; i < baseDatosJSON.album.length; i++)
  bd[2].push(baseDatosJSON.album[i].nombre);

inputBusqueda.addEventListener("input", function () {

  let frase=normalizar(this.value);

  resultadoCancion.innerHTML = ``;
  resultadoAutor.innerHTML = '';
  resultadoAlbum.innerHTML = '';

  if(frase == '')
    return;
  for (let i = 0; i < bd[0].length; i++) {
    if(normalizar(bd[0][i]).includes(frase))
      resultadoCancion.innerHTML += ` <p id="cancion${i}"> ${bd[0][i]} </p> `;     //Talvez necesite poner i+1 en el id
  }
  for (let i = 0; i < bd[1].length; i++) {
    if(normalizar(bd[1][i]).includes(frase))
      resultadoAutor.innerHTML += ` <p> ${bd[1][i]} </p> `;
  }
  for (let i = 0; i < bd[2].length; i++) {
    if(normalizar(bd[2][i]).includes(frase))
      resultadoAlbum.innerHTML += ` <p> ${bd[2][i]} </p> `;
  }

  if(resultadoCancion.innerHTML == '')
    resultadoCancion.innerHTML = '<p style="padding: 15px; " > No hay canciones registradas con ese nombre </p>';
  if(resultadoAutor.innerHTML == '')
    resultadoAutor.innerHTML = '<p style="padding: 15px; " > No hay artistas registrados con ese nombre </p>';
  if(resultadoAlbum.innerHTML == '')
    resultadoAlbum.innerHTML = '<p style="padding: 15px; " > No hay albumes registrados con ese nombre </p>';
});

//----------- Selecciona la opcion ------------------- 

document.getElementById("resultadosBusqueda").addEventListener("click", function (evento) {
  let cancionLink    
  let padre = evento.target.closest("div");
  if(padre.id === "result-cancion")
  {
    let cancionNum = evento.target.id.slice(-1);
    cancionLink = baseDatosJSON.canciones[cancionNum].link;
    player.loadVideoById(cancionLink);
    seekbar.max = player.getDuration();
    //player.pauseVideo();
    console.log(cancionLink)
  }
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
            onReady: onPlayerReady
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

//PlayPause
playPauseBtn.addEventListener("click", ()=>{
    let state = player.getPlayerState();
    console.log(state);
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
console.log(muteBtn)
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

console.log("hola");