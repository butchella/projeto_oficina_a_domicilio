import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Car, 
  Bell, 
  History, 
  Settings, 
  LogOut,
  BarChart3
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Veículos', to: '/veiculos', icon: Car },
    { name: 'Alertas', to: '/alertas', icon: Bell },
    { name: 'Histórico', to: '/historico', icon: History },
    { name: 'Configurações', to: '/configuracoes', icon: Settings },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#1D3557] text-white w-64 py-8 px-4">
      <div className="flex items-center gap-3 px-2 mb-8">
        <BarChart3 size={32} className="text-white" />
        <div>
          <h1 className="text-xl font-bold">VehiPredict AI</h1>
          <p className="text-xs text-gray-300">Manutenção Preditiva</p>
        </div>
      </div>

      <div className="flex-1">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="pt-4 border-t border-gray-700 mt-4">
        <div className="px-4 py-2">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 px-4 py-3 text-red-300 hover:bg-white/5 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;