import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import { getToken } from './services/auth'

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={
        <Protected>
          <Dashboard />
        </Protected>
      } />
      <Route path="*" element={<Navigate to={getToken() ? '/app' : '/login'} replace />} />
    </Routes>
  )
}

function Protected({ children }){
  if (!getToken()) return <Navigate to="/login" replace />
  return children
}
