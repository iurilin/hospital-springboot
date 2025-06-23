import { apiRequest } from './api.js';
import { Paciente }   from '../models/pacienteModel.js';

export async function buscarPaciente(id) {
  return Paciente.fromJSON(await apiRequest(`/pacientes/${id}`));
}

export async function criarPaciente(paciente) {
  const json = await apiRequest('/pacientes', { method: 'POST', body: paciente.toJSON() });
  return Paciente.fromJSON(json);
}

export async function atualizarPaciente(id, paciente) {
  const json = await apiRequest(`/pacientes/${id}`, { method: 'PUT', body: paciente.toJSON() });
  return Paciente.fromJSON(json);
}

export async function excluirPaciente(id) {
  await apiRequest(`/pacientes/${id}`, { method: 'DELETE' });
}
