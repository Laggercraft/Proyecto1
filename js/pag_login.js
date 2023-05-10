const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;

  // Recupera los datos de registro del almacenamiento local
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Verifica si los datos ingresados coinciden con los almacenados
  if (username === storedUsername && password === storedPassword) {
    // Si coinciden, redirige al usuario a la página de inicio
    window.location.href = "../index_2.html";

  } else {
    // Si no coinciden, muestra un mensaje de error
    alert('Usuario o contraseña incorrectos');
  }
});
