const editarPerfil = document.getElementById("editarPerfil");
const forms =document.getElementById("editarInfoPer");
let editarNombre = document.getElementById("editarNombre");
let nombreUsuario = document.getElementById("nombreUsuario");
let editarDescripcion = document.getElementById("editarDescripcion");
let descripcionUsuario =document.getElementById("descripcionUsuario");
let nombreTitulo =document.getElementById("nombreTitulo");

editarPerfil.addEventListener("click", ()=>{
    const oculto=forms.style.display==="none";

    forms.style.display=oculto? "block":"none";
    editarPerfil.textContent=oculto? "Ocultar":"Editar perfil";

    editarNombre.value = nombreUsuario.textContent; 
    editarDescripcion.value = descripcionUsuario.textContent;
});

const guardarCambios = document.getElementById("guardarCambios"); 
guardarCambios.addEventListener("click", () => { //lo de aquí se debe modificar para poder modificar las cookies
    const nuevoNombre = editarNombre.value;
    const nuevaDescripcion = editarDescripcion.value;

    nombreUsuario.textContent = nuevoNombre;
    descripcionUsuario.textContent = nuevaDescripcion;
    nombreTitulo.textContent = nuevoNombre;

    forms.style.display = "none";
    editarPerfil.textContent = "Editar perfil";
});

