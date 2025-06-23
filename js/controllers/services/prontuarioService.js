import { apiRequest } from './api.js';
import { Prontuario } from '../models/prontuarioModel.js';

export async function carregarProntuarioPorPaciente(pacienteId) {
  const json = await apiRequest(`/prontuarios/paciente/${pacienteId}`);
  return Prontuario.fromJSON(json);
}

export async function adicionarDiagnostico(prontuarioId, diagnosticoObj) {
  return apiRequest(`/prontuarios/${prontuarioId}/diagnosticos`, {
    method: 'POST',
    body: diagnosticoObj
  });
}

export async function adicionarTratamento(prontuarioId, tratamentoObj) {
  return apiRequest(`/prontuarios/${prontuarioId}/tratamentos`, {
    method: 'POST',
    body: tratamentoObj
  });
}
