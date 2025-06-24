export class Consulta {
  constructor({
    id = null,
    pacienteId = null,
    medicoId = null,
    especialidade = "",
    data = "",
    hora = "",
    tipo = "presencial",
    status = "agendada",
    observacoes = "",
  } = {}) {
    this.id = id
    this.pacienteId = pacienteId
    this.medicoId = medicoId
    this.especialidade = especialidade
    this.data = data
    this.hora = hora
    this.tipo = tipo
    this.status = status
    this.observacoes = observacoes
  }

  toJSON() {
    return { ...this }
  }

  static fromJSON(json) {
    return new Consulta(json)
  }

  isValid() {
    return this.pacienteId && this.medicoId && this.especialidade && this.data && this.hora
  }

  getDataFormatada() {
    if (!this.data) return ""
    const date = new Date(this.data)
    return date.toLocaleDateString("pt-BR")
  }
}
