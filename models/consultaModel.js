export class Consulta {

  /**
   * @param {Object} obj
   * @param {number|string} obj.id
   * @param {number|string} obj.pacienteId
   * @param {number|string} obj.medicoId
   * @param {string} obj.especialidade
   * @param {string} obj.data           
   * @param {string} obj.hora           
   * @param {string} obj.tipo           
   * @param {string} obj.status         
   * @param {string} obj.motivo
   * @param {string} obj.observacoes
   */
  constructor({
    id = null,
    pacienteId = null,
    medicoId = null,
    especialidade = '',
    data = '',
    hora = '',
    tipo = 'PRESENCIAL',
    status = 'AGENDADA',
    motivo = '',
    observacoes = ''
  } = {}) {
    this.id            = id;
    this.pacienteId    = pacienteId;
    this.medicoId      = medicoId;
    this.especialidade = especialidade;
    this.data          = data;
    this.hora          = hora;
    this.tipo          = tipo;
    this.status        = status;
    this.motivo        = motivo;
    this.observacoes   = observacoes;
  }

  toJSON() {
    return { ...this };
  }

  static fromJSON(json) {
    return new Consulta(json);
  }
}
