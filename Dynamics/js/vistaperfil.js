const mensaje = document.getElementById("mensaje");
const duracion = 60 * 60 * 24 * 14;
const formularioEdicion = document.getElementById("editarInfoPer");
const inputEditarNombre = document.getElementById("editarNombre");
const inputEditarDescripcion = document.getElementById("editarDescripcion");
const textoNombreTitulo = document.getElementById("nombreTitulo");
const textoNombreUsuario = document.getElementById("nombreUsuario");
const textoDescripcionUsuario = document.getElementById("descripcionUsuario");
const textoCorreoUsuario = document.getElementById("correoUsuario");
const imagenFotoPerfil = document.querySelector(".fotoDelPerfil");
const imagenFondoPerfil = document.querySelector(".fondoDelPerfil");
const btnEditarPerfil = document.getElementById("editarPerfil");
const btnGuardarCambios = document.getElementById("guardarCambios");
let cookies = document.cookie.split("; ");
//////// Busca cookie /////////
let usuarioActivo;
let datosUsuario;
for (let cookie of cookies){
    const [key, valor] = cookie.split("=");
    if (key === "usuarioActivo") {
        usuarioActivo = decodeURIComponent(valor);
        break;
    }
}
if (usuarioActivo) {
    for (let cookie of cookies) {
        const [key, valor] = cookie.split("=");
        if (key === usuarioActivo) {
            datosUsuario = JSON.parse(decodeURIComponent(valor));
            break;
        }
    }
    //////// Muestra datos de la cookie /////////
    if (datosUsuario) {
        textoNombreUsuario.textContent = `Nombre: ${datosUsuario.nombre}`;
        textoDescripcionUsuario.textContent = `Descripción: ${datosUsuario.descripcion}`;
        textoCorreoUsuario.textContent = `Correo: ${datosUsuario.correo}`;
        textoNombreTitulo.textContent = `Nombre: ${datosUsuario.nombre}`;
        if (datosUsuario.fotoPerfil) {
            imagenFotoPerfil.src = `../Statics/media/imgs/${datosUsuario.fotoPerfil}.jpg`;
        }
        if (datosUsuario.fotoPortada) {
            imagenFondoPerfil.src = `../Statics/media/imgs/${datosUsuario.fotoPortada}.jpg`;
        }
    }
}
//////// Aparece editar perfil /////////
btnEditarPerfil.addEventListener("click", () => {
    const oculto = formularioEdicion.style.display === "none";
    formularioEdicion.style.display = oculto? "block" : "none";
    btnEditarPerfil.textContent = oculto? "Ocultar" : "Editar perfil";
    inputEditarNombre.value = "";
    inputEditarDescripcion.value = "";
});
//////// Cambio de info funcionalidad /////////
btnGuardarCambios.addEventListener("click", () => {
    const nuevoNombre = inputEditarNombre.value.trim();
    const nuevaDescripcion = inputEditarDescripcion.value.trim();
    if (!nuevoNombre || !nuevaDescripcion || !usuarioActivo || !datosUsuario) return;
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
    const [key] = cookie.split("=");
        if (key === nuevoNombre && nuevoNombre !== usuarioActivo) {
            mensaje.innerHTML = `<span>Ese nombre ya está en uso</span>`;
        return;
        }
    }
    textoNombreUsuario.textContent = `Nombre: ${nuevoNombre}`;
    textoDescripcionUsuario.textContent = `Descripción: ${nuevaDescripcion}`;
    textoNombreTitulo.textContent = nuevoNombre;
    //////// Modificar cookie /////////
    datosUsuario.nombre = nuevoNombre;
    datosUsuario.descripcion = nuevaDescripcion;
    const nuevaCookie = encodeURIComponent(JSON.stringify(datosUsuario));
    document.cookie = `${nuevoNombre}=${nuevaCookie}; path=/; max-age=${duracion}`;
    document.cookie = `usuarioActivo=${nuevoNombre}; path=/; max-age=${duracion}`;
    document.cookie = `${usuarioActivo}=; path=/; max-age=0`;
    usuarioActivo = nuevoNombre;
    //////// Desaparece editar perfil /////////
    formularioEdicion.style.display = "none";
    btnEditarPerfil.textContent = "Editar perfil";
});