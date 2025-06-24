import { apiRequest } from "./api.js"
import { Paciente } from "../models/pacienteModel.js"

export async function buscarPaciente(id) {
  try {
    const data = await apiRequest(`/pacientes/${id}`)
    return Paciente.fromJSON(data)
  } catch (error) {
    console.error("Erro ao buscar paciente:", error)
    throw error
  }
}

export async function criarPaciente(paciente) {
  try {
    const data = await apiRequest("/pacientes", {
      method: "POST",
      body: paciente.toJSON(),
    })
    return Paciente.fromJSON(data)
  } catch (error) {
    console.error("Erro ao criar paciente:", error)
    throw error
  }
}

export async function atualizarPaciente(id, paciente) {
  try {
    const data = await apiRequest(`/pacientes/${id}`, {
      method: "PUT",
      body: paciente.toJSON(),
    })
    return Paciente.fromJSON(data)
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error)
    throw error
  }
}

export async function excluirPaciente(id) {
  try {
    await apiRequest(`/pacientes/${id}`, { method: "DELETE" })
  } catch (error) {
    console.error("Erro ao excluir paciente:", error)
    throw error
  }
}

export async function listarPacientes() {
  try {
    const data = await apiRequest("/pacientes")
    return data.map((p) => Paciente.fromJSON(p))
  } catch (error) {
    console.error("Erro ao listar pacientes:", error)
    throw error
  }
}
