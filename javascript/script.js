

const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

let formulario  = document.getElementById("formulario");

function registrarUsuario( nombre, apellido, email, contrasena ) {

    const objetoUsuario = new usuario( nombre, apellido, email, contrasena );
    usuariosRegistrados.push( objetoUsuario );
    objetoUsuario.saludar();

    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
}

function validarCampo( input, campo ) {

    if ( !input.value ){

        const mensaje = `El campo ${campo} es requerido`;
        
        let parrafo = document.getElementById(`mensaje_${input.id}`)
        parrafo.innerText = mensaje;

        throw mensaje;
    }
}

function comprobarSiEmailYaExiste( email ) {

    const usuario = usuariosRegistrados.find( usuario => usuario.email === email );

    if ( usuario ) {
        const mensaje = "El usuario ya está registrado";
        alert( mensaje );
        throw mensaje;
    }
}

formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    const mensajes = document.getElementsByClassName("mensaje_error");
    
    for ( const mensaje of mensajes ) {
        mensaje.innerText = "";
    }

    let inputNombre      = document.getElementById("nombre");
    let inputApellido    = document.getElementById("apellido");
    let inputEmail       = document.getElementById("email");
    let inputContrasena  = document.getElementById("password");
    let inputTerminos    = document.getElementById("terminos");

    if (!inputTerminos.checked) {
        const mensaje = document.createElement("p");
        mensaje.innerText=("Debe aceptar los términos y condiciones");
        document.body.appendChild(mensaje);
        mensaje.value = ""; 
        throw mensaje;
    }
    

    validarCampo( inputNombre,       "Nombre" );
    validarCampo( inputApellido,     "Apellidos" );
    validarCampo( inputEmail,        "Email" );
    validarCampo( inputContrasena,   "Contraseña" );

    comprobarSiEmailYaExiste( inputEmail.value );
    registrarUsuario( inputNombre.value, inputApellido.value, inputEmail.value, inputContrasena.value );
    
});