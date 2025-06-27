//const tiposDeMix = ["Romantica", "Clásica", "Rock", "Urbano", "Pop", "Indie", "Alternativa", "Electrónica", "Rap", "Metal" ];
//AÑADÍ PARA GENERAR Y CAMBIAR DE VISTA

//PARA LOS CAMBIOS DE VISTA:
function cambiarDeVista(idVista) {
  //PAra Escosder el contenidoDereccho
  document.querySelectorAll('.contenidoDerecho').forEach(seccion => {
    seccion.style.display = 'none';
  });
  //Mostrar vista de nuevo ----> artistas
  console.log(idVista)
  document.getElementById(idVista).style.display = 'flex';
  const mixes = document.getElementById('contenedorMixesOcultar'); //Ocultar los mixes
    if (idVista === 'seccionInicio') {
        mixes.style.display = 'flex';
    } else {
        mixes.style.display = 'none';
    }
}
//PARA GENERAR CUADROS DE LOS ARTISTAS :d
const contListArt = document.querySelector(".contenedorListaDeArtistas");
const artistasList = baseDatosJSON.artistas;

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
//PARA GENERAR CUADROS DE LOS ALBUMES 
const contAlbumes = document.querySelector(".contenedorDeTodosLosAlbumes");
const albumesList = baseDatosJSON.album;

