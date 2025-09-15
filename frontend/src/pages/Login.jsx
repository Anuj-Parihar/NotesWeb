
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { saveLogin } from '../services/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.login({ email, password })
      saveLogin(res.token, res.user)
      nav('/app')
    } catch (err) {
      setError(err.data?.error || err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-sky-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-sky-600">
          SaaS Notes — Login
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-400 outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@acme.test"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-400 outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <button className="w-full bg-sky-600 hover:bg-sky-700 text-white p-2 rounded shadow transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Use seeded accounts (password: <b>password</b>)
        </p>
      </div>
    </div>
  )
}
