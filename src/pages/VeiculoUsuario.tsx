import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { 
  ChevronLeft,
  Battery,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  BatteryCharging,
  Zap
} from 'lucide-react';
import { vehicles, alerts } from '../data/mockData';

type Appointment = {
  id: string;
  date: string;
  type: 'manutenção' | 'inspeção' | 'recarga';
  status: 'agendado' | 'concluído' | 'cancelado';
  location: string;
};

const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    date: '2025-05-10T14:30:00',
    type: 'manutenção',
    status: 'agendado',
    location: 'Centro Técnico VehiPredict - Unidade Sul'
  },
  {
    id: 'apt2',
    date: '2025-05-15T10:00:00',
    type: 'recarga',
    status: 'agendado',
    location: 'Estação de Recarga - Shopping Vila Nova'
  }
];

const VeiculoUsuario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState<'manutenção' | 'inspeção' | 'recarga'>('manutenção');

  const vehicle = vehicles.find((v) => v.id === id);
  const vehicleAlerts = alerts.filter((a) => a.vehicle.id === id);
  
  if (!vehicle) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <h2 className="text-xl font-medium text-gray-900">Veículo não encontrado</h2>
          <button
            onClick={() => navigate('/veiculos')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1D3557] hover:bg-[#1D3557]/90"
          >
            <ChevronLeft size={16} className="mr-1" />
            Voltar para a lista
          </button>
        </div>
      </MainLayout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-green-500';
    if (level > 30) return 'text-amber-500';
    return 'text-red-500';
  };

  const handleSchedule = () => {
    // Here you would typically make an API call to schedule the appointment
    setShowScheduleModal(false);
    // Show success message or handle errors
  };

  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <button
            onClick={() => navigate('/veiculos')}
            className="inline-flex items-center text-[#1D3557] hover:underline mb-2"
          >
            <ChevronLeft size={16} className="mr-1" />
            Voltar para a lista
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {vehicle.model} - {vehicle.plate}
          </h1>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1D3557] hover:bg-[#1D3557]/90"
        >
          <Calendar size={16} className="mr-2" />
          Agendar Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Status da Bateria</h2>
            <Battery size={24} className={getBatteryColor(vehicle.batteryLevel)} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Nível atual</span>
                <span className={getBatteryColor(vehicle.batteryLevel)}>
                  {vehicle.batteryLevel}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    vehicle.batteryLevel > 70
                      ? 'bg-green-500'
                      : vehicle.batteryLevel > 30
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${vehicle.batteryLevel}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Autonomia estimada</span>
              <span className="font-medium">{vehicle.range} km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Saúde da bateria</span>
              <span className="font-medium">{vehicle.batteryHealth}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Próximos Agendamentos</h2>
            <Calendar size={24} className="text-[#1D3557]" />
          </div>
          <div className="space-y-4">
            {mockAppointments.map(apt => (
              <div key={apt.id} className="border-l-4 border-[#1D3557] pl-4">
                <p className="font-medium">{apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}</p>
                <p className="text-sm text-gray-600">{formatDate(apt.date)}</p>
                <p className="text-sm text-gray-500">{apt.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Pontos de Recarga Próximos</h2>
            <MapPin size={24} className="text-[#1D3557]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <BatteryCharging size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Shopping Vila Nova</p>
                <p className="text-sm text-gray-600">2.5 km - Disponível</p>
                <p className="text-xs text-gray-500">Carregador DC 150kW</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <BatteryCharging size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Posto Energia Verde</p>
                <p className="text-sm text-gray-600">4.8 km - 1 em uso, 2 livres</p>
                <p className="text-xs text-gray-500">Carregador DC 350kW</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Agendamento */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Agendar Serviço</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Serviço
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as typeof selectedType)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1D3557] focus:ring-[#1D3557]"
                >
                  <option value="manutenção">Manutenção Preventiva</option>
                  <option value="inspeção">Inspeção Técnica</option>
                  <option value="recarga">Recarga Programada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1D3557] focus:ring-[#1D3557]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horário
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1D3557] focus:ring-[#1D3557]"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleSchedule}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1D3557] hover:bg-[#1D3557]/90 rounded-md"
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default VeiculoUsuario;