albumesList.forEach(album => {
  let paraLaListaDeAlbumes = document.createElement("div");
  paraLaListaDeAlbumes.classList.add("paraLaListaDeAlbumes");

  let divAlbum = document.createElement("div");
  divAlbum.classList.add("albumesList");
  divAlbum.id = `album${album.id}`

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
let albumesEnLista = document.getElementsByClassName("paraLaListaDeAlbumes")
for (let i = 0; i < albumesEnLista.length; i++) {
  albumesEnLista[i].addEventListener("click", function(evento) {
    let padre = evento.target.closest("div");
    if(padre.id.includes("album")){
      let albumNum = padre.id.replace(/[a-zA-Z]/g, "");
      console.log(albumNum)
      let nomAlbum = baseDatosJSON.album[albumNum-1].nombre;
      let artAlbum = baseDatosJSON.album[albumNum-1].artista;
      let imgAlbum = baseDatosJSON.album[albumNum-1].url_img;
      let contenedorCanciones = document.getElementById("contenedorDeCanciones")
      contenedorCanciones.innerHTML = ``
      cambiarDeVista(`seccionAlbum`);
      document.getElementById("nombreAlbum").innerHTML = nomAlbum;
      document.getElementById("autorAlbum").innerHTML = `-${artAlbum}`;
      document.getElementById("imagendelAlbum").src = imgAlbum;
      console.log(albumNum)
    for(i=0;i<baseDatosJSON.canciones.length;i++)
      {  
        if(baseDatosJSON.canciones[i].id_album == albumNum)
        {
          contenedorCanciones.innerHTML += `<div id="contenedorAlbumCancion">${baseDatosJSON.canciones[i].nombre}</div>`;
          console.log(baseDatosJSON.canciones[i].nombre);
       }
      }
    }
  });
}




//CAMBIO DE VISTA DEL ARTISTA | ÁLBUMES DEL ARTISTA (ALEATORIO)




// FUNCIÓN: Mostrar álbumes por artista específico
function mostrarAlbumesPorArtista(nombreArtista) {
  // Ocultar todas las vistas
  document.querySelectorAll('.contenidoDerecho').forEach(seccion => {
    seccion.style.display = 'none';
  });

  // Limpiar contenedor principal
  const seccionInicio = document.getElementById("seccionInicio");
  seccionInicio.style.display = "none";

  // Crear nuevo contenedor para mostrar álbumes del artista
  const contenedor = document.createElement("div");
  contenedor.classList.add("mostrarAlbumesDelArtista");

  // Título
  const titulo = document.createElement("h1");
  titulo.textContent = "Álbumes del artista";
  titulo.style.textAlign = "center";
  titulo.style.margin = "20px";
  contenedor.appendChild(titulo);

  // Cuadro grande que contiene los álbumes
  const cuadroAlbumes = document.createElement("div");
  cuadroAlbumes.classList.add("cuadroAlbumesGrid"); // clase para diseño responsivo

  // Filtrar álbumes por nombre del artista
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

//Elimina vistas anteriores si ya existen
const existente = document.getElementById("vistaAlbumesArtista");
if (existente) {
  existente.remove();
}





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
  let idGenero = mix.replace(" ", "");
  const idMix = "mix" + idGenero;
  botonMix.id = idMix;
  cont++;
});
cont = 0;
document.querySelectorAll(".recomendacion").forEach(element => {
  let imagenCancionElement = element.firstElementChild;
  let datos = element.lastElementChild;
  let imagenCancion = baseDatosJSON.canciones[cancionesRecomend[cont] - 1].id_album;

  element.id = `recomendCancion${baseDatosJSON.canciones[cancionesRecomend[cont]-1].id}`;
  imagenCancionElement.src = baseDatosJSON.album[imagenCancion - 1].url_img;
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
albumRecomend.classList.add("recomendacionMix");
albumRecomend.id = `recomendAlbum${baseDatosJSON.album[nRandom].id}`
albumRecomend.firstElementChild.src = baseDatosJSON.album[nRandom].url_img;
albumRecomend.lastElementChild.textContent = baseDatosJSON.album[nRandom].nombre;
console.log(albumRecomend.id)
document.getElementById("seccionDerecha").addEventListener("click", (evento) => {  
  let cancionReproduciendo = document.getElementById("nombreCancion");
  let artistaCancionReproduciendo = document.getElementById("autorCancion");
  let imagenCancionReproduciendo = document.getElementById("imagenReproduciendo");
  let cancionLink;
  let nombreCancion;
  let autorCancion;
  let albumCancion;
  let imagenCancion;
  let padreAlbum = evento.target.closest("div");
  let padreCancion = evento.target.closest("button");

  if(padreCancion != null && padreCancion.id.includes("recomendCancion"))
  {
    let cancionNum = padreCancion.id.replace(/[a-zA-Z]/g, "");
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
  if(padreAlbum.id.includes("recomendAlbum")){
    let albumNum = padreAlbum.id.replace(/[a-zA-Z]/g, "");
    let nomAlbum = baseDatosJSON.album[albumNum-1].nombre;
    let artAlbum = baseDatosJSON.album[albumNum-1].artista;
    let imgAlbum = baseDatosJSON.album[albumNum-1].url_img;
    let contenedorCanciones = document.getElementById("contenedorDeCanciones")
    contenedorCanciones.innerHTML = ``
    cambiarDeVista(`seccionAlbum`);
    document.getElementById("nombreAlbum").innerHTML = nomAlbum;
    document.getElementById("autorAlbum").innerHTML = `-${artAlbum}`;
    document.getElementById("imagendelAlbum").src = imgAlbum;
    console.log(albumNum)
    for(i=0;i<baseDatosJSON.canciones.length;i++)
    {
      
      if(baseDatosJSON.canciones[i].id_album == albumNum)
      {
        contenedorCanciones.innerHTML += `<div id="contenedorAlbumCancion">${baseDatosJSON.canciones[i].nombre}</div>`;
        console.log(baseDatosJSON.canciones[i].nombre);
      }
    }

  }
});
document.getElementById("contenedorMixesOcultar").addEventListener("click", (evento) => {
  let padre = evento.target.closest("button");
  let generoMix = padre.id.slice(3);//.replace(/[\u0020-\u002F]/g, "");
  colaDeReproduccion.length = 0;

  for(let j = 0; j < baseDatosJSON.canciones.length; j++)
  {
    if(generoMix == baseDatosJSON.canciones[j].genero.replace(" ", ""))
      colaDeReproduccion.push(baseDatosJSON.canciones[j].link)
  }
  posicionCola = 0;
  console.log(colaDeReproduccion)
  player.loadVideoById(colaDeReproduccion[posicionCola]);
});
function toggleMenu() {
  const menu = document.getElementById("menuDesplegable");
  menu.classList.toggle('abierto');
  //console.log("hola")
}
