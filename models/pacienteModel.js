export class Paciente {
  constructor({
    id = null,
    nome = "",
    email = "",
    cpf = "",
    telefone = "",
    sexo = "",
    dataNascimento = "",
    endereco = "",
  } = {}) {
    this.id = id
    this.nome = nome
    this.email = email
    this.cpf = cpf
    this.telefone = telefone
    this.sexo = sexo
    this.dataNascimento = dataNascimento
    this.endereco = endereco
  }

  toJSON() {
    return { ...this }
  }

  static fromJSON(json) {
    return new Paciente(json)
  }
}
