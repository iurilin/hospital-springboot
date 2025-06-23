import { saveAuth, isLogged } from './utils/session.js';
import { renderHeader }       from './utils/header.js';
import { Prontuario }         from '../models/prontuarioModel.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!isLogged()) saveAuth({ token: 'session', user: { nome: 'Clara' } });
  renderHeader('navButtons', { showBtn: false });

  document.querySelectorAll('.tab').forEach(tab =>
    tab.onclick = () => switchTabs(tab.dataset.tab));

  document.querySelectorAll('.btn-link').forEach(link =>
    link.onclick = e => { e.preventDefault(); alert('Visualização indisponível.'); });

  const prontuario = new Prontuario({ pacienteId: 1 });
  console.log('Prontuário carregado:', prontuario);

  function switchTabs(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${id}"]`).classList.add('active');
    document.getElementById(id).classList.add('active');
  }
});
