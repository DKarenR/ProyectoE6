// Obtener el nombre del artista desde la URL
const params = new URLSearchParams(window.location.search);
const artista = params.get("artista");

// Base de datos simulada de álbumes
const artistas = {
  "Shakira": [
    { nombre: "Fijación Oral", imagen: "../Statics/img/shakira1.jpg" },
    { nombre: "El Dorado", imagen: "../Statics/img/shakira2.jpg" },
    { nombre: "Laundry Service", imagen: "../Statics/img/shakira3.jpg" },
    { nombre: "Pies Descalzos", imagen: "../Statics/img/shakira4.jpg" }
  ],
  "Dua Lipa": [
    { nombre: "Future Nostalgia", imagen: "../Statics/img/dua1.jpg" },
    { nombre: "Dua Lipa", imagen: "../Statics/img/dua2.jpg" },
    { nombre: "Club Future", imagen: "../Statics/img/dua3.jpg" },
    { nombre: "Radical Optimism", imagen: "../Statics/img/dua4.jpg" }
  ],
  "Bad Bunny":[
    { nombre: "Future Nostalgia", imagen: "../Statics/img/dua1.jpg" },
    { nombre: "Dua Lipa", imagen: "../Statics/img/dua2.jpg" },
    { nombre: "Club Future", imagen: "../Statics/img/dua3.jpg" },
    { nombre: "Radical Optimism", imagen: "../Statics/img/dua4.jpg" }
  ],
  "The Weeknd":[
    { nombre: "Future Nostalgia", imagen: "../Statics/img/dua1.jpg" },
    { nombre: "Dua Lipa", imagen: "../Statics/img/dua2.jpg" },
    { nombre: "Club Future", imagen: "../Statics/img/dua3.jpg" },
    { nombre: "Radical Optimism", imagen: "../Statics/img/dua4.jpg" }
  ]
};

// Referencias a elementos del DOM
const titulo = document.querySelector(".titulo");
const contenedor = document.getElementById("contenedor-albumes");

// Limpieza previa
contenedor.innerHTML = "";

// Verifica si el artista existe
if (artista && artistas[artista]) {
  titulo.textContent = artista;

  // Generar cada álbum
  artistas[artista].forEach(album => {
    const boton = document.createElement("button");
    boton.className = "album sobresalir";

    boton.innerHTML = `
      <img src="${album.imagen}" alt="${album.nombre}">
      <p>${album.nombre}</p>
    `;

    contenedor.appendChild(boton);
  });
} else {
  titulo.textContent = "Artista no encontrado";
  contenedor.innerHTML = "<p style='padding: 20px;'>No se encontró el artista o no hay álbumes disponibles.</p>";
}
