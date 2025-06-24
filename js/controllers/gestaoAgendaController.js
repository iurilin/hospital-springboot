import { saveAuth, isLogged } from "../utils/session.js"
import { renderHeader } from "../utils/header.js"

console.log("🔄 Carregando gestaoAgendaController...")

class GestaoAgendaController {
  constructor() {
    this.calendars = []
    this.monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]
    this.dayNames = ["D", "S", "T", "Q", "Q", "S", "S"]
    this.availableTimes = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"]
    this.init()
  }

  async init() {
    console.log("✅ Inicializando Gestão de Agenda")

    if (!isLogged()) {
      console.log("⚠️ Usuário não logado, criando sessão fake")
      saveAuth({
        token: "medico-session-token",
        user: { nome: "Dr. Silva", tipo: "medico" },
      })
    }

    renderHeader("navButtons")

    this.inicializarCalendarios()

    this.renderTimeSlots()
    this.generateCalendar(0)
    this.generateCalendar(1)

    this.configurarEventos()

    console.log("✅ GestaoAgendaController inicializado")
  }

  inicializarCalendarios() {
    const now = new Date()
    this.calendars = [
      { year: now.getFullYear(), month: now.getMonth() },
      { year: now.getFullYear(), month: now.getMonth() + 1 },
    ]

    if (this.calendars[1].month > 11) {
      this.calendars[1].month = 0
      this.calendars[1].year++
    }
  }

  generateCalendar(calendarIndex) {
    const cal = this.calendars[calendarIndex]
    const grid = document.getElementById(`calendar-grid-${calendarIndex}`)
    const title = document.getElementById(`calendar-title-${calendarIndex}`)

    if (!grid || !title) return

    title.textContent = `${this.monthNames[cal.month]} ${cal.year}`
    grid.innerHTML = ""

    this.dayNames.forEach((day) => {
      const dayHeader = document.createElement("div")
      dayHeader.className = "calendar-day-header"
      dayHeader.textContent = day
      grid.appendChild(dayHeader)
    })

    const firstDayOfMonth = new Date(cal.year, cal.month, 1).getDay()
    const daysInMonth = new Date(cal.year, cal.month + 1, 0).getDate()
    const today = new Date()

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement("div")
      emptyCell.className = "calendar-day"
      grid.appendChild(emptyCell)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div")
      dayCell.className = "calendar-day"
      dayCell.textContent = day

      if (cal.year === today.getFullYear() && cal.month === today.getMonth() && day === today.getDate()) {
        dayCell.classList.add("today")
      }

      dayCell.addEventListener("click", () => {
        document.querySelectorAll(".calendar-day.selected").forEach((selected) => selected.classList.remove("selected"))
        dayCell.classList.add("selected")
      })

      grid.appendChild(dayCell)
    }
  }

  changeMonth(calendarIndex, direction) {
    const cal = this.calendars[calendarIndex]
    cal.month += direction

    if (cal.month > 11) {
      cal.month = 0
      cal.year++
    } else if (cal.month < 0) {
      cal.month = 11
      cal.year--
    }

    this.generateCalendar(calendarIndex)
  }

  renderTimeSlots() {
    const container = document.getElementById("time-slots-container")
    if (!container) return

    container.innerHTML = ""
    this.availableTimes.forEach((time) => {
      const timeSlot = document.createElement("div")
      timeSlot.className = "time-slot"
      timeSlot.innerHTML = `
        <div class="time-icon"></div>
        <span class="time-text">${time}</span>
      `
      container.appendChild(timeSlot)
    })
  }

  configurarEventos() {
    document.getElementById("prev-month-0")?.addEventListener("click", () => this.changeMonth(0, -1))
    document.getElementById("next-month-0")?.addEventListener("click", () => this.changeMonth(0, 1))
    document.getElementById("prev-month-1")?.addEventListener("click", () => this.changeMonth(1, -1))
    document.getElementById("next-month-1")?.addEventListener("click", () => this.changeMonth(1, 1))

    document.querySelectorAll(".consulta-item").forEach((item) => {
      item.addEventListener("click", () => {
        alert("Detalhes da consulta serão implementados em breve!")
      })
    })

    document.querySelectorAll(".sub-nav-item").forEach((navItem) => {
      navItem.addEventListener("click", (event) => {
        event.preventDefault()
        document.querySelectorAll(".sub-nav-item").forEach((item) => item.classList.remove("active"))
        navItem.classList.add("active")
      })
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GestaoAgendaController()
})
