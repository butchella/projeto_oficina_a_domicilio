import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { Filter, Search } from 'lucide-react';
import { alerts } from '../data/mockData';

type AlertLevel = 'todos' | 'baixo' | 'medio' | 'alto';
type AlertStatus = 'todos' | 'pendente' | 'resolvido';

const Alertas: React.FC = () => {
  const [levelFilter, setLevelFilter] = useState<AlertLevel>('todos');
  const [statusFilter, setStatusFilter] = useState<AlertStatus>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesLevel = levelFilter === 'todos' || alert.level === levelFilter;
    const matchesStatus = statusFilter === 'todos' || alert.status === statusFilter;
    const matchesSearch = 
      alert.vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLevel && matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'baixo':
        return 'bg-blue-100 text-blue-800';
      case 'medio':
        return 'bg-amber-100 text-amber-800';
      case 'alto':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'pendente'
      ? 'bg-gray-100 text-gray-800'
      : 'bg-green-100 text-green-800';
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Alertas</h1>
        <p className="text-gray-600">Gerencie e monitore alertas do sistema</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por placa, modelo ou descrição..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
            />
          </div>
          <div className="flex gap-4">
            <div>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as AlertLevel)}
                className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
              >
                <option value="todos">Todos os níveis</option>
                <option value="baixo">Baixo</option>
                <option value="medio">Médio</option>
                <option value="alto">Alto</option>
              </select>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as AlertStatus)}
                className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
              >
                <option value="todos">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="resolvido">Resolvido</option>
              </select>
            </div>
          </div>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum alerta encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mensagem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nível
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {alert.vehicle.plate}
                      </div>
                      <div className="text-sm text-gray-500">{alert.vehicle.model}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{alert.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(alert.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getLevelColor(
                          alert.level
                        )}`}
                      >
                        {alert.level.charAt(0).toUpperCase() + alert.level.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          alert.status
                        )}`}
                      >
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/veiculo/${alert.vehicle.id}`}
                        className="text-[#1D3557] hover:text-[#1D3557]/70"
                      >
                        Ver veículo
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Alertas;