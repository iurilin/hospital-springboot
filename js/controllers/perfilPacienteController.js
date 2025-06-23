import { saveAuth, isLogged } from './utils/session.js';
import { renderHeader }       from './utils/header.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!isLogged()) saveAuth({ token: 'session', user: { nome: 'Sofia' } });
  renderHeader('navButtons');

  document.querySelectorAll('.tab').forEach(tab =>
    tab.onclick = e => { e.preventDefault(); switchTabs(tab.dataset.tab); });

  document.querySelectorAll('tbody tr').forEach(r => {
    r.onmouseenter = () => r.style.background = '#f8f9fa';
    r.onmouseleave = () => r.style.background = '';
  });

  function switchTabs(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${id}"]`).classList.add('active');
    document.getElementById(id).classList.add('active');
  }
});
