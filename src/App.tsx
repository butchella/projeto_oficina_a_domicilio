import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Veiculos from './pages/Veiculos';
import VeiculoDetalhes from './pages/VeiculoDetalhes';
import VeiculoUsuario from './pages/VeiculoUsuario';
import Alertas from './pages/Alertas';
import Historico from './pages/Historico';
import Configuracoes from './pages/Configuracoes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/veiculos" 
            element={
              <ProtectedRoute>
                <Veiculos />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/veiculo/:id" 
            element={
              <ProtectedRoute>
                <VeiculoDetalhes />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/meu-veiculo/:id" 
            element={
              <ProtectedRoute>
                <VeiculoUsuario />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/alertas" 
            element={
              <ProtectedRoute>
                <Alertas />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/historico" 
            element={
              <ProtectedRoute>
                <Historico />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/configuracoes" 
            element={
              <ProtectedRoute>
                <Configuracoes />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;