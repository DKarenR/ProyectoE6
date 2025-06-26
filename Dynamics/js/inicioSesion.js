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
////////// Registrarse /////////
const btn = document.getElementById("registrarseBtn");
const vistaIS = document.getElementById("vistaInicioSesion");
const vistaR = document.getElementById("vistaRegistrarse");
btn.addEventListener("click", () => {
    vistaIS.style.display = "none";
    vistaR.style.display = "block";
});