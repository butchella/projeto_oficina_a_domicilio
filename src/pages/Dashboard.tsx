import React from 'react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/ui/StatCard';
import AlertItem from '../components/ui/AlertItem';
import { 
  Car, 
  AlertTriangle, 
  Activity, 
  Gauge, 
  ArrowRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { dashboardStats, alerts } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const recentAlerts = alerts.slice(0, 3);

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
        <h1 className="text-2xl font-bold text-gray-900">
          Bem-vindo, {user?.name}
        </h1>
        <p className="text-gray-600">
          Aqui está o status atual da sua frota de veículos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Veículos Monitorados"
          value={dashboardStats.totalVehicles}
          icon={Car}
          color="blue"
        />
        <StatCard
          title="Alertas Ativos"
          value={dashboardStats.vehiclesWithAlert}
          icon={AlertTriangle}
          color="amber"
          description={`${Math.round((dashboardStats.vehiclesWithAlert / dashboardStats.totalVehicles) * 100)}% da frota`}
        />
        <StatCard
          title="Último Diagnóstico"
          value={formatDate(dashboardStats.lastDiagnostic)}
          icon={Activity}
          color="green"
        />
        <StatCard
          title="Eficiência da IA"
          value={`${dashboardStats.aiEfficiency}%`}
          icon={Gauge}
          color="blue"
          trend={{ value: 2.3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Temperatura Média do Motor
            </h2>
            <div className="text-sm text-gray-500">Últimos 7 dias</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardStats.temperatureChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[70, 90]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1D3557"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Últimos Alertas</h2>
              <a href="/alertas" className="text-[#1D3557] text-sm font-medium flex items-center">
                Ver todos
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>

            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;