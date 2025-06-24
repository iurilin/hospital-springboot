import { clearAuth } from "../utils/session.js"

const BASE_URL = "http://localhost:8080/api"

export async function apiRequest(
  path,
  { method = "GET", body = null, token = localStorage.getItem("authToken") } = {},
) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    console.log(`🌐 API Request: ${method} ${BASE_URL}${path}`)

    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    })

    console.log(`📡 Response Status: ${response.status}`)

    if (response.status === 401) {
      console.warn("🔒 Token expirado, redirecionando para login")
      clearAuth()
      window.location.href = "/views/login.html"
      throw new Error("Sessão expirada")
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ API Error:", errorText)
      throw new Error(errorText || `HTTP ${response.status}: ${response.statusText}`)
    }

    if (response.status === 204) {
      return null
    }

    const data = await response.json()
    console.log("✅ API Response:", data)
    return data
  } catch (error) {
    console.error("❌ API Request failed:", error)
    throw error
  }
}
