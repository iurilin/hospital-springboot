export class Paciente {

  /** 
   * @param {Object} obj 
   * @param {number|string} obj.id
   * @param {string} obj.nome
   * @param {string} obj.email
   * @param {string} obj.cpf
   * @param {string} obj.telefone
   * @param {string} obj.sexo            
   * @param {string} obj.dataNascimento 
   * @param {string} obj.endereco
   */
  constructor({
    id = null,
    nome = '',
    email = '',
    cpf = '',
    telefone = '',
    sexo = '',
    dataNascimento = '',
    endereco = ''
  } = {}) {
    this.id             = id;
    this.nome           = nome;
    this.email          = email;
    this.cpf            = cpf;
    this.telefone       = telefone;
    this.sexo           = sexo;
    this.dataNascimento = dataNascimento;
    this.endereco       = endereco;
  }

  toJSON() {
    return { ...this };
  }

  static fromJSON(json) {
    return new Paciente(json);
  }
}
