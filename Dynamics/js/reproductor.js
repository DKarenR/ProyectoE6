const duracion = 60 * 60 * 24 * 14; 
const inputBusqueda = document.getElementById("texto-input");
const resultadoCancion = document.getElementById("result-cancion");
const resultadoAutor = document.getElementById("result-autor");
const resultadoAlbum = document.getElementById("result-album");
const contenedorBusqueda = document.getElementById("resultadosBusqueda");
let miMix = []; //para guardar la playlist que hace el usuario
let miMixStr = ""; //array => string
//////// Busca cookie /////////
let cookies = document.cookie.split("; ");
let usuarioActivo;
let datosUsuario;
//Busca las cookies del usuariologin
for (let cookie of cookies) {
  const [key, valor] = cookie.split("=");
  if (key === "usuarioActivo") {
    usuarioActivo = decodeURIComponent(valor);
    break;
  }
}
if (usuarioActivo) {
  for (let cookie of cookies) {
    const [key, valor] = cookie.split("=");
    if (key === usuarioActivo) {
      datosUsuario = JSON.parse(decodeURIComponent(valor));
      break;
    }
  }
}
//Asigna los datos del usuario su mix a las cookies del mix 
if (datosUsuario && datosUsuario.miMixStr) {
  miMixStr = datosUsuario.miMixStr;
  console.log("miMixStr desde cookie:", datosUsuario.miMixStr);
}else {
  console.log("No hay miMixStr guardado en la cookie.");
}

