import { saveAuth, isLogged } from "../utils/session.js"
import { renderHeader } from "../utils/header.js"
import { initializeTabs } from "../utils/tabs.js"
import { Prontuario } from "../models/prontuarioModel.js"

console.log("🔄 Carregando prontuarioController...")

class ProntuarioController {
  constructor() {
    this.prontuario = null
    this.pacienteId = 1 
  }

  async init() {
    console.log("✅ Inicializando Prontuário")

    if (!isLogged()) {
      console.log("⚠️ Usuário não logado, criando sessão fake para desenvolvimento")
      saveAuth({
        token: "dev-session-token",
        user: { nome: "Dr. Clara Santos", tipo: "medico" },
      })
    }

    try {
      renderHeader("navButtons", { showBtn: false })
      console.log("✅ Header renderizado")
    } catch (error) {
      console.error("❌ Erro ao renderizar header:", error)
    }

    const tabsInitialized = initializeTabs()
    if (!tabsInitialized) {
      console.error("❌ Falha ao inicializar sistema de abas")
      return
    }

    await this.carregarProntuario()

    this.configurarEventos()

    console.log("✅ ProntuarioController inicializado com sucesso")
  }

  async carregarProntuario() {
    try {
      console.log("📋 Carregando prontuário do paciente...")

      this.prontuario = new Prontuario({
        id: 1,
        pacienteId: this.pacienteId,
        informacoesPessoais: {
          nome: "Sofia Almeida",
          dataNascimento: "1994-05-15",
          sexo: "Feminino",
          telefone: "+11 94545 5678",
          email: "sofia.almeida@email.com",
          endereco: "Rua das Flores, 123, Lisboa",
        },
        consultas: [],
        exames: [
          {
            id: 1,
            data: "2024-01-15",
            tipo: "Raio-X do Tórax",
            resultado: "Normal",
            laudo: "Estruturas pulmonares normais",
          },
          {
            id: 2,
            data: "2024-02-20",
            tipo: "Ultrassonografia Abdominal",
            resultado: "Sem alterações",
            laudo: "Órgãos abdominais sem alterações",
          },
        ],
        diagnosticos: [
          {
            id: 1,
            data: "2024-03-22",
            diagnostico: "Hipertensão",
            observacoes: "Paciente apresenta pressão arterial elevada constantemente",
          },
          {
            id: 2,
            data: "2024-03-22",
            diagnostico: "Diabetes Tipo 2",
            observacoes: "Níveis de glicose elevados",
          },
        ],
        tratamentos: [
          {
            id: 1,
            data: "2024-03-23",
            tratamento: "Medicação X",
            dosagem: "50mg",
            observacoes: "Administrar uma vez ao dia",
          },
          {
            id: 2,
            data: "2024-03-23",
            tratamento: "Fisioterapia",
            dosagem: "Sessões semanais",
            observacoes: "Fortalecimento",
          },
        ],
      })

      this.atualizarInterface()
      console.log("✅ Prontuário carregado")
    } catch (error) {
      console.error("❌ Erro ao carregar prontuário:", error)
      this.mostrarErro("Erro ao carregar prontuário do paciente")
    }
  }

  atualizarInterface() {
    if (!this.prontuario) return

    const info = this.prontuario.informacoesPessoais
    const inputs = {
      'input[value="Sofia Almeida"]': info.nome,
      'input[value="1994-05-15"]': info.dataNascimento,
      'input[value="+11 94545 5678"]': info.telefone,
      'input[value="sofia.almeida@email.com"]': info.email,
      'input[value="Rua das Flores, 123, Lisboa"]': info.endereco,
    }

    Object.entries(inputs).forEach(([selector, value]) => {
      const element = document.querySelector(selector)
      if (element && value) {
        element.value = value
      }
    })

    const sexoSelect = document.querySelector("select.form-input")
    if (sexoSelect && info.sexo) {
      const option = sexoSelect.querySelector(`option[value="${info.sexo.toLowerCase()}"]`)
      if (option) {
        option.selected = true
      }
    }
  }

  configurarEventos() {
    const btnLinks = document.querySelectorAll(".btn-link")
    btnLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        this.visualizarDocumento(link)
      })
    })

    const btnAddDiagnostico = document.querySelector(".btn-primary-action")
    if (btnAddDiagnostico) {
      btnAddDiagnostico.addEventListener("click", () => {
        this.adicionarDiagnostico()
      })
    }

    const btnAddTratamento = document.querySelector(".btn-secondary-action")
    if (btnAddTratamento) {
      btnAddTratamento.addEventListener("click", () => {
        this.adicionarTratamento()
      })
    }

    const inputs = document.querySelectorAll(".form-input")
    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        this.salvarAlteracoes()
      })
    })
  }

  visualizarDocumento(linkElement) {
    const row = linkElement.closest("tr")
    const tipoExame = row?.cells[1]?.textContent || "Documento"

    alert(`Visualizando: ${tipoExame}\n\nEsta funcionalidade será implementada com o backend.`)
  }

  async adicionarDiagnostico() {
    const diagnostico = prompt("Digite o diagnóstico:")
    const observacoes = prompt("Observações (opcional):")

    if (!diagnostico) return

    try {
      const novoDiagnostico = {
        data: new Date().toISOString().split("T")[0],
        diagnostico,
        observacoes: observacoes || "",
      }

      this.prontuario.addDiagnostico(novoDiagnostico)

      alert("Diagnóstico adicionado com sucesso!")
      console.log("✅ Diagnóstico adicionado:", novoDiagnostico)
    } catch (error) {
      console.error("❌ Erro ao adicionar diagnóstico:", error)
      this.mostrarErro("Erro ao adicionar diagnóstico")
    }
  }

  async adicionarTratamento() {
    const tratamento = prompt("Digite o tratamento:")
    const dosagem = prompt("Dosagem:")
    const observacoes = prompt("Observações (opcional):")

    if (!tratamento) return

    try {
      const novoTratamento = {
        data: new Date().toISOString().split("T")[0],
        tratamento,
        dosagem: dosagem || "",
        observacoes: observacoes || "",
      }

      this.prontuario.addTratamento(novoTratamento)

      alert("Tratamento adicionado com sucesso!")
      console.log("✅ Tratamento adicionado:", novoTratamento)
    } catch (error) {
      console.error("❌ Erro ao adicionar tratamento:", error)
      this.mostrarErro("Erro ao adicionar tratamento")
    }
  }

  async salvarAlteracoes() {
    try {
      const inputs = document.querySelectorAll(".form-input")
      const dadosAtualizados = {}

      inputs.forEach((input) => {
        if (input.name) {
          dadosAtualizados[input.name] = input.value
        }
      })

      console.log("💾 Salvando alterações:", dadosAtualizados)
    } catch (error) {
      console.error("❌ Erro ao salvar alterações:", error)
      this.mostrarErro("Erro ao salvar alterações")
    }
  }

  mostrarErro(mensagem) {
    console.error("❌", mensagem)
    alert(`Erro: ${mensagem}`)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ProntuarioController()
})
