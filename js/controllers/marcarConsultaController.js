import { saveAuth, isLogged }      from './utils/session.js';
import { renderHeader }            from './utils/header.js';
import { Consulta }                from '../models/consultaModel.js';
import { criarConsulta }           from '../services/consultaService.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!isLogged()) saveAuth({ token: 'session', user: { nome: 'Paciente' } });
  renderHeader('navButtons');

  const specialty = document.getElementById('specialty');
  const doctor    = document.getElementById('doctor');

  specialty.onchange = () => updateDoctorOptions(specialty.value);
  document.getElementById('appointmentForm').onsubmit = handleSubmit;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isLogged()) { alert('Você precisa estar logado!'); return; }

    const consulta = new Consulta({
      pacienteId    : 1,            
      medicoId      : doctor.value,
      especialidade : specialty.value,
      data          : document.getElementById('date').value,
      hora          : document.getElementById('time').value,
      tipo          : document.querySelector('input[name="consultationType"]:checked')?.value
    });

    if (!consulta.especialidade || !consulta.medicoId || !consulta.data || !consulta.hora) {
      alert('Preencha todos os campos!');  return;
    }

    try {
      await criarConsulta(consulta);
      alert('Consulta agendada com sucesso!');
    } catch (err) {
      alert('Erro ao agendar: ' + err.message);
    }
  }

  function updateDoctorOptions(area) {
    const mapa = {
      cardiologia : ['Dr. Carlos Pereira', 'Dra. Lucia Santos'],
      dermatologia: ['Dra. Sofia Mendes',  'Dr. Ricardo Alves'],
      neurologia  : ['Dr. Fernando Lima',  'Dra. Patricia Costa'],
      pediatria   : ['Dra. Ana Oliveira',  'Dr. Miguel Santos'],
      ortopedia   : ['Dr. João Silva',     'Dra. Carla Mendes']
    };

    doctor.innerHTML = '<option value="">Selecione o médico</option>';
    (mapa[area] || []).forEach((m, i) => {
      const opt = document.createElement('option');
      opt.value = `med-${area}-${i}`;
      opt.textContent = m;
      doctor.appendChild(opt);
    });
  }
});
