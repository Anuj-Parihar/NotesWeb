import { getToken } from './auth'
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path, options = {}){
  const headers = options.headers || {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(options.body)
  }
  const res = await fetch(BASE + path, {...options, headers})
  const text = await res.text()
  let data
  try{ data = text ? JSON.parse(text) : null } catch(e){ data = text }
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || 'Request failed')
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const api = {
  login: (body) => request('/auth/login', { method: 'POST', body }),
  invite: (body) => request('/auth/invite', { method: 'POST', body }),
  listNotes: () => request('/notes', { method: 'GET' }),
  createNote: (body) => request('/notes', { method: 'POST', body }),
  updateNote: (id, body) => request(`/notes/${id}`, { method: 'PUT', body }),
  deleteNote: (id) => request(`/notes/${id}`, { method: 'DELETE' }),
  upgradeTenant: (slug) => request(`/tenants/${slug}/upgrade`, { method: 'POST' })
}
