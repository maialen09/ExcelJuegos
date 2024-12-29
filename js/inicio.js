

var botonEntrar = document.getElementById('boton-entrar');

botonEntrar.addEventListener('click', function(event){

    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;    

    console.log('Username:', correo);
    console.log('Contraseña:', contrasena);

    window.location.href = 'index.html';



});