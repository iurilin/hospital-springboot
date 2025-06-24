import { apiRequest } from "./api.js"
import { Prontuario } from "../models/prontuarioModel.js"

export async function carregarProntuarioPorPaciente(pacienteId) {
  try {
    const data = await apiRequest(`/prontuarios/paciente/${pacienteId}`)
    return Prontuario.fromJSON(data)
  } catch (error) {
    console.error("Erro ao carregar prontuário:", error)
    throw error
  }
}

export async function salvarProntuario(prontuario) {
  try {
    const method = prontuario.id ? "PUT" : "POST"
    const path = prontuario.id ? `/prontuarios/${prontuario.id}` : "/prontuarios"

    const data = await apiRequest(path, {
      method,
      body: prontuario.toJSON(),
    })

    return Prontuario.fromJSON(data)
  } catch (error) {
    console.error("Erro ao salvar prontuário:", error)
    throw error
  }
}

export async function adicionarDiagnostico(prontuarioId, diagnostico) {
  try {
    return await apiRequest(`/prontuarios/${prontuarioId}/diagnosticos`, {
      method: "POST",
      body: diagnostico,
    })
  } catch (error) {
    console.error("Erro ao adicionar diagnóstico:", error)
    throw error
  }
}

export async function adicionarTratamento(prontuarioId, tratamento) {
  try {
    return await apiRequest(`/prontuarios/${prontuarioId}/tratamentos`, {
      method: "POST",
      body: tratamento,
    })
  } catch (error) {
    console.error("Erro ao adicionar tratamento:", error)
    throw error
  }
}

export async function adicionarExame(prontuarioId, exame) {
  try {
    return await apiRequest(`/prontuarios/${prontuarioId}/exames`, {
      method: "POST",
      body: exame,
    })
  } catch (error) {
    console.error("Erro ao adicionar exame:", error)
    throw error
  }
}