//Inicia Proceso de Busqueda
inputBusqueda.addEventListener("input", function () {

  let frase=normalizar(this.value);

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
    resultadoCancion.innerHTML += `<div class="resultadoCancion" id="cancion${i}">${baseDatosJSON.canciones[i].nombre}-${baseDatosJSON.canciones[i].artista} <i class="fa-solid fa-heart corazon" data-index="${i}"></i>  </div>`;      
    coincidenciasCancion++;
    }
  }
  // Corazones
    const corazones = document.querySelectorAll(".corazon");
    for (let i = 0; i < corazones.length; i++) 
    {
      corazones[i].addEventListener("click", function (event) {
        const divCancion = this.closest(".resultadoCancion");
  if (divCancion) {
    const idDelDiv = divCancion.id;
    console.log("ID del div:", idDelDiv);
  } else {
    console.log("No se encontró el div contenedor.");
  }

        console.log(event.target.closest("div"))
        const index = parseInt(this.getAttribute("data-index"));
        const cancion = baseDatosJSON.canciones[index];
        let existe = false;
        for (let j = 0; j < miMix.length; j++) {
          if (miMix[j].nombre === cancion.nombre && miMix[j].artista === cancion.artista) {
            existe = true;
            break;
          }
    }
    if (existe === false) {
          miMix.push(cancion);
          miMixStr += `${cancion.nombre} - ${cancion.artista},`; //Se separa por coma 
          console.log(miMixStr);
          console.log("Agrega", cancion);
          this.classList.add("favorita");
          if (usuarioActivo && datosUsuario) {
            datosUsuario.miMixStr = miMixStr;
            const nuevaCookie = encodeURIComponent(JSON.stringify(datosUsuario));
            document.cookie = `${usuarioActivo}=${nuevaCookie}; path=/; max-age=${duracion}`;
          }
        } else {
          console.log("noooo");
          this.classList.remove("favorita"); 
        }
      });
    }
  for (let i = 0; i < baseDatosJSON.artistas.length; i++) {
    if(normalizar(baseDatosJSON.artistas[i].nombre).includes(frase) && coincidenciasArtista < 5){
      resultadoAutor.innerHTML += `<div class="resultadoArtista">${baseDatosJSON.artistas[i].nombre}-Artista</div> `;
      coincidenciasArtista++;
    }
  }
  for (let i = 0; i < baseDatosJSON.album.length; i++) {
    if(normalizar(baseDatosJSON.album[i].nombre).includes(frase) && coincidenciasAlbum < 5){
      resultadoAlbum.innerHTML += `<div class="resultadoAlbum" id="album${i}">${baseDatosJSON.album[i].nombre}-Álbum</div> `;
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
  console.log(abuelo)
  if (abuelo.id === "result-cancion") {
    let index = parseInt(padre.getAttribute("data-index"));
    const cancion = baseDatosJSON.canciones[index];
    if (!cancion) return;
      player.loadVideoById(cancion.link);
      cancionReproduciendo.innerHTML = `${cancion.nombre}`;
      artistaCancionReproduciendo.innerHTML = `-${cancion.artista}`;
      let albumId = cancion.id_album - 1;
      imagenCancionReproduciendo.src = baseDatosJSON.album[albumId].url_img;
  }
  console.log(padre.id)
  console.log(abuelo.id)
  if(abuelo.id === "result-album"){
    let albumNum = padre.id.replace(/[a-zA-Z]/g, "");
    console.log(albumNum)
    let nomAlbum = baseDatosJSON.album[albumNum].nombre;
    let artAlbum = baseDatosJSON.album[albumNum].artista;
    let imgAlbum = baseDatosJSON.album[albumNum].url_img;
    let contenedorCanciones = document.getElementById("contenedorDeCanciones")
    contenedorCanciones.innerHTML = ``
    cambiarDeVista(`seccionAlbum`);
    document.getElementById("nombreAlbum").innerHTML = nomAlbum;
    document.getElementById("autorAlbum").innerHTML = `-${artAlbum}`;
    document.getElementById("imagendelAlbum").src = imgAlbum;
    console.log(albumNum)
    albumNum++
    console.log(contenedorCanciones.innerHTML)
    for(i=0;i<baseDatosJSON.canciones.length;i++)
    {
      if(baseDatosJSON.canciones[i].id_album == albumNum)
      {
        contenedorCanciones.innerHTML += `<div class="contenedorAlbumCancion" id="cancion${i}" >${baseDatosJSON.canciones[i].nombre}</div>`; //El id Cancion es la localidad en el arreglo de canciones
        console.log(baseDatosJSON.canciones[i].nombre);
      }
    }
    
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
let colaDeReproduccion = [];
let posicionCola = 1;

const siguienteCancionDiv = document.getElementById("colaRep");
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
function onPlayerStateChange(evento){
  duration = player.getDuration();
  seekbar.max = duration;
  let videoData = player.getVideoData();
  let idVideoReproduciendo = videoData.video_id
  for(let i=0;i<baseDatosJSON.canciones.length;i++)
  {
    
    if(baseDatosJSON.canciones[i].link == idVideoReproduciendo){
      nombreCancion = baseDatosJSON.canciones[i].nombre;
      autorCancion = baseDatosJSON.canciones[i].artista;
      albumCancion = baseDatosJSON.canciones[i].id_album;
      imagenCancion = baseDatosJSON.album[albumCancion-1].url_img;
      cancionReproduciendo.innerHTML = `${nombreCancion}`;
      imagenCancionReproduciendo.style=`display: flex`;
      artistaCancionReproduciendo.innerHTML = `-${autorCancion}`;
      imagenCancionReproduciendo.src = imagenCancion;
      break;
    }
  }
  if(colaDeReproduccion[0] != "")
  {
    if(evento.data === YT.PlayerState.ENDED)
    {
      posicionCola++;
      if(posicionCola < colaDeReproduccion.length)
        reproduceCancion(colaDeReproduccion[posicionCola]);
    }
  }
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




//pruebaCancionSiguiente
function reproduceCancion(cancion)
{
  player.loadVideoById(cancion);
  let siguienteImagen = document.getElementById('siguienteImagenId');
  let siguienteCancionP = document.getElementById('siguienteCancionId');
  if(colaDeReproduccion[posicionCola+1])
  {
    console.log(posicionCola)
    if(!siguienteImagen) 
    {
      siguienteImagen = document.createElement('img');
      siguienteImagen.id = 'siguienteImagenId';
      siguienteCancionDiv.appendChild(siguienteImagen);

      siguienteCancionP = document.createElement('p');
      siguienteCancionP.id = 'siguienteCancionId';
      siguienteCancionDiv.appendChild(siguienteCancionP);
    }
    let siguienteCancion = colaDeReproduccion[posicionCola+1];
    for(let i = 0; i < baseDatosJSON.canciones.length; i++)
    {
      if(baseDatosJSON.canciones[i].link == siguienteCancion)
      {
        siguienteCancion = baseDatosJSON.canciones[i].id;
        break;
      }
    }
    let albumSiguiente = baseDatosJSON.canciones[siguienteCancion-1].id_album;
    siguienteImagen.src = baseDatosJSON.album[albumSiguiente-1].url_img;
    siguienteCancionP.innerHTML = baseDatosJSON.canciones[siguienteCancion-1].nombre;
  }
  if(!colaDeReproduccion[posicionCola+1] && siguienteImagen)
  {
    siguienteImagen.remove();
    siguienteCancionP.remove();
  }
}
//Botones Siguiente y Anterior
const cancionAntes = document.getElementById("cancionAntes");
const cancionDespues = document.getElementById("cancionDespues");
cancionAntes.addEventListener("click",()=>{
  if (posicionCola > 0) 
{
      posicionCola--;
      let cancionAnterior = colaDeReproduccion[posicionCola];
      console.log(posicionCola);
      reproduceCancion(cancionAnterior);
} 
else 
{
  console.log("Estás al inicio de la cola.");
}

  
})
cancionDespues.addEventListener("click",()=>{
  let siguienteCancion = colaDeReproduccion[posicionCola+1];
  posicionCola++ ;
  console.log(posicionCola)
  reproduceCancion(siguienteCancion);
})

//Desplegar Tu Mix

let irATumix = document.getElementById("tuMix")
let contenedorMix = document.getElementById("contenedorDeCancionesTuMix")
irATumix.addEventListener("click",()=>{
  contenedorMix.innerHTML = "";
  cambiarDeVista(`seccionTuMix`)
  console.log(miMix)
  for(i=0;i<miMix.length;i++)
    {
        contenedorMix.innerHTML += `<div class="contenedorTuMixCancion" id="cancion${miMix[i].id}" >${miMix[i].nombre}-${miMix[i].artista} </div>`; //El id Cancion es la localidad en el arreglo de canciones
    }
})