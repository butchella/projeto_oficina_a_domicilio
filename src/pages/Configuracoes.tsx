import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { User, Bell, Moon, Shield, Check } from 'lucide-react';

const Configuracoes: React.FC = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const handleSave = () => {
    setSavedSuccessfully(true);
    setTimeout(() => {
      setSavedSuccessfully(false);
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie suas preferências e perfil</p>
      </div>

      {savedSuccessfully && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md flex items-center">
          <Check size={18} className="text-green-500 mr-2" />
          <span className="text-green-700">Configurações salvas com sucesso!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Perfil do Usuário</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
                    defaultValue={user?.name || ''}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
                    defaultValue={user?.email || ''}
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="cargo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cargo
                  </label>
                  <input
                    id="cargo"
                    type="text"
                    className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
                    defaultValue={user?.role || ''}
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
                    defaultValue="(11) 98765-4321"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Preferências do Sistema
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon size={20} className="text-gray-500 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Modo escuro</h3>
                      <p className="text-sm text-gray-500">
                        Ativar tema escuro para reduzir o cansaço visual
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1D3557]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell size={20} className="text-gray-500 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Notificações</h3>
                      <p className="text-sm text-gray-500">
                        Receber alertas por email e no navegador
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1D3557]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield size={20} className="text-gray-500 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Autenticação em duas etapas</h3>
                      <p className="text-sm text-gray-500">
                        Aumentar a segurança da sua conta
                      </p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-[#1D3557] hover:text-[#1D3557]/80">
                    Configurar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-[#1D3557] text-white flex items-center justify-center text-2xl font-bold">
                <User size={48} />
              </div>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
              <p className="text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={handleSave}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1D3557] hover:bg-[#1D3557]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D3557]"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Configuracoes;