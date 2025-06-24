import { saveAuth, isLogged } from "../utils/session.js"
import { renderHeader } from "../utils/header.js"
import { initializeTabs } from "../utils/tabs.js"
import { Paciente } from "../models/pacienteModel.js"

console.log("🔄 Carregando perfilPacienteController...")

class PerfilPacienteController {
  constructor() {
    this.paciente = null
    this.init()
  }

  async init() {
    console.log("✅ Inicializando Perfil do Paciente")

    // Verificação de login
    if (!isLogged()) {
      console.log("⚠️ Usuário não logado, criando sessão fake para desenvolvimento")
      saveAuth({
        token: "dev-session-token",
        user: { nome: "Sofia Almeida", tipo: "paciente" },
      })
    }

    // Renderizar header
    try {
      renderHeader("navButtons")
      console.log("✅ Header renderizado")
    } catch (error) {
      console.error("❌ Erro ao renderizar header:", error)
    }

    // Inicializar sistema de abas
    const tabsInitialized = initializeTabs()
    if (!tabsInitialized) {
      console.error("❌ Falha ao inicializar sistema de abas")
      return
    }

    // Carregar dados do paciente
    await this.carregarDadosPaciente()

    // Configurar eventos adicionais
    this.configurarEventos()

    console.log("✅ PerfilPacienteController inicializado com sucesso")
  }

  async carregarDadosPaciente() {
    try {
      console.log("📋 Carregando dados do paciente...")

      // Em desenvolvimento, usar dados mock
      // Em produção, buscar da API: this.paciente = await buscarPaciente(pacienteId);
      this.paciente = new Paciente({
        id: 1,
        nome: "Sofia Almeida",
        email: "sofia.almeida@email.com",
        cpf: "123.456.789-00",
        telefone: "+11 94545 5678",
        sexo: "Feminino",
        dataNascimento: "1994-05-15",
        endereco: "Rua das Flores, 123, Lisboa",
      })

      this.atualizarInterfaceComDados()
      console.log("✅ Dados do paciente carregados")
    } catch (error) {
      console.error("❌ Erro ao carregar dados do paciente:", error)
      this.mostrarErro("Erro ao carregar dados do paciente")
    }
  }

  atualizarInterfaceComDados() {
    if (!this.paciente) return

    // Atualizar informações na interface
    const elementos = {
      ".patient-details h2": this.paciente.nome,
      ".info-value": [
        this.paciente.nome,
        this.paciente.sexo,
        this.paciente.telefone,
        this.paciente.getDataFormatada?.() || "15 de Maio de 1994",
        this.paciente.endereco,
        this.paciente.email,
      ],
    }

    // Atualizar nome do paciente
    const nomeElement = document.querySelector(".patient-details h2")
    if (nomeElement) {
      nomeElement.textContent = this.paciente.nome
    }

    // Atualizar valores das informações
    const infoValues = document.querySelectorAll(".info-value")
    const valores = [
      this.paciente.nome,
      this.paciente.sexo,
      this.paciente.telefone,
      "15 de Maio de 1994", // Formatado
      this.paciente.endereco,
      this.paciente.email,
    ]

    infoValues.forEach((element, index) => {
      if (valores[index]) {
        element.textContent = valores[index]
      }
    })
  }

  configurarEventos() {
    // Hover effect para linhas da tabela
    const tableRows = document.querySelectorAll("tbody tr")
    console.log(`📋 Configurando hover para ${tableRows.length} linhas da tabela`)

    tableRows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        row.style.background = "#f8f9fa"
      })

      row.addEventListener("mouseleave", () => {
        row.style.background = ""
      })
    })

    // Links de visualização de laudos
    const btnLinks = document.querySelectorAll(".btn-link")
    btnLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        this.visualizarLaudo(link)
      })
    })
  }

  visualizarLaudo(linkElement) {
    // Em produção, abrir modal ou nova página com o laudo
    const tipoExame = linkElement.closest("tr")?.cells[1]?.textContent || "Exame"
    alert(`Visualização do laudo: ${tipoExame}\n\nEsta funcionalidade será implementada com o backend.`)
  }

  mostrarErro(mensagem) {
    console.error("❌", mensagem)
    // Em produção, mostrar toast ou modal de erro
    alert(`Erro: ${mensagem}`)
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new PerfilPacienteController()
})
