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

  // Validações
  isValid() {
    return this.nome && this.email && this.cpf
  }

  getIdadeCalculada() {
    if (!this.dataNascimento) return null
    const hoje = new Date()
    const nascimento = new Date(this.dataNascimento)
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--
    }
    return idade
  }
}
