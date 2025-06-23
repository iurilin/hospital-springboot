import { clearAuth } from "../utils/session.js"

const BASE_URL = "http://localhost:8080/api"

export async function apiRequest(
  path,
  { method = "GET", body = null, token = localStorage.getItem("authToken") } = {},
) {
  const headers = { "Content-Type": "application/json" }
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    })

    if (res.status === 401) {
      clearAuth()
      window.location.href = "/views/login.html"
      throw new Error("Sessão expirada")
    }

    if (!res.ok) {
      const err = await res.text()
      throw new Error(err || res.statusText)
    }

    return res.status === 204 ? null : res.json()
  } catch (error) {
    console.error("Erro na API:", error)
    throw error
  }
}
