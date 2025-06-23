import { Consulta } from './consultaModel.js';

export class Prontuario {

  /**
   * @param {Object} obj
   * @param {number|string} obj.id
   * @param {number|string} obj.pacienteId
   * @param {Object} obj.informacoesPessoais   
   * @param {Array<Object>|Array<Consulta>} obj.consultas
   * @param {Array<Object>} obj.exames
   * @param {Array<Object>} obj.diagnosticos
   * @param {Array<Object>} obj.tratamentos
   */
  constructor({
    id = null,
    pacienteId = null,
    informacoesPessoais = {},
    consultas = [],
    exames = [],
    diagnosticos = [],
    tratamentos = []
  } = {}) {
    this.id                  = id;
    this.pacienteId          = pacienteId;
    this.informacoesPessoais = informacoesPessoais;
    this.consultas           = consultas.map(c => c instanceof Consulta ? c : new Consulta(c));
    this.exames              = exames;
    this.diagnosticos        = diagnosticos;
    this.tratamentos         = tratamentos;
  }

  addConsulta(consulta) {
    this.consultas.push(
      consulta instanceof Consulta ? consulta : new Consulta(consulta)
    );
  }

  toJSON() {
    return {
      ...this,
      consultas: this.consultas.map(c => c.toJSON ? c.toJSON() : c)
    };
  }

  static fromJSON(json) {
    return new Prontuario(json);
  }
}
