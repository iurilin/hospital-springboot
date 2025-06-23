import { isLogged, clearAuth, getUserName } from "./session.js"

export function renderHeader(navContainerId = "navButtons", { showBtn = true } = {}) {
  const nav = document.getElementById(navContainerId)
  if (!nav) {
    console.error(`Elemento com ID '${navContainerId}' não encontrado`)
    return
  }

  nav.innerHTML = ""

  if (showBtn) {
    const marcar = document.createElement("a")
    marcar.href = "/views/marcarConsulta.html"
    marcar.className = "btn-primary"
    marcar.textContent = "Marcar Consulta"
    nav.appendChild(marcar)
  }

  if (isLogged()) {
    const avatar = document.createElement("div")
    avatar.className = "user-avatar"
    avatar.textContent = getUserName().trim().charAt(0).toUpperCase()
    avatar.title = "Clique para sair"
    avatar.style.cursor = "pointer"
    avatar.onclick = () => {
      if (confirm("Sair da conta?")) {
        clearAuth()
        renderHeader(navContainerId, { showBtn })
        window.location.href = "/views/home.html"
      }
    }
    nav.appendChild(avatar)
  } else {
    const login = document.createElement("a")
    login.href = "/views/login.html"
    login.className = "btn-secondary"
    login.textContent = "Cadastro/Login"
    nav.appendChild(login)
  }
}
