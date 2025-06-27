//const tiposDeMix = ["Romantica", "Clásica", "Rock", "Urbano", "Pop", "Indie", "Alternativa", "Electrónica", "Rap", "Metal" ];
//AÑADÍ PARA GENERAR Y CAMBIAR DE VISTA

//PARA LOS CAMBIOS DE VISTA:
function cambiarDeVista(idVista) {
  //PAra Escosder el contenidoDereccho
  document.querySelectorAll('.contenidoDerecho').forEach(seccion => {
    seccion.style.display = 'none';
  });
  //Mostrar vista de nuevo ----> artistas
  document.getElementById(idVista).style.display = 'flex';
  const mixes = document.getElementById('contenedorMixesOcultar'); //Ocultar los mixes
    if (idVista === 'seccionInicio') {
        mixes.style.display = 'flex';
    } else {
        mixes.style.display = 'none';
    }
}
function vidCargar(link){
  player.loadVideoById(link)
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

//Para que cada div tenga la función
  paraLaListaDeArtistas.addEventListener("click", () => {
    mostrarAlbumesPorArtistaEnSeccion(artista.nombre);
    cambiarDeVista("seccionAlbumSelec");
  });

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
  imgAlbum.classList.add("album-img");

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
      for(i=0;i<baseDatosJSON.canciones.length;i++)
      {  
        if(baseDatosJSON.canciones[i].id_album == albumNum)
          contenedorCanciones.innerHTML += `<div class="contenedorAlbumCancion" id="cancion${i}">${baseDatosJSON.canciones[i].nombre}</div>`; //El id cancion es la localidad de la cancion en el arreglo de canciones
      }
    }
  });
}
//PARA GENERAR LOS CUADROS A LAS CANCIONES 
//-OK SI BYE
const contListcanciomes = document.querySelector(".contenedorListaDeCanciones");
const cancionesList = baseDatosJSON.canciones;
let albumIMGS =  baseDatosJSON.album.url_img;

  cancionesList.forEach(cancion => {

  let idAlbum = cancion.id_album;
  let album = albumesList[idAlbum - 1];

  let paraLaListaDeCanciones = document.createElement("div");
  paraLaListaDeCanciones.classList.add("paraLaListaDeCanciones"); //Para poder añadirle formato a los divs

  let divCancion = document.createElement("div");
  divCancion.classList.add("cancionesList");

  let imgCancion = document.createElement("img");
  imgCancion.src = album.url_img; //le digo que lo agarre del url_img de la base de JSON
  imgCancion.classList.add("item-img"); //AQUÍ AÑADO EL ESTILO DE IMG LOLLL

  let nomCancion = document.createElement("p");
  nomCancion.textContent = cancion.nombre; //que lo agarre del nombre del artista del JSON
  let nomCancionArtist = document.createElement("p");
  nomCancionArtist.textContent = cancion.artista;
  //meow
  divCancion.appendChild(imgCancion);
  divCancion.appendChild(nomCancion);
  divCancion.appendChild(nomCancionArtist);
  paraLaListaDeCanciones.appendChild(divCancion);

  contListcanciomes.appendChild(paraLaListaDeCanciones);
});

//CAMBIO DE VISTA DEL ARTISTA | ÁLBUMES DEL ARTISTA (ALEATORIO)



//PARA MOSTRAR LAS VISTAS DE LOS ALBUMES --->OCULTAR LA INICIAL
//Este detecta los botones que tienen a los artistas y espera al click
document.querySelectorAll(".recomendacionArtista .noFormato").forEach(boton => {
  boton.addEventListener("click", () => {
    const nombreArtista = boton.querySelector("p").textContent.trim();

    //cambiar de
    mostrarAlbumesPorArtistaEnSeccion(nombreArtista);
    cambiarDeVista("seccionAlbumSelec");
  });
});
//Esto también es parte de mostrar artistas ---> En base a lo anterios :o
function mostrarAlbumesPorArtistaEnSeccion(nombreArtista) {
  const contenedor = document.querySelector("#seccionAlbumSelec .contenedorDeTodosLosAlbumes");
  contenedor.innerHTML = ""; // limpiar contenido anterior

  const titulo = document.createElement("h1");
  titulo.textContent = `Álbumes de ${nombreArtista}`;
  titulo.style.textAlign = "center";
  titulo.style.margin = "20px";

  const cuadroAlbumes = document.createElement("div");
  cuadroAlbumes.classList.add("cuadroAlbumesGrid");

  const albumesFiltrados = baseDatosJSON.album.filter(album => album.artista === nombreArtista);

  albumesFiltrados.forEach(album => {
    const card = document.createElement("div");
    card.classList.add("albumCard");

    const img = document.createElement("img");
    img.src = album.url_img;
    img.classList.add("album-img");

    const nombre = document.createElement("p");
    nombre.textContent = album.nombre;

    card.addEventListener("click", () => {
      mostrarInfoDelAlbum(album); //--->en esta solo voy a hacer una función que tenga algo ya estaba antes  
    });

    card.appendChild(img);
    card.appendChild(nombre);
    cuadroAlbumes.appendChild(card);
  });

  contenedor.appendChild(titulo);
  contenedor.appendChild(cuadroAlbumes);
}

