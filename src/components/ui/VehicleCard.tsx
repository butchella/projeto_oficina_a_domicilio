import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export type Vehicle = {
  id: string;
  plate: string;
  model: string;
  status: 'normal' | 'alerta' | 'crítico';
  lastAnalysis: string;
  imageUrl?: string;
};

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'alerta':
        return 'bg-amber-100 text-amber-800';
      case 'crítico':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const statusIcon = vehicle.status === 'normal' ? (
    <CheckCircle size={16} className="text-green-500" />
  ) : (
    <AlertTriangle size={16} className="text-amber-500" />
  );

  return (
    <Link
      to={`/veiculo/${vehicle.id}`}
      className="block bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <div className="h-40 bg-gray-200 relative">
        {vehicle.imageUrl ? (
          <img 
            src={vehicle.imageUrl} 
            alt={vehicle.model} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1D3557]/10">
            <span className="text-gray-500">{vehicle.model}</span>
          </div>
        )}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
            vehicle.status
          )}`}
        >
          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg">{vehicle.plate}</h3>
        <p className="text-gray-600 text-sm">{vehicle.model}</p>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            {statusIcon}
            <span className="ml-1">
              Última análise: {formatDate(vehicle.lastAnalysis)}
            </span>
          </div>
          <span className="text-[#1D3557] text-xs font-medium">Ver detalhes →</span>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;