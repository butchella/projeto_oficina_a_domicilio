import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AlertItem from '../components/ui/AlertItem';
import { 
  ChevronLeft, 
  Clipboard, 
  Calendar, 
  AlertTriangle, 
  BarChart3, 
  RefreshCw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { vehicles, vehicleSensorData, alerts, generateRandomAlert } from '../data/mockData';

const VeiculoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isGeneratingData, setIsGeneratingData] = useState(false);
  const [localAlerts, setLocalAlerts] = useState(alerts);

  const vehicle = vehicles.find((v) => v.id === id);
  const vehicleAlerts = localAlerts.filter((a) => a.vehicle.id === id);
  
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

  const sensorData = vehicleSensorData[id as keyof typeof vehicleSensorData];
  
  if (!sensorData) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <h2 className="text-xl font-medium text-gray-900">Dados do sensor não disponíveis</h2>
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
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const convertSensorData = (data: Array<{ timestamp: string; value: number }>) => {
    return data.map((item) => ({
      time: formatDate(item.timestamp),
      value: item.value,
    }));
  };

  const temperatureData = convertSensorData(sensorData.temperature);
  const vibrationData = convertSensorData(sensorData.vibration);
  const voltageData = convertSensorData(sensorData.voltage);

  const handleSimulateFault = () => {
    setIsGeneratingData(true);
    setTimeout(() => {
      const newAlert = generateRandomAlert();
      setLocalAlerts([newAlert, ...localAlerts]);
      setIsGeneratingData(false);
    }, 1500);
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
          <div className="flex items-center mt-2">
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium mr-2 ${
                vehicle.status === 'normal'
                  ? 'bg-green-100 text-green-800'
                  : vehicle.status === 'alerta'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              Última análise: {formatDate(vehicle.lastAnalysis)}
            </span>
          </div>
        </div>
        <button
          onClick={handleSimulateFault}
          disabled={isGeneratingData}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1D3557] hover:bg-[#1D3557]/90 transition-colors ${
            isGeneratingData ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isGeneratingData ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" />
              Gerando leitura...
            </>
          ) : (
            <>
              <BarChart3 size={16} className="mr-2" />
              Simular nova leitura
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Clipboard size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Modelo</h3>
              <p className="font-medium">{vehicle.model}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <Calendar size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Última análise</h3>
              <p className="font-medium">{formatDate(vehicle.lastAnalysis)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center">
            <div className="rounded-full bg-amber-100 p-3 mr-4">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Alertas ativos</h3>
              <p className="font-medium">{vehicleAlerts.filter(a => a.status === 'pendente').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Leituras de sensores</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[...temperatureData, ...vibrationData, ...voltageData]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="temp" domain={[0, 120]} />
              <YAxis yAxisId="vibration" orientation="right" domain={[0, 0.5]} />
              <YAxis yAxisId="voltage" orientation="right" domain={[11, 13]} hide />
              <Tooltip />
              <Legend />
              <Line yAxisId="temp" type="monotone" dataKey="value" stroke="#e53e3e" strokeWidth={2} name="Temperatura (°C)" data={temperatureData} />
              <Line yAxisId="vibration" type="monotone" dataKey="value" stroke="#1D3557" strokeWidth={2} name="Vibração (g)" data={vibrationData} />
              <Line yAxisId="voltage" type="monotone" dataKey="value" stroke="#38a169" strokeWidth={2} name="Tensão (V)" data={voltageData} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Histórico de alertas</h2>
        
        {vehicleAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum alerta registrado para este veículo.
          </div>
        ) : (
          <div className="space-y-4">
            {vehicleAlerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default VeiculoDetalhes;