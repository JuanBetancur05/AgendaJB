// ===== LOGIN SHOW and HIDDEN =====
const signUp = document.getElementById('sign-up'),
      signIn = document.getElementById('sign-in'),
      loginIn = document.getElementById('login-in'),
      loginUp = document.getElementById('login-up');

signUp.addEventListener('click', () => {
  loginIn.classList.remove('block');
  loginUp.classList.remove('none');

  loginIn.classList.toggle('none');
  loginUp.classList.toggle('block');
});

signIn.addEventListener('click', () => {
  loginIn.classList.remove('none');
  loginUp.classList.remove('block');

  loginIn.classList.toggle('block');
  loginUp.classList.toggle('none');
});

// ===== REGISTRO =====
document.getElementById('btn-registrarse').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#login-up input[placeholder="Email"]').value;
  const password = document.querySelector('#login-up input[placeholder="Contraseña"]').value;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: error.message
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Revisa tu correo para confirmar tu cuenta.'
    });
  }
});

// ===== LOGIN =====
document.getElementById('btn-login').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#login-in input[placeholder="Email"]').value;
  const password = document.querySelector('#login-in input[placeholder="Contraseña"]').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error de inicio de sesión',
      text: error.message
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Bienvenido',
      text: `Has iniciado sesión como ${data.user.email}`,
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      localStorage.setItem('user_email', data.user.email);
      window.location.href = '../views/bienvenido.html';
    });
  }
});
