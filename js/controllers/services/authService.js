import { saveAuth, clearAuth } from "../utils/session.js"
import { apiRequest } from "./api.js"

export async function login(cpf, password) {
  try {
    console.log("🔐 Tentando fazer login...")

    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: { cpf, password },
    })

    if (data && data.token) {
      saveAuth(data)
      console.log("✅ Login realizado com sucesso")
      return data
    } else {
      throw new Error("Resposta de login inválida")
    }
  } catch (error) {
    console.error("❌ Erro no login:", error)
    throw new Error(error.message || "Falha no login")
  }
}

export async function register(userData) {
  try {
    console.log("📝 Tentando registrar usuário...")

    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: userData,
    })

    if (data && data.token) {
      saveAuth(data)
      console.log("✅ Registro realizado com sucesso")
      return data
    } else {
      throw new Error("Resposta de registro inválida")
    }
  } catch (error) {
    console.error("❌ Erro no registro:", error)
    throw new Error(error.message || "Falha no registro")
  }
}

export function logout() {
  console.log("👋 Fazendo logout...")
  clearAuth()
}
