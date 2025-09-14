// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { api } from '../services/api'
// import { saveLogin } from '../services/auth'

// export default function LoginPage(){
//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const [error,setError] = useState('')
//   const nav = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()
//     setError('')
//     try {
//       const res = await api.login({ email, password })
//       saveLogin(res.token, res.user)
//       nav('/app')
//     } catch (err) {
//       setError(err.data?.error || err.message)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md bg-white p-6 rounded-md shadow">
//         <h1 className="text-2xl font-semibold mb-4">SaaS Notes — Login</h1>
//         {error && <div className="mb-3 text-red-600">{error}</div>}
//         <form onSubmit={submit}>
//           <label className="block mb-2">Email</label>
//           <input className="w-full p-2 border rounded mb-3" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@acme.test" />
//           <label className="block mb-2">Password</label>
//           <input type="password" className="w-full p-2 border rounded mb-3" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
//           <button className="w-full bg-sky-600 text-white p-2 rounded">Login</button>
//         </form>
//         <p className="mt-3 text-sm text-gray-500">Use seeded accounts (password: <b>password</b>)</p>
//       </div>
//     </div>
//   )
// }


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
