 let currentUser = null;


  document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        Swal.fire({
          title: '¿Cerrar sesión?',
          text: 'Tu sesión actual se cerrará.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, cerrar sesión',
          cancelButtonText: 'Cancelar',
          customClass: {
            popup: 'swal-personalizado',
            title: 'swal-titulo',
            htmlContainer: 'swal-texto'
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Swal.fire('Error', 'No se pudo cerrar la sesión.', 'error');
            } else {
              localStorage.removeItem('user_email');
              Swal.fire({
                icon: 'success',
                title: 'Sesión cerrada',
                text: 'Tu sesión fue cerrada correctamente.',
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                window.location.href = '../index.html';
              });
            }
          }
        });
      });
    }
  });

  function animarContador(elemento, total, duracion = 1500) {
    let inicio = 0;
    const paso = Math.ceil(total / (duracion / 30));
    const interval = setInterval(() => {
      inicio += paso;
      if (inicio >= total) {
        inicio = total;
        clearInterval(interval);
      }
      elemento.textContent = inicio;
    }, 30);
  }


  async function mostrarConteoEventos(userId) {
    const contador = document.getElementById('contador-eventos');
    if (!contador) return;

    const { count, error } = await supabase
      .from('eventos')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error || count == null) {
      contador.textContent = '0';
      return;
    }

    animarContador(contador, count);
  }

  // 👋 Mostrar saludo personalizado y contar eventos
  (async () => {
    const { data, error } = await supabase.auth.getUser();
    const usuarioInfo = document.getElementById('usuario-info');

    if (!usuarioInfo) return;

    if (error || !data?.user) {
      usuarioInfo.innerHTML = `
        <span class="u-file-icon u-icon u-text-palette-4-base u-icon-2">
          <img src="./assets/img/1243bd58.png" alt="">
        </span>
        &nbsp;Hola
      `;
    } else {
      currentUser = data.user;
      const nombre = currentUser.email.replace('@gmail.com', '');
      usuarioInfo.innerHTML = `
        <span class="u-file-icon u-icon u-text-palette-4-base u-icon-2">
          <img src="./assets/img/1243bd58.png" alt="">
        </span>
        &nbsp;Hola, ${nombre}
      `;
      mostrarConteoEventos(currentUser.id);
    }
  })();

async function mostrarUltimoEvento() {
  const contenedor = document.getElementById('ultimo-evento');
  if (!contenedor) return;

  const { data, error } = await supabase
    .from('eventos')
    .select('id, nombre')
    .order('fecha_hora_inicio', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error al obtener último evento:', error.message);
    contenedor.textContent = 'Error al cargar';
    return;
  }

  if (data.length === 0) {
   contenedor.innerHTML = '<span style="text-decoration: none; color: inherit; font-size: 16px;">Sin registros</span>';
    return;
  }

  const evento = data[0];
contenedor.innerHTML = `<a href="./views/bienvenido.html?id=${evento.id}" style="text-decoration: none; color: inherit; font-size: 30px;">${evento.nombre}</a>`;

}


  mostrarUltimoEvento();


    async function mostrarPendientes() {
  const contenedor = document.getElementById('repeater-eventos');
  if (!contenedor) return;

  const hoyISO = new Date().toISOString(); // Fecha actual en formato ISO

  const { data, error } = await supabase
    .from('eventos')
    .select('id, nombre, descripcion, fecha_hora_inicio')
    .gte('fecha_hora_inicio', hoyISO) // Filtra desde hoy en adelante
    .order('fecha_hora_inicio', { ascending: true });

  if (error) {
    console.error('Error al cargar pendientes:', error.message);
    return;
  }

  contenedor.innerHTML = ''; // Limpia el contenido

  data.forEach((evento, index) => {
    const tareaHTML = `
      <div class="u-list-item u-radius u-repeater-item u-shape-round u-white">
        <div class="u-container-layout u-similar-container">
          <a href="./bienvenido.html?id=${evento.id}" class="u-file-icon u-icon u-text-custom-color-2">
            <img src="../assets/img/324725-85ae0245.png" alt="icono">
          </a>
          <h6>${evento.nombre}</h6>
          <p>${evento.descripcion}</p>
        </div>
      </div>
    `;
    contenedor.innerHTML += tareaHTML;
  });
}


document.addEventListener('DOMContentLoaded', () => {
  mostrarPendientes();
});