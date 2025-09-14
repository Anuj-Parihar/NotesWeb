const KEY = 'saas_notes_token'
const USER = 'saas_notes_user'

export function saveToken(token){ localStorage.setItem(KEY, token) }
export function getToken(){ return localStorage.getItem(KEY) }
export function removeToken(){ localStorage.removeItem(KEY); localStorage.removeItem(USER) }

export function saveUser(user){ localStorage.setItem(USER, JSON.stringify(user)) }
export function getUser(){ const raw = localStorage.getItem(USER); return raw ? JSON.parse(raw) : null }
export function saveLogin(token, user){
  saveToken(token); saveUser(user);
}
