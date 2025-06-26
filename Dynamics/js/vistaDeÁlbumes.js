const botonesAlbum = document.querySelectorAll(".album");

botonesAlbum.forEach(boton => {
  boton.addEventListener("click", () => {
    alert("Reproduciendo álbum: " + boton.querySelector("p").textContent);
  });
});
