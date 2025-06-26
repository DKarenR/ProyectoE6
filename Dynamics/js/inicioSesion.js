////////// Validación Inicio de sesión /////////
    document.getElementById("formInicioSesion").addEventListener("submit", function(event){
        const passwordInput = document.getElementById("password");
        const passwordSpan = document.getElementById("contraCorta");
        const usuarioInput = document.getElementById("usuario");
        const usuarioSpan = document.getElementById("usuarioMal");
        if (passwordInput.value.length < 8){
            event.preventDefault();
            passwordSpan.textContent = "La contraseña debe tener al menos 8 caracteres.";
        } else {
            usuarioSpan.textContent = ""; 
        }
        if (usuarioInput.value.length < 1){
            event.preventDefault();
            usuarioSpan.textContent = "Rellena éste campo.";
        } else {
            usuarioSpan.textContent = ""; 
        }
    });
////////// Registrarse aparecer /////////
const btnReg = document.getElementById("registrarseBtn");
const vistaIS = document.getElementById("vistaInicioSesion");
const vistaR = document.getElementById("vistaRegistrarse");
btnReg.addEventListener("click", () => {
    vistaIS.style.display = "none";
    vistaR.style.display = "block";
});
////////// Validación registro/////////
document.getElementById("formRegistrarse").addEventListener("submit", function(event){
    const nvoUsuarioInput = document.getElementById("nvoUsuario");
    const usuarioVacioSpan = document.getElementById("usuarioVacio");
    const nvoPasswordInput = document.getElementById("nvoPassword");
    const contraNvaCortaSpan = document.getElementById("contraNvaCorta");
    const descripcionInput = document.getElementById("descripcion");
    const descripcionVaciaSpan = document.getElementById("descripcionVacia");
    const correoInput = document.getElementById("correo");
    const correoVacioSpan = document.getElementById("correoVacio");
    const fotoPerfilRadios = document.getElementsByName("fotoPerfil");
    const fotoVaciaSpan = document.getElementById("fotoVacia");
    let seleccionadoF = false;
    const fotoPortadaRadios = document.getElementsByName("fotoPortada");
    const portadaVaciaSpan = document.getElementById("portadaVacia");
    let seleccionadoP = false;
    const crearUsuarioBtn = document.getElementById("crearUsuarioBtn");
    if (nvoUsuarioInput.value.length < 1){
        event.preventDefault();
        usuarioVacioSpan.textContent = "Rellena éste campo.";
    } else {
        usuarioVacioSpan.textContent = ""; 
    }
    if (nvoUsuarioInput.value.length < 8){
        event.preventDefault();
        contraNvaCortaSpan.textContent = "La contraseña debe tener al menos 8 caracteres.";
    } else {
        contraNvaCortaSpan.textContent = ""; 
    }
    if (descripcionInput.value.length < 1){
        event.preventDefault();
        descripcionVaciaSpan.textContent = "Rellena éste campo.";
    } else {
        descripcionVaciaSpan.textContent = ""; 
    }
    if (correoInput.value.length < 1) {
        correoVacioSpan.textContent = "Rellena éste campo";
    } else if (correo.includes(" ")) {
        correoVacioSpan.textContent = "Escribiste espacios :c";
    } else if (!correo.includes("@") || !correo.includes(".")) {
        correoVacioSpan.textContent = "El correo debe contener '@' y'.'";
    } else {
        correoVacioSpan.textContent = "";
    }
    for (let i = 0; i < fotoPerfilRadios.length; i++) {
      if (fotoPerfilRadios[i].checked) {
        seleccionadoF = true;
        break;
      }
    }
    if (!seleccionadoF) {
      event.preventDefault();
      fotoVaciaSpan.textContent = "Selecciona una foto";
    } else {
      fotoVaciaSpan.textContent = ""; 
    }
    for (let i = 0; i < fotoPortadaRadios.length; i++) {
      if (fotoPortadaRadios[i].checked) {
        seleccionadoP = true;
        break;
      }
    }
    if (!seleccionadoP) {
      event.preventDefault();
      portadaVaciaSpan.textContent = "Selecciona una foto";
    } else {
      portadaVaciaSpan.textContent = ""; 
    }
});