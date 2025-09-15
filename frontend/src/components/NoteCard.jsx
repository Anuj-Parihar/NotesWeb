import React, { useState } from 'react'

export default function NoteCard({ note, onDelete, onSave }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const save = () => {
    onSave({ title, content })
    setEditing(false)
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.01]">
      {editing ? (
        <>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-sky-400 outline-none"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-sky-400 outline-none"
          />
          <div className="flex gap-3">
            <button
              onClick={save}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded shadow transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1.5 border rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="ml-auto px-3 py-1.5 text-red-600 hover:text-red-700 transition"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start">
            <h4 className="font-semibold text-lg">{note.title}</h4>
            <div className="ml-auto flex gap-3">
              <button
                onClick={() => setEditing(true)}
                className="text-sm text-sky-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-700 mt-2 whitespace-pre-wrap">{note.content}</p>
          <div className="text-xs text-gray-400 mt-3">
            {new Date(note.createdAt).toLocaleString()}
          </div>
        </>
      )}
    </div>
  )
}

