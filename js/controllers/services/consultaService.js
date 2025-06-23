import { apiRequest } from './api.js';
import { Consulta }   from '../models/consultaModel.js';

export async function listarConsultas() {
  const json = await apiRequest('/consultas');
  return json.map(c => Consulta.fromJSON(c));
}

export async function buscarConsulta(id) {
  return Consulta.fromJSON(await apiRequest(`/consultas/${id}`));
}

export async function criarConsulta(consulta) {
  const json = await apiRequest('/consultas', { method: 'POST', body: consulta.toJSON() });
  return Consulta.fromJSON(json);
}

export async function atualizarConsulta(id, consulta) {
  const json = await apiRequest(`/consultas/${id}`, { method: 'PUT', body: consulta.toJSON() });
  return Consulta.fromJSON(json);
}

export async function cancelarConsulta(id) {
  await apiRequest(`/consultas/${id}`, { method: 'DELETE' });
}
