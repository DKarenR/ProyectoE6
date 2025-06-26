document.addEventListener("DOMContentLoaded", () => {
  // 🎤 ARTISTAS
  const artistas = ["Shakira", "Bad Bunny", "Dua Lipa", "Drake", "The Weeknd", "Rauw Alejandro"];
  const seleccionados = artistas.sort(() => 0.5 - Math.random()).slice(0, 3);
  const contenedorArtistas = document.getElementById("contenedor-artistas");

  seleccionados.forEach(nombre => {
    const boton = document.createElement("button");
    boton.className = "recomendacion";
    boton.setAttribute("data-artista", nombre);
    boton.innerHTML = `
      <img src="../Statics/img/.jpg" class="item-img">
      <p>${nombre}</p>
    `;
    boton.addEventListener("click", () => {
      irAVista("vistaDeAlbumes.html", { artista: nombre });
    });
    contenedorArtistas.appendChild(boton);
  });

  // 💿 ÁLBUM ALEATORIO
  const albumes = [
    { nombre: "Future Nostalgia", imagen: "../Statics/img/dua1.jpg" },
    { nombre: "El Dorado", imagen: "../Statics/img/shakira2.jpg" },
    { nombre: "After Hours", imagen: "../Statics/img/weeknd1.jpg" },
    { nombre: "Un Verano Sin Ti", imagen: "../Statics/img/bunny1.jpg" },
    { nombre: "Saturno", imagen: "../Statics/img/rauw1.jpg" },
    { nombre: "Pies Descalzos", imagen: "../Statics/img/shakira4.jpg" }
  ];

  const indice = Math.floor(Math.random() * albumes.length);
  const album = albumes[indice];

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

  // 🎵 CANCIONES
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

  const seleccionadas = canciones.sort(() => 0.5 - Math.random()).slice(0, 4);
  const contenedorCanciones = document.getElementById("contenedor-canciones");

  seleccionadas.forEach(cancion => {
    const boton = document.createElement("button");
    boton.className = "recomendacion";
    boton.innerHTML = `
      <img src="${cancion.imagen}" class="item-img" alt="${cancion.nombre}">
      <p>${cancion.nombre}</p>
    `;
    contenedorCanciones.appendChild(boton);
  });
});
