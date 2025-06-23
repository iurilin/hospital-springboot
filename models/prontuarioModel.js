import { Consulta } from "./consultaModel.js"

export class Prontuario {
  constructor({
    id = null,
    pacienteId = null,
    informacoesPessoais = {},
    consultas = [],
    exames = [],
    diagnosticos = [],
    tratamentos = [],
  } = {}) {
    this.id = id
    this.pacienteId = pacienteId
    this.informacoesPessoais = informacoesPessoais
    this.consultas = consultas.map((c) => (c instanceof Consulta ? c : new Consulta(c)))
    this.exames = exames
    this.diagnosticos = diagnosticos
    this.tratamentos = tratamentos
  }

  addConsulta(consulta) {
    this.consultas.push(consulta instanceof Consulta ? consulta : new Consulta(consulta))
  }

  toJSON() {
    return {
      ...this,
      consultas: this.consultas.map((c) => (c.toJSON ? c.toJSON() : c)),
    }
  }

  static fromJSON(json) {
    return new Prontuario(json)
  }
}
