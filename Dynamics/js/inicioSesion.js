const mensaje = document.getElementById("mensaje");
const duracion = 60 * 60 * 24 * 7;
//////// Validación Inicio de sesión /////////
document.getElementById("formInicioSesion").addEventListener("submit", function(event){
    const passwordInput = document.getElementById("password");
    const passwordSpan = document.getElementById("contraCorta");
    const usuarioInput = document.getElementById("usuario");
    const usuarioSpan = document.getElementById("usuarioMal");
    let errores = false;
    event.preventDefault();
    if (passwordInput.value.length < 8){
        errores = true;
        passwordSpan.textContent = "La contraseña debe tener al menos 8 caracteres.";
    } else {
        passwordSpan.textContent = "";
    }
    if (usuarioInput.value.length < 1){
        errores = true;
        usuarioSpan.textContent = "Rellena éste campo.";
    } else {
        usuarioSpan.textContent = ""; 
    }
    if (errores){
        return;
    }
    ////////// Inicio de sesión funcionalidad /////////
    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value;
    const cookies = document.cookie.split("; ");
    let datos;
    for (let cookie of cookies) {
      const [key, valor] = cookie.split("=");
      if (key === usuario) {
        datos = decodeURIComponent(valor);
        break;
      }
    }
    if (!datos){
      mensaje.innerHTML = "<span id='spansIS'>Usuario no encontrado</span>";
      return;
    }
    datos = JSON.parse(datos);
    if (datos.password === password){
      mensaje.innerHTML = `<span style='color: green;'>Inicio de sesión exitoso. Bienvenido ${datos.nombre}</span>`;
      document.cookie = `usuarioActivo=${usuario}; path=/; max-age=${duracion}`;
      window.location.href = "../Templates/vistainicial.html";
    } else {
      mensaje.innerHTML = "<span span id='spansIS'>Contraseña incorrecta</span>";
    }
});
////////// Aparece vista de registro /////////
const btnReg = document.getElementById("registrarseBtn");
const vistaIS = document.getElementById("vistaInicioSesion");
const vistaR = document.getElementById("vistaRegistrarse");
btnReg.addEventListener("click", () => {
    vistaIS.style.display = "none";
    vistaR.style.display = "block";
});
////////// Funcionalidad registro /////////
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
    ////////// Validación registro /////////
    let errores = false;
    event.preventDefault();
    if (nvoUsuarioInput.value.length < 1){
        usuarioVacioSpan.textContent = "Rellena éste campo.";
        errores = true;
    } else {
        usuarioVacioSpan.textContent = ""; 
    }
    if (nvoPasswordInput.value.length < 8){
        contraNvaCortaSpan.textContent = "La contraseña debe tener al menos 8 caracteres.";
        errores = true;
    } else {
        contraNvaCortaSpan.textContent = ""; 
    }
    if (descripcionInput.value.length < 1){
        descripcionVaciaSpan.textContent = "Rellena éste campo.";
        errores = true;
    } else {
        descripcionVaciaSpan.textContent = ""; 
    }
    if (correoInput.value.length < 1){
        correoVacioSpan.textContent = "Rellena éste campo";
        errores = true;
    } else if (correoInput.value.includes(" ")){
        correoVacioSpan.textContent = "Escribiste espacios :c";
        errores = true;
    } else if (!correoInput.value.includes("@") || !correoInput.value.includes(".")){
        correoVacioSpan.textContent = "El correo debe contener '@' y'.'";
        errores = true;
    } else {
        correoVacioSpan.textContent = "";
    }
    for (let i = 0; i < fotoPerfilRadios.length; i++){
      if (fotoPerfilRadios[i].checked) {
        seleccionadoF = true;
        break;
      }
    }
    if (!seleccionadoF){
      fotoVaciaSpan.textContent = "Selecciona una foto";
      errores = true;
    } else {
      fotoVaciaSpan.textContent = ""; 
    }
    for (let i = 0; i < fotoPortadaRadios.length; i++){
      if (fotoPortadaRadios[i].checked){
        seleccionadoP = true;
        break;
      }
    }
    if (!seleccionadoP){
      portadaVaciaSpan.textContent = "Selecciona una foto";
      errores = true;
    } else {
      portadaVaciaSpan.textContent = ""; 
    }
    if (errores){
        return;
    }
    let fotoPerfilSeleccionada = "";
    fotoPerfilRadios.forEach(r => { 
        if (r.checked) fotoPerfilSeleccionada = r.value 
    });
    let fotoPortadaSeleccionada = "";
    fotoPortadaRadios.forEach(r => { 
        if (r.checked) fotoPortadaSeleccionada = r.value 
    });
    ////////// Crear cookie /////////
    const nombre = nvoUsuarioInput.value.trim();
    const password = nvoPasswordInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const correo = correoInput.value.trim();
    const datos = {nombre, password, descripcion, correo, fotoPerfil: fotoPerfilSeleccionada,fotoPortada: fotoPortadaSeleccionada};
    const valorCookie = encodeURIComponent(JSON.stringify(datos));
    document.cookie = `${nombre}=${valorCookie}; max-age=${duracion}`;
    ////////// Regresar a inicio de sesión /////////
    vistaR.style.display = "none";
    vistaIS.style.display = "block";
    mensaje.innerHTML = mensaje.innerHTML = `<span id='spansIS'>Cuenta creada. Ahora inicia sesión.</span>`;
    console.log(document.cookie);
});
