//const tiposDeMix = ["Romantica", "Clásica", "Rock", "Urbano", "Pop", "Indie", "Alternativa", "Electrónica", "Rap", "Metal" ];
let bd = [[], [], [], []];
baseDatosJSON.canciones.forEach(element => bd[0].push(element.id));
baseDatosJSON.genero.forEach(element => bd[1].push(element.id));
baseDatosJSON.album.forEach(element => bd[2].push(element.id));
baseDatosJSON.artistas.forEach(element => bd[3].push(element.id));

function shuffle(hola) {
    for (let i = 0; i < hola.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        intercambiar(hola, i, j);
    }
}

function intercambiar(arreglo,indicea,indiceb){
    let c = arreglo[indicea];
    arreglo[indicea] = arreglo[indiceb];
    arreglo[indiceb] = c;
}

shuffle(bd[1]);

// Agrega imagenes y titulo a botones, tambien funcionamiento
let cancionesRecomend = bd[0];
let artistaRecomend = bd[3];
let cont = 0;

shuffle(cancionesRecomend);
shuffle(artistaRecomend);


let botonesMix= document.querySelectorAll(".botonesMix");
botonesMix.forEach((botonMix, nume) => {
  const mix = baseDatosJSON.genero[bd[1][cont]-1].nombre;
  botonMix.textContent = `Mix ${mix}`;
  let idGenero = mix.replace(/[\u0020-\u002F]/g, "");
  const idMix = "mix" + idGenero;
  botonMix.id = idMix;
  cont++;
});
cont = 0;
document.querySelectorAll(".recomendacion").forEach(element => {
  let imagenCancionElement = element.firstElementChild;
  let datos = element.lastElementChild;
  let imagenCancion = baseDatosJSON.canciones[cancionesRecomend[cont] - 1].id_artista;

  element.id = `recomendCancion${baseDatosJSON.canciones[cancionesRecomend[cont]-1].id}`;
  imagenCancionElement.src = baseDatosJSON.album[imagenCancion-1].url_img;
  datos.textContent = baseDatosJSON.canciones[cancionesRecomend[cont] - 1].nombre;
  datos.textContent += ` - ${baseDatosJSON.canciones[cancionesRecomend[cont] - 1].artista}`;
  cont++;
});
cont = 0;
document.querySelectorAll(".noFormato").forEach(element => {
  let imagenElement = element.firstElementChild;
  let datos = element.lastElementChild;

  imagenElement.src = baseDatosJSON.artistas[artistaRecomend[cont]-1].url_img;
  datos.textContent = baseDatosJSON.artistas[artistaRecomend[cont]-1].nombre;
  
  cont++;
});

let albumRecomend = document.getElementById("recomendacionMix");
let nRandom = Math.floor(Math.random() * baseDatosJSON.album.length);

albumRecomend.firstElementChild.src = baseDatosJSON.album[nRandom].url_img;
albumRecomend.lastElementChild.textContent = baseDatosJSON.album[nRandom].nombre;

document.getElementById("seccionDerecha").addEventListener("click", (evento) => {
  let cancionLink;
  let padre = evento.target.closest("button");
  if(padre.id.includes("recomendCancion"))
  {
    let cancionNum = padre.id.replace(/[a-zA-Z]/g, "");
    cancionLink = baseDatosJSON.canciones[cancionNum-1].link;
    player.loadVideoById(cancionLink);
    seekbar.max = player.getDuration();
  }
});

function toggleMenu() {
  const menu = document.getElementById("menuDesplegable");
  menu.classList.toggle('abierto');
  //console.log("hola")
}
