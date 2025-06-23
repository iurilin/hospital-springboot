import { login } from "../services/authService.js"
import { renderHeader } from "./utils/header.js"

function formatCPF(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "")
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
  const digits = cpf.split("").map(Number)
  const rest = (count) => ((digits.slice(0, count - 12).reduce((s, el, i) => s + el * (count - i), 0) * 10) % 11) % 10
  return rest(10) === digits[9] && rest(11) === digits[10]
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("navButtons")

  const cpfInput = document.getElementById("cpf")
  const passwordInput = document.getElementById("password")
  const loginForm = document.getElementById("loginForm")
  const loginBtn = document.getElementById("loginBtn")

  if (!cpfInput || !passwordInput || !loginForm || !loginBtn) {
    console.error("Elementos do formulário não encontrados")
    return
  }

  cpfInput.oninput = (e) => {
    e.target.value = formatCPF(e.target.value)
    document.getElementById("cpfGroup").classList.remove("error")
  }

  passwordInput.oninput = () => document.getElementById("passwordGroup").classList.remove("error")

  loginForm.onsubmit = async (e) => {
    e.preventDefault()
    if (!validaCampos()) return

    loginBtn.classList.add("loading")
    loginBtn.disabled = true

    try {
      await login(cpfInput.value.replace(/[^\d]+/g, ""), passwordInput.value)
      renderHeader("navButtons")
      window.location.href = "/views/perfilPaciente.html"
    } catch (err) {
      alert(err.message)
    } finally {
      loginBtn.classList.remove("loading")
      loginBtn.disabled = false
    }
  }

  function validaCampos() {
    let ok = true
    if (!cpfInput.value || !validateCPF(cpfInput.value)) {
      document.getElementById("cpfGroup").classList.add("error")
      ok = false
    }
    if (!passwordInput.value) {
      document.getElementById("passwordGroup").classList.add("error")
      ok = false
    }
    return ok
  }
})
