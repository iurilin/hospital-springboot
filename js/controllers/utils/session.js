export function saveAuth({ token, user }) {
  localStorage.setItem("authToken", token)
  localStorage.setItem("userName", user.nome)
  localStorage.setItem("userType", user.tipo || "paciente")
}

export function clearAuth() {
  localStorage.removeItem("authToken")
  localStorage.removeItem("userName")
  localStorage.removeItem("userType")
}

export function isLogged() {
  return !!localStorage.getItem("authToken")
}

export function getUserName() {
  return localStorage.getItem("userName") || "Usuário"
}

export function getUserType() {
  return localStorage.getItem("userType") || "paciente"
}

export function getAuthToken() {
  return localStorage.getItem("authToken")
}
