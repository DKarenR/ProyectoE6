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
let usuarioActivo;
let datosUsuario;

for (let cookie of cookies) {
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
btnEditarPerfil.addEventListener("click", () => {
    const oculto = formularioEdicion.style.display === "none";
    formularioEdicion.style.display = oculto? "block" : "none";
    btnEditarPerfil.textContent = oculto? "Ocultar" : "Editar perfil";
    inputEditarNombre.value = "";
    inputEditarDescripcion.value = "";
});
btnGuardarCambios.addEventListener("click", () => {
    const nuevoNombre = inputEditarNombre.value.trim();
    const nuevaDescripcion = inputEditarDescripcion.value.trim();
    textoNombreUsuario.textContent = `Nombre: ${nuevoNombre}`;
    textoDescripcionUsuario.textContent = `Descripción: ${nuevaDescripcion}`;
    textoNombreTitulo.textContent = nuevoNombre;
    if (usuarioActivo && datosUsuario) {
        datosUsuario.nombre = nuevoNombre;
        datosUsuario.descripcion = nuevaDescripcion;
        const nuevaCookie = encodeURIComponent(JSON.stringify(datosUsuario));
        const duracion = 60 * 60 * 24 * 7;
        document.cookie = `${usuarioActivo}=${nuevaCookie}; path=/; max-age=${duracion}`;
    }
    formularioEdicion.style.display = "none";
    btnEditarPerfil.textContent = "Editar perfil";
});