//const tiposDeMix = ["Romantica", "Clásica", "Rock", "Urbano", "Pop", "Indie", "Alternativa", "Electrónica", "Rap", "Metal" ];
//AÑADÍ PARA GENERAR Y CAMBIAR DE VISTA

//PARA LOS CAMBIOS DE VISTA:
function cambiarDeVista(idVista) {
  //PAra Escosder el contenidoDereccho
  document.querySelectorAll('.contenidoDerecho').forEach(seccion => {
    seccion.style.display = 'none';
  });
  //Mostrar vista de nuevo ----> artistas
  document.getElementById(idVista).style.display = 'block';
}
//PARA GENERAR CUADROS DE LOS ARTISTAS :d
const contListArt = document.querySelector(".contenedorListaDeArtistas");
const artistasList = baseDatosJSON.artistas;
console.log("contenedorListaDeArtistas bien:" + contListArt);
console.log("Artistas cargados:", artistasList.length);

artistasList.forEach(artista => {
  let paraLaListaDeArtistas = document.createElement("div");
  paraLaListaDeArtistas.classList.add("paraLaListaDeArtistas"); //Para poder añadirle formato a los divs

  let divArtista = document.createElement("div");
  divArtista.classList.add("artistasList");

  let imgArtista = document.createElement("img");
  imgArtista.src = artista.url_img; //le digo que lo agarre del url_img de la base de JSON
  imgArtista.classList.add("artista-img"); //AQUÍ AÑADO EL ESTILO DE IMG LOLLL

  let nomArtista = document.createElement("p");
  nomArtista.textContent = artista.nombre; //que lo agarre del nombre del artista del JSON
    //meow
  divArtista.appendChild(imgArtista);
  divArtista.appendChild(nomArtista);
  paraLaListaDeArtistas.appendChild(divArtista);

  contListArt.appendChild(paraLaListaDeArtistas);
});
console.log("Todo salió bien");
//PARA GENERAR CUADROS DE LOS ALBUMES 
const contAlbumes = document.querySelector(".contenedorDeTodosLosAlbumes");
const albumesList = baseDatosJSON.album;
console.log("contenedorDeTodosLosAlbumes:", contAlbumes);
console.log("Álbumes cargados:", albumesList.length);

albumesList.forEach(album => {
  let paraLaListaDeAlbumes = document.createElement("div");
  paraLaListaDeAlbumes.classList.add("paraLaListaDeAlbumes");

  let divAlbum = document.createElement("div");
  divAlbum.classList.add("albumesList");

  let imgAlbum = document.createElement("img");
  imgAlbum.src = album.url_img; //le digo que lo agarre del url_img de la base de JSON
  imgAlbum.classList.add("item-img");

  let nomAlbum = document.createElement("p");
  nomAlbum.textContent = album.nombre; //que lo agarre del nombre del artista del JSON
  let nomAlbumArtis = document.createElement("p");
  nomAlbumArtis.textContent = album.artista;
    //meow
  divAlbum.appendChild(imgAlbum);
  divAlbum.appendChild(nomAlbum);
  divAlbum.appendChild(nomAlbumArtis);
  paraLaListaDeAlbumes.appendChild(divAlbum);
  contAlbumes.appendChild(paraLaListaDeAlbumes);

});

//CAMBIO DE VISTA DEL ARTISTA | ÁLBUMES DEL ARTISTA (ALEATORIO)

// FUNCIÓN: Mostrar álbumes por artista específico
function mostrarAlbumesPorArtista(nombreArtista) {
  // Oculta todas las vistas
  document.querySelectorAll('.contenidoDerecho').forEach(seccion => {
    seccion.style.display = 'none';
  });

  // Limpiar contenedor principal
  const seccionInicio = document.getElementById("seccionInicio");
  seccionInicio.innerHTML = "";

  // Crear nuevo contenedor para mostrar álbumes del artista
  const contenedor = document.createElement("div");
  contenedor.classList.add("mostrarAlbumesDelArtista");

  const titulo = document.createElement("h1");
  titulo.textContent = "Álbumes del artista";
  titulo.style.textAlign = "center";
  titulo.style.margin = "20px";
  contenedor.appendChild(titulo);

  const cuadroAlbumes = document.createElement("div");
  cuadroAlbumes.classList.add("cuadroAlbumesGrid");

  const albumesFiltrados = baseDatosJSON.album.filter(album => album.artista === nombreArtista);

  albumesFiltrados.forEach(album => {
    const contenedorAlbum = document.createElement("div");
    contenedorAlbum.classList.add("albumCard");

    const img = document.createElement("img");
    img.src = album.url_img;
    img.classList.add("item-img");

    const nombre = document.createElement("p");
    nombre.textContent = album.nombre;

    contenedorAlbum.appendChild(img);
    contenedorAlbum.appendChild(nombre);
    cuadroAlbumes.appendChild(contenedorAlbum);
  });

  contenedor.appendChild(cuadroAlbumes);
  seccionInicio.appendChild(contenedor);
  seccionInicio.style.display = 'block';
}

// ASIGNAR EVENTOS a botones de recomendacionArtista
document.querySelectorAll(".recomendacionArtista .noFormato").forEach(boton => {
  boton.addEventListener("click", () => {
    const nombreArtista = boton.querySelector("p").textContent.trim();
    mostrarAlbumesPorArtista(nombreArtista);
  });
});





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
  
  let cancionReproduciendo = document.getElementById("nombreCancion");
  let artistaCancionReproduciendo = document.getElementById("autorCancion");
  let imagenCancionReproduciendo = document.getElementById("imagenReproduciendo");
  let cancionLink;
  let nombreCancion;
  let autorCancion;
  let albumCancion;
  let imagenCancion;
  let padre = evento.target.closest("button");
  if(padre.id.includes("recomendCancion"))
  {
    let cancionNum = padre.id.replace(/[a-zA-Z]/g, "");
    cancionLink = baseDatosJSON.canciones[cancionNum-1].link;
    nombreCancion = baseDatosJSON.canciones[cancionNum-1].nombre;
    autorCancion = baseDatosJSON.canciones[cancionNum-1].artista;
    albumCancion = baseDatosJSON.canciones[cancionNum-1].id_album;
    imagenCancion = baseDatosJSON.album[albumCancion-1].url_img;
    player.loadVideoById(cancionLink);
    seekbar.max = player.getDuration();
    cancionReproduciendo.innerHTML = `${nombreCancion}`;
    artistaCancionReproduciendo.innerHTML = `-${autorCancion}`;
    imagenCancionReproduciendo.src = imagenCancion;
  }
});

function toggleMenu() {
  const menu = document.getElementById("menuDesplegable");
  menu.classList.toggle('abierto');
  //console.log("hola")
}
