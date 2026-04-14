import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './styles/index.css'
import App from './pages/App.tsx'
import Auth from './pages/Auth.tsx'
import { authService } from './services/auth.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Якщо залогінений — на /auth не пускаємо, кидаємо на головну */}
        <Route
          path='/auth'
          element={
            authService.isAuthenticated() ? <Navigate to="/" replace /> : <Auth />
          }
        />

        <Route
          path="/"
          element={
            authService.isAuthenticated() ? <App /> : <Navigate to="/auth" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode >,
)