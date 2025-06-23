import { isLogged, clearAuth, getUserName } from './session.js';

export function renderHeader(navContainerId = 'navButtons', { showBtn = true } = {}) {
  const nav = document.getElementById(navContainerId);
  if (!nav) return;

  nav.innerHTML = '';

  if (showBtn) {
    const marcar = document.createElement('a');
    marcar.href = '#marcar-consulta';
    marcar.className = 'btn-primary';
    marcar.textContent = 'Marcar Consulta';
    nav.appendChild(marcar);
  }

  if (isLogged()) {
    const avatar = document.createElement('div');
    avatar.className = 'user-avatar';
    avatar.textContent = getUserName().trim().charAt(0).toUpperCase();
    avatar.title = 'Clique para sair';
    avatar.onclick = () => {
      if (confirm('Sair da conta?')) {
        clearAuth();
        renderHeader(navContainerId, { showBtn });
        window.location.href = '/';
      }
    };
    nav.appendChild(avatar);
  } else {
    const login = document.createElement('a');
    login.href = '/cadastro.html';
    login.className = 'btn-secondary';
    login.textContent = 'Cadastro/Login';
    nav.appendChild(login);
  }
}