function mostrarInfoDelAlbum(album) {
  cambiarDeVista("seccionAlbum");

  document.getElementById("nombreAlbum").textContent = album.nombre;
  document.getElementById("autorAlbum").textContent = `-${album.artista}`;
  document.getElementById("imagendelAlbum").src = album.url_img;

  const contenedorCanciones = document.getElementById("contenedorDeCanciones");
  contenedorCanciones.innerHTML = "";

  baseDatosJSON.canciones.forEach((cancion, i) => {
    if (cancion.id_album === album.id) {
      const cancionDiv = document.createElement("div");
      cancionDiv.classList.add("contenedorAlbumCancion");
      cancionDiv.id = `cancion${i}`;
      cancionDiv.textContent = cancion.nombre;
      contenedorCanciones.appendChild(cancionDiv);
    }
  });
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
let albumesRecomend = bd[2];
let cont = 0;

shuffle(cancionesRecomend);
shuffle(artistaRecomend);
shuffle(albumesRecomend);

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
  let imagenCancionElement = element.children[0];
  let datos = element.children[1];
  let imagenCancion = baseDatosJSON.canciones[cancionesRecomend[cont] - 1].id_album;
  let colAdd = element.children[2]
  console.log(element)
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

//Carrucel albumes
cont = 0;
let albumActual = document.getElementById("recomendacionAlbum");
setInterval( () => {
  albumActual.id = `recomendAlbum${albumesRecomend[cont]}`;
  albumActual.firstElementChild.src = baseDatosJSON.album[albumesRecomend[cont]-1].url_img;
  albumActual.lastElementChild.textContent = baseDatosJSON.album[albumesRecomend[cont]-1].nombre;
  cont++;
  if(cont == 3)
    cont = 0;
}, 3000);

document.getElementById("seccionDerecha").addEventListener("click", (evento) => {  
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
    for(i=0;i<baseDatosJSON.canciones.length;i++)
    {
      
      if(baseDatosJSON.canciones[i].id_album == albumNum)
        contenedorCanciones.innerHTML += `<div class="contenedorAlbumCancion" id=cancion${i}>${baseDatosJSON.canciones[i].nombre}</div>`; //El id cancion es la localidad de la cancion en el arreglo de canciones
    }

  }
});
document.getElementById("contenedorMixesOcultar").addEventListener("click", (evento) => {
  let padre = evento.target.closest("button");
  let generoMix = padre.id.slice(3);//.replace(/[\u0020-\u002F]/g, "");
  console.log(generoMix)
  colaDeReproduccion.length = 0;
  for(let j = 0; j < baseDatosJSON.canciones.length; j++)
  {
    if(generoMix == baseDatosJSON.canciones[j].genero.replace(" ", ""))
      colaDeReproduccion.push(baseDatosJSON.canciones[j].link)
  }
  posicionCola = 0;
  colaDeReproduccion = colaDeReproduccion.slice(-7); //Tiene 7 canciones
  shuffle(colaDeReproduccion); 
  console.log(colaDeReproduccion);
  player.loadVideoById(colaDeReproduccion[posicionCola]);
  cambiarDeVista(`seccionMix`)
  document.getElementById("nombreMix").innerHTML += generoMix;
  colaDeReproduccion.forEach((element)=>{
    for(let i = 0; i < baseDatosJSON.canciones.length; i++)
    {
      if(element == baseDatosJSON.canciones[i].link)
        document.getElementById("contenedorDeCancionesMix").innerHTML += `<div class="contenedorMixCancion" id="cancion${i}">${baseDatosJSON.canciones[i].nombre}-${baseDatosJSON.canciones[i].artista}</div>` 
        //El id cancion es la localidad de la cancion en el arreglo de canciones
    }
  })
});
function toggleMenu() {
  const menu = document.getElementById("menuDesplegable");
  menu.classList.toggle('abierto');
  //console.log("hola")
}
//Eventos en la zona de contenedorDeCanciones Album
document.getElementById("contenedorDeCanciones").addEventListener("click",(evento) =>{
  let padreCancion = evento.target.closest("div")
  let cancionNum = padreCancion.id.replace(/[a-zA-Z]/g, "");
  cancionLink = baseDatosJSON.canciones[cancionNum].link;
  player.loadVideoById(cancionLink);
});

//Eventos en la zona de contenedorDeCancionesMix Mix
document.getElementById("contenedorDeCancionesMix").addEventListener("click",(evento) =>{
  let padreCancion = evento.target.closest("div")
  let cancionNum = padreCancion.id.replace(/[a-zA-Z]/g, "");
  cancionLink = baseDatosJSON.canciones[cancionNum].link;
  player.loadVideoById(cancionLink);
});

//TUMIXSECCION
let irATumix = document.getElementById("tuMix")
irATumix.addEventListener("click",()=>{
  cambiarDeVista(`seccionTuMix`)
})
