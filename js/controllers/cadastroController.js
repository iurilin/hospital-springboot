import { renderHeader } from "../utils/header.js"
import { register } from "../services/authService.js"

console.log("🔄 Carregando cadastroController...")

class CadastroController {
  constructor() {
    this.init()
  }

  init() {
    console.log("✅ Inicializando Cadastro")

    renderHeader("navButtons")

    this.configurarFormulario()

    console.log("✅ CadastroController inicializado")
  }

  configurarFormulario() {
    const form = document.getElementById("registrationForm")
    const cpfInput = document.getElementById("cpf")
    const dateOfBirthInput = document.getElementById("dateOfBirth")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const registerBtn = document.getElementById("registerBtn")

    if (!form || !cpfInput || !emailInput || !passwordInput) {
      console.error("Elementos do formulário não encontrados")
      return
    }

    cpfInput.addEventListener("input", (e) => {
      e.target.value = this.formatCPF(e.target.value)
      document.getElementById("cpfGroup").classList.remove("error")
    })

    dateOfBirthInput.addEventListener("input", () => {
      document.getElementById("dateOfBirthGroup").classList.remove("error")
    })

    emailInput.addEventListener("input", () => {
      document.getElementById("emailGroup").classList.remove("error")
    })

    passwordInput.addEventListener("input", () => {
      document.getElementById("passwordGroup").classList.remove("error")
    })

    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      await this.handleSubmit(e)
    })
  }

  formatCPF(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "")
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false
    }
    const digits = cpf.split("").map((el) => +el)
    const rest = (count) => {
      return ((digits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10
    }
    return rest(10) === digits[9] && rest(11) === digits[10]
  }

  validateEmail(email) {
    const re = /^\S+@\S+\.\S+$/
    return re.test(String(email).toLowerCase())
  }

  validateDateOfBirth(dateString) {
    const birthDate = new Date(dateString)
    const today = new Date()

    birthDate.setMinutes(birthDate.getMinutes() + birthDate.getTimezoneOffset())
    today.setHours(0, 0, 0, 0)

    if (!dateString || isNaN(birthDate.getTime())) {
      return { isValid: false, message: "Data de nascimento é obrigatória." }
    }

    if (birthDate > today) {
      return { isValid: false, message: "A data de nascimento não pode ser no futuro." }
    }

    const age_dt = new Date(today.valueOf() - birthDate.valueOf())
    const age = Math.abs(age_dt.getUTCFullYear() - 1970)

    if (age < 18) {
      return { isValid: false, message: "Você deve ter pelo menos 18 anos." }
    }

    return { isValid: true, message: "" }
  }

  validateForm() {
    let isValid = true

    const cpfInput = document.getElementById("cpf")
    const dateOfBirthInput = document.getElementById("dateOfBirth")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    const cpfGroup = document.getElementById("cpfGroup")
    if (!cpfInput.value || !this.validateCPF(cpfInput.value)) {
      cpfGroup.classList.add("error")
      isValid = false
    } else {
      cpfGroup.classList.remove("error")
    }

    const dateOfBirthGroup = document.getElementById("dateOfBirthGroup")
    const dateValidation = this.validateDateOfBirth(dateOfBirthInput.value)
    if (!dateValidation.isValid) {
      dateOfBirthGroup.classList.add("error")
      document.getElementById("dateOfBirthError").textContent = dateValidation.message
      isValid = false
    } else {
      dateOfBirthGroup.classList.remove("error")
    }

    const emailGroup = document.getElementById("emailGroup")
    if (!emailInput.value || !this.validateEmail(emailInput.value)) {
      emailGroup.classList.add("error")
      isValid = false
    } else {
      emailGroup.classList.remove("error")
    }

    const passwordGroup = document.getElementById("passwordGroup")
    if (!passwordInput.value || passwordInput.value.length < 1) {
      passwordGroup.classList.add("error")
      isValid = false
    } else {
      passwordGroup.classList.remove("error")
    }

    return isValid
  }

  async handleSubmit(e) {
    if (!this.validateForm()) {
      return
    }

    const registerBtn = document.getElementById("registerBtn")
    const cpfInput = document.getElementById("cpf")
    const dateOfBirthInput = document.getElementById("dateOfBirth")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    registerBtn.classList.add("loading")
    registerBtn.disabled = true

    const formData = {
      cpf: cpfInput.value.replace(/[^\d]+/g, ""),
      dateOfBirth: dateOfBirthInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    }

    try {
      const data = await register(formData)
      alert("Cadastro realizado com sucesso!")
      window.location.href = "/views/perfilPaciente.html"
    } catch (error) {
      console.error("Erro no cadastro:", error)
      alert(error.message || "Erro ao realizar cadastro. Verifique os dados.")
    } finally {
      registerBtn.classList.remove("loading")
      registerBtn.disabled = false
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CadastroController()
})
