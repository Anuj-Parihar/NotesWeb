
import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import { getUser, removeToken } from '../services/auth'
import NoteCard from '../components/NoteCard'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const nav = useNavigate()
  const user = getUser()
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRes, setInviteRes] = useState(null)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const data = await api.listNotes()
      setNotes(data)
    } catch (err) {
      setError(err.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const create = async e => {
    e.preventDefault()
    setError('')
    try {
      await api.createNote({ title, content })
      setTitle('')
      setContent('')
      fetchNotes()
    } catch (err) {
      setError(err.data?.error || err.message)
    }
  }

  const del = async id => {
    if (!confirm('Delete note?')) return
    try {
      await api.deleteNote(id)
      fetchNotes()
    } catch (err) {
      setError(err.data?.error || err.message)
    }
  }

  const update = async (id, data) => {
    try {
      await api.updateNote(id, data)
      fetchNotes()
    } catch (err) {
      setError(err.data?.error || err.message)
    }
  }

  const logout = () => {
    removeToken()
    nav('/login')
  }

  const canUpgrade = () => notes.length >= 3

  const upgrade = async () => {
    setError('')
    try {
      await api.upgradeTenant(user.tenant)
      await fetchNotes()
      alert('Tenant upgraded to Pro')
    } catch (err) {
      setError(err.data?.error || err.message)
    }
  }

  const invite = async e => {
    e.preventDefault()
    setInviteRes(null)
    setError('')
    try {
      const res = await api.invite({ email: inviteEmail, role: 'Member' })
      setInviteRes(res.message || 'Invited')
      setInviteEmail('')
    } catch (err) {
      setError(err.data?.error || err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              Notes — Tenant:{' '}
              <span className="font-medium text-sky-600">{user?.tenant}</span>
            </h2>
            <div className="text-sm text-gray-600">
              Signed in as <strong>{user?.email}</strong> ({user?.role})
            </div>
          </div>
          <div>
            <button
              onClick={logout}
              className="px-4 py-2 border rounded bg-white hover:bg-gray-100 transition shadow-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-5 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-3 text-lg">Create Note</h3>
            <form onSubmit={create} className="mb-6">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Content"
                className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded shadow transition">
                Create
              </button>
            </form>

            <h3 className="font-semibold text-lg mb-3">
              Notes {loading ? '(loading...)' : `(${notes.length})`}
            </h3>
            <div className="space-y-4">
              {notes.map(n => (
                <NoteCard
                  key={n._id}
                  note={n}
                  onDelete={() => del(n._id)}
                  onSave={data => update(n._id, data)}
                />
              ))}
              {notes.length === 0 && (
                <div className="text-gray-500 italic">No notes yet</div>
              )}
            </div>
          </div>

          <aside className="bg-white p-5 rounded-lg shadow-lg">
            <h4 className="font-semibold mb-4 text-lg">Tenant Actions</h4>

            {canUpgrade() && (
              <div className="mb-5">
                <div className="p-4 border rounded bg-yellow-50 animate-pulse">
                  <div className="mb-3">
                    Your tenant has reached the Free plan limit.
                  </div>
                  {user?.role === 'Admin' ? (
                    <button
                      onClick={upgrade}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition"
                    >
                      Upgrade to Pro
                    </button>
                  ) : (
                    <div className="text-sm text-gray-600">
                      Ask an admin to upgrade.
                    </div>
                  )}
                </div>
              </div>
            )}

            {user?.role === 'Admin' && (
              <div>
                <h5 className="font-medium mb-3">Invite user</h5>
                <form onSubmit={invite}>
                  <input
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="email"
                    className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded shadow transition">
                    Invite
                  </button>
                </form>
                {inviteRes && (
                  <div className="mt-3 text-green-600">{inviteRes}</div>
                )}
              </div>
            )}

            <div className="mt-5 text-sm text-gray-500">
              Note: Free plan limits to 3 notes. After Upgrade, unlimited notes.
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}

