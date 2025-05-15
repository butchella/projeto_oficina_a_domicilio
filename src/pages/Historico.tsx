import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { Clock, User, PenTool as Tool } from 'lucide-react';
import { maintenanceHistory } from '../data/mockData';

const Historico: React.FC = () => {
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

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Histórico de Manutenção</h1>
        <p className="text-gray-600">
          Registro de todas as manutenções preventivas realizadas
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        {maintenanceHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum registro de manutenção encontrado.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {maintenanceHistory.map((maintenance) => (
              <div
                key={maintenance.id}
                className="border-l-4 border-[#1D3557] pl-6 pb-6 relative"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#1D3557]"></div>
                
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                  <div>
                    <Link
                      to={`/veiculo/${maintenance.vehicle.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-[#1D3557]"
                    >
                      {maintenance.vehicle.model} - {maintenance.vehicle.plate}
                    </Link>
                    <h3 className="text-lg font-medium text-gray-700 mt-1">
                      {maintenance.service}
                    </h3>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    {formatDate(maintenance.date)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                      <User size={16} className="mr-1" />
                      Técnico responsável
                    </h4>
                    <p className="text-gray-800">{maintenance.technician}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                      <Tool size={16} className="mr-1" />
                      Peças utilizadas
                    </h4>
                    <ul className="list-disc list-inside text-gray-800">
                      {maintenance.parts.map((part, index) => (
                        <li key={index}>{part}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {maintenance.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Observações
                    </h4>
                    <p className="text-gray-800">{maintenance.notes}</p>
                  </div>
                )}
                
                {maintenance.alertId && (
                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      Vinculado ao alerta #{maintenance.alertId}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Historico;