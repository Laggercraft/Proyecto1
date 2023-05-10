const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;
  const confirmPassword = event.target.confirmPassword.value;

  // Verifica si las contraseñas coinciden
  if (password === confirmPassword) {
    // Si coinciden, guarda los datos en el almacenamiento local
    localStorage.setItem('username', username);
    $(document).ready(function() {
        $('form').submit(function(event) {
          event.preventDefault();
      
          const email = $('input[name="email"]').val();
      
          // Verifica si el correo electrónico es válido utilizando una expresión regular
          if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            // Si el correo electrónico es válido, envía el formulario
            this.submit();
          } else {
            // Si el correo electrónico no es válido, muestra un mensaje de error
            alert('Ingrese un correo electrónico válido');
          }
        });
      });
    localStorage.setItem('password', password);

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
  } else {
    // Si no coinciden, muestra un mensaje de error
    alert('Las contraseñas no coinciden');
  }
});
