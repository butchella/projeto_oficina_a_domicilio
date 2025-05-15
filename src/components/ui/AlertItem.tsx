import React from 'react';

type AlertLevel = 'baixo' | 'medio' | 'alto';

export type Alert = {
  id: string;
  vehicle: {
    id: string;
    plate: string;
    model: string;
  };
  timestamp: string;
  message: string;
  level: AlertLevel;
  status: 'pendente' | 'resolvido';
};

type AlertItemProps = {
  alert: Alert;
};

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  const getLevelColor = (level: AlertLevel) => {
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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-[#1D3557]">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{alert.vehicle.model} - {alert.vehicle.plate}</h4>
          <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${getLevelColor(
              alert.level
            )}`}
          >
            {alert.level.charAt(0).toUpperCase() + alert.level.slice(1)}
          </span>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
              alert.status
            )}`}
          >
            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">{formatDate(alert.timestamp)}</div>
    </div>
  );
};

export default AlertItem;