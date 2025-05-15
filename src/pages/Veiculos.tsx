import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import VehicleCard from '../components/ui/VehicleCard';
import { Search, Filter } from 'lucide-react';
import { vehicles } from '../data/mockData';

const Veiculos: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frota de Veículos</h1>
          <p className="text-gray-600">
            Monitoramento de {vehicles.length} veículos ativos
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por placa ou modelo..."
            className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#1D3557] focus:border-[#1D3557] py-2 px-3 border"
          />
        </div>
        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          <span>Filtros</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Veiculos;