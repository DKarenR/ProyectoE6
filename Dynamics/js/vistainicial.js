const tiposDeMix = ["Romantica", "Clásica", "Rock", "Urbano", "Pop", "Indie", "Alternativa", "Electrónica", "Rap", "Metal" ];

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

shuffle(tiposDeMix);

let botonesMix= document.querySelectorAll(".botonesMix");
botonesMix.forEach((botonMix, nume) => {
    const mix = tiposDeMix[nume];
    botonMix.textContent = `Mix ${mix}`;

    console.log(`Botón presionado: Mix ${nombreMix}`);
      alert(`Aquí redirigiría a vistaDeAlbumes.html con mix=${nombreMix}`);

    const idMix = "mix" + mix.trim;
    botonMix.id = idMix;
});
function toggleMenu() {
  const menu = document.getElementById("menuDesplegable");
  menu.classList.toggle('abierto');
  console.log("hola")
}

// Mezclar array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Redirige con nombre dinámico
function irAVista(nombreVista, datos = {}) {
  const params = new URLSearchParams(datos).toString();
  const urlFinal = params ? `${nombreVista}?${params}` : nombreVista;
  window.location.href = urlFinal;
}

// Ejecutar todo al cargar
document.addEventListener("DOMContentLoaded", () => {
  // Botones Mix
  shuffle(tiposDeMix);
  const botonesMix = document.querySelectorAll(".botonesMix");
  botonesMix.forEach((boton, i) => {
    const nombre = tiposDeMix[i];
    boton.textContent = `Mix ${nombre}`;
    boton.addEventListener("click", () => {
      irAVista("vistaDeAlbumes.html", { mix: nombre });
    });
  });

  // Canciones aleatorias
  const canciones = [
    { nombre: "Hips Don't Lie", imagen: "../Statics/img/cancion1.jpg" },
    { nombre: "Blinding Lights", imagen: "../Statics/img/cancion2.jpg" },
    { nombre: "Levitating", imagen: "../Statics/img/cancion3.jpg" },
    { nombre: "Tití Me Preguntó", imagen: "../Statics/img/cancion4.jpg" },
    { nombre: "Despacito", imagen: "../Statics/img/cancion5.jpg" },
    { nombre: "Pepas", imagen: "../Statics/img/cancion6.jpg" },
    { nombre: "Dance The Night", imagen: "../Statics/img/cancion7.jpg" },
    { nombre: "Monotonia", imagen: "../Statics/img/cancion8.jpg" }
  ];
  shuffle(canciones);
  const cancionesSeleccionadas = canciones.slice(0, 4);
  const contenedorCanciones = document.getElementById("contenedor-canciones");

  cancionesSeleccionadas.forEach(cancion => {
    const boton = document.createElement("button");
    boton.className = "recomendacion";
    boton.innerHTML = `
      <img src="${cancion.imagen}" class="item-img" alt="${cancion.nombre}">
      <p>${cancion.nombre}</p>
    `;
    boton.addEventListener("click", () => {
      // Aquí puedes modificar el reproductor real con audio si tienes
      alert(`Reproduciendo: ${cancion.nombre}`);
    });
    contenedorCanciones.appendChild(boton);
  });

  // Álbum aleatorio
  const albumes = [
    { nombre: "Future Nostalgia", imagen: "../Statics/img/dua1.jpg" },
    { nombre: "El Dorado", imagen: "../Statics/img/shakira2.jpg" },
    { nombre: "After Hours", imagen: "../Statics/img/weeknd1.jpg" },
    { nombre: "Un Verano Sin Ti", imagen: "../Statics/img/bunny1.jpg" },
    { nombre: "Saturno", imagen: "../Statics/img/rauw1.jpg" },
    { nombre: "Pies Descalzos", imagen: "../Statics/img/shakira4.jpg" }
  ];
  const album = albumes[Math.floor(Math.random() * albumes.length)];
  const botonAlbum = document.querySelector(".recomendacionMix");
  if (botonAlbum) {
    const img = botonAlbum.querySelector("img");
    const p = botonAlbum.querySelector("p");
    img.src = album.imagen;
    img.alt = album.nombre;
    p.textContent = album.nombre;
    botonAlbum.addEventListener("click", () => {
      irAVista("vistaAlbum.html", { album: album.nombre });
    });
  }

  // Artistas aleatorios
  const artistas = ["Shakira", "Bad Bunny", "Dua Lipa", "Drake", "The Weeknd", "Rauw Alejandro"];
  shuffle(artistas);
  const artistasSeleccionados = artistas.slice(0, 3);
  const contenedorArtistas = document.getElementById("contenedor-artistas");

  artistasSeleccionados.forEach(nombre => {
    const boton = document.createElement("button");
    boton.className = "recomendacion";
    boton.innerHTML = `
      <img src="../Statics/img/.jpg" class="item-img" alt="${nombre}">
      <p>${nombre}</p>
    `;
    boton.addEventListener("click", () => {
      irAVista("vistaDeAlbumes.html", { artista: nombre });
    });
    contenedorArtistas.appendChild(boton);
  });
});

// Toggle del menú
function toggleMenu() {
  const menu = document.getElementById("menuDesplegable");
  menu.classList.toggle('abierto');
}
