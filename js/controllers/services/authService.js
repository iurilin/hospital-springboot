import { saveAuth, clearAuth } from '../controllers/utils/session.js';

const BASE_URL = 'http://localhost:8080/api';

export async function login(cpf, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cpf, password })
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Falha no login');
  }

  const data = await res.json();
  saveAuth(data);
  return data;
}

export function logout() {
  clearAuth();
}
