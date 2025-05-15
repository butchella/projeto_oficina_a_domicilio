import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Mail, Lock, AlertCircle, UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type UserRole = 'gestor' | 'mecanico';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('gestor');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const success = login(email, password, role);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <BarChart3 size={40} className="text-[#1D3557]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VehiPredict AI</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Manutenção Preditiva para Veículos Elétricos
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
              <AlertCircle size={18} className="text-red-500 mt-0.5 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle2 size={16} className="text-gray-400" />
                </div>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
                >
                  <option value="gestor">Gestor de Frota</option>
                  <option value="mecanico">Mecânico</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'gestor' ? 'rafael@velox.com' : 'carlos@velox.com'}
                  className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1D3557] hover:bg-[#1D3557]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D3557] transition-colors"
            >
              Entrar
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4">
            <p>Credenciais de demonstração:</p>
            <p>Gestor de Frota:</p>
            <p>E-mail: rafael@velox.com / Senha: admin123</p>
            <p className="mt-2">Mecânico:</p>
            <p>E-mail: carlos@velox.com / Senha: tech123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;