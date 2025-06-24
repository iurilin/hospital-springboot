import { saveAuth, isLogged } from "../utils/session.js"
import { renderHeader } from "../utils/header.js"

console.log("🔄 Carregando relatoriosController...")

class RelatoriosController {
  constructor() {
    this.tipoRelatorioSelecionado = "pacientes"
    this.init()
  }

  async init() {
    console.log("✅ Inicializando Relatórios")

    if (!isLogged()) {
      console.log("⚠️ Admin não logado, criando sessão fake")
      saveAuth({
        token: "admin-session-token",
        user: { nome: "Admin", tipo: "admin" },
      })
    }

    renderHeader("navButtons", { showBtn: false })

    this.configurarEventos()

    console.log("✅ RelatoriosController inicializado")
  }

  configurarEventos() {
    const radioButtons = document.querySelectorAll('input[name="tipoRelatorio"]')
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.tipoRelatorioSelecionado = e.target.value
        console.log("📊 Tipo de relatório selecionado:", this.tipoRelatorioSelecionado)
      })
    })

    const btnGerar = document.querySelector(".btn-gerar-relatorio")
    if (btnGerar) {
      btnGerar.addEventListener("click", () => {
        this.gerarRelatorio()
      })
    }

    const navLinks = document.querySelectorAll(".nav-links a")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        navLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
      })
    })
  }

  async gerarRelatorio() {
    try {
      console.log(`📊 Gerando relatório de ${this.tipoRelatorioSelecionado}...`)

      const btnGerar = document.querySelector(".btn-gerar-relatorio")
      btnGerar.disabled = true
      btnGerar.textContent = "Gerando..."

      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert(
        `Relatório de ${this.tipoRelatorioSelecionado} gerado com sucesso!\n\nEm produção, o arquivo seria baixado automaticamente.`,
      )

      console.log("✅ Relatório gerado")
    } catch (error) {
      console.error("❌ Erro ao gerar relatório:", error)
      alert("Erro ao gerar relatório. Tente novamente.")
    } finally {
      const btnGerar = document.querySelector(".btn-gerar-relatorio")
      btnGerar.disabled = false
      btnGerar.textContent = "Gerar Relatório"
    }
  }
}

window.gerarRelatorio = () => {
  const controller = window.relatoriosController
  if (controller) {
    controller.gerarRelatorio()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.relatoriosController = new RelatoriosController()
})
