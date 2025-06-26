function irAVista(nombreVista, datos = {}) {
  const params = new URLSearchParams(datos).toString();
  const urlFinal = params ? `${nombreVista}?${params}` : nombreVista;
  window.location.href = urlFinal;
}

// Lee el texto del <p> dentro del botón
function redirigirDesdeBoton(boton) {
  const artista = boton.querySelector("p").textContent.trim();
  irAVista("vistaDeAlbumes.html", { artista: artista });
}
