
export function saveAuth({ token, user }) {
  localStorage.setItem("authToken", token)
  localStorage.setItem("userName", user.nome)
}

export function clearAuth() {
  localStorage.removeItem("authToken")
  localStorage.removeItem("userName")
}

export function isLogged() {
  return !!localStorage.getItem("authToken")
}

export function getUserName() {
  return localStorage.getItem("userName") || "Usuário"
}

export function getAuthToken() {
  return localStorage.getItem("authToken")
}
