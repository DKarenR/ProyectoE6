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

    const idMix = "mix" + mix;
    botonMix.id = idMix;
});
function toggleMenu() {
  const menu = document.getElementById("menuDesplegable");
  menu.classList.toggle('abierto');
  console.log("hola")
}
