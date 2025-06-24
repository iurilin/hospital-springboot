import { saveAuth, isLogged } from "../utils/session.js"
import { renderHeader } from "../utils/header.js"

console.log("🔄 Carregando dashboardController...")

class DashboardController {
  constructor() {
    this.metricas = {
      totalPacientes: 0,
      consultasAgendadas: 0,
      medicosAtivos: 0,
    }
    this.init()
  }

  async init() {
    console.log("✅ Inicializando Dashboard")

    if (!isLogged()) {
      console.log("⚠️ Admin não logado, criando sessão fake")
      saveAuth({
        token: "admin-session-token",
        user: { nome: "Admin", tipo: "admin" },
      })
    }

    renderHeader("navButtons", { showBtn: false })

    await this.carregarDados()

    this.configurarEventos()

    console.log("✅ DashboardController inicializado")
  }

  async carregarDados() {
    try {
      console.log("📊 Carregando dados do dashboard...")

      this.metricas = {
        totalPacientes: 1250,
        consultasAgendadas: 320,
        medicosAtivos: 45,
      }

      this.atualizarMetricas()
      console.log("✅ Dados carregados")
    } catch (error) {
      console.error("❌ Erro ao carregar dados:", error)
    }
  }

  atualizarMetricas() {
    const metricCards = document.querySelectorAll(".metric-card")

    if (metricCards.length >= 3) {
      metricCards[0].querySelector(".metric-value").textContent = this.metricas.totalPacientes.toLocaleString()
      metricCards[1].querySelector(".metric-value").textContent = this.metricas.consultasAgendadas.toLocaleString()
      metricCards[2].querySelector(".metric-value").textContent = this.metricas.medicosAtivos.toLocaleString()
    }
  }

  configurarEventos() {
    const tableRows = document.querySelectorAll("tbody tr")
    tableRows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        row.style.background = "#f8f9fa"
      })
      row.addEventListener("mouseleave", () => {
        row.style.background = ""
      })
    })

    const navLinks = document.querySelectorAll(".nav-links a")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        navLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
      })
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DashboardController()
})
import { saveAuth, isLogged } from "../utils/session.js"
import { renderHeader } from "../utils/header.js"

console.log("🔄 Carregando dashboardController...")

class DashboardController {
  constructor() {
    this.metricas = {
      totalPacientes: 0,
      consultasAgendadas: 0,
      medicosAtivos: 0,
    }
    this.init()
  }

  async init() {
    console.log("✅ Inicializando Dashboard")

    if (!isLogged()) {
      console.log("⚠️ Admin não logado, criando sessão fake")
      saveAuth({
        token: "admin-session-token",
        user: { nome: "Admin", tipo: "admin" },
      })
    }

    renderHeader("navButtons", { showBtn: false })

    await this.carregarDados()

    this.configurarEventos()

    console.log("✅ DashboardController inicializado")
  }

  async carregarDados() {
    try {
      console.log("📊 Carregando dados do dashboard...")
      this.metricas = {
        totalPacientes: 1250,
        consultasAgendadas: 320,
        medicosAtivos: 45,
      }

      this.atualizarMetricas()
      console.log("✅ Dados carregados")
    } catch (error) {
      console.error("❌ Erro ao carregar dados:", error)
    }
  }

  atualizarMetricas() {
    const metricCards = document.querySelectorAll(".metric-card")

    if (metricCards.length >= 3) {
      metricCards[0].querySelector(".metric-value").textContent = this.metricas.totalPacientes.toLocaleString()
      metricCards[1].querySelector(".metric-value").textContent = this.metricas.consultasAgendadas.toLocaleString()
      metricCards[2].querySelector(".metric-value").textContent = this.metricas.medicosAtivos.toLocaleString()
    }
  }

  configurarEventos() {
    const tableRows = document.querySelectorAll("tbody tr")
    tableRows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        row.style.background = "#f8f9fa"
      })
      row.addEventListener("mouseleave", () => {
        row.style.background = ""
      })
    })

    const navLinks = document.querySelectorAll(".nav-links a")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        navLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
      })
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DashboardController()
})
