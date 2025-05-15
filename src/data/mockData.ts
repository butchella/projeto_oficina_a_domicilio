// Mock data for the VehiPredict AI application

// Vehicles data with electric vehicle specific information
export const vehicles = [
  {
    id: 'v001',
    plate: 'ABC-1234',
    model: 'Tesla Model 3 2023',
    status: 'normal',
    lastAnalysis: '2025-05-01T14:30:00',
    imageUrl: 'https://images.pexels.com/photos/7985645/pexels-photo-7985645.jpeg',
    batteryHealth: 98,
    batteryLevel: 82,
    range: 350,
    mileage: 15420,
    lastCharge: '2025-05-01T08:30:00',
    chargeCycles: 142,
  },
  {
    id: 'v002',
    plate: 'DEF-5678',
    model: 'Nissan Leaf 2024',
    status: 'alerta',
    lastAnalysis: '2025-05-02T10:15:00',
    imageUrl: 'https://images.pexels.com/photos/9586328/pexels-photo-9586328.jpeg',
    batteryHealth: 92,
    batteryLevel: 45,
    range: 180,
    mileage: 28650,
    lastCharge: '2025-05-02T06:15:00',
    chargeCycles: 234,
  },
  {
    id: 'v003',
    plate: 'GHI-9012',
    model: 'Chevrolet Bolt 2024',
    status: 'crítico',
    lastAnalysis: '2025-05-02T16:45:00',
    imageUrl: 'https://images.pexels.com/photos/12861030/pexels-photo-12861030.jpeg',
    batteryHealth: 85,
    batteryLevel: 28,
    range: 120,
    mileage: 42180,
    lastCharge: '2025-05-02T04:45:00',
    chargeCycles: 356,
  },
  {
    id: 'v004',
    plate: 'JKL-3456',
    model: 'VW ID.4 2023',
    status: 'normal',
    lastAnalysis: '2025-05-01T09:20:00',
    imageUrl: 'https://images.pexels.com/photos/11196172/pexels-photo-11196172.jpeg',
    batteryHealth: 96,
    batteryLevel: 75,
    range: 280,
    mileage: 18920,
    lastCharge: '2025-05-01T07:20:00',
    chargeCycles: 168,
  },
  {
    id: 'v005',
    plate: 'MNO-7890',
    model: 'Hyundai IONIQ 5 2024',
    status: 'alerta',
    lastAnalysis: '2025-05-02T13:10:00',
    imageUrl: 'https://images.pexels.com/photos/12861458/pexels-photo-12861458.jpeg',
    batteryHealth: 94,
    batteryLevel: 52,
    range: 220,
    mileage: 23450,
    lastCharge: '2025-05-02T05:10:00',
    chargeCycles: 198,
  },
];

// Alerts data with EV-specific issues
export const alerts = [
  {
    id: 'a001',
    vehicle: {
      id: 'v002',
      plate: 'DEF-5678',
      model: 'Nissan Leaf 2024',
    },
    timestamp: '2025-05-02T10:15:00',
    message: 'Degradação acelerada da bateria detectada',
    level: 'medio',
    status: 'pendente',
    assignedTo: 'Carlos Silva',
    component: 'Sistema de Bateria',
    diagnostic: 'Possível falha no sistema de gerenciamento térmico',
  },
  {
    id: 'a002',
    vehicle: {
      id: 'v003',
      plate: 'GHI-9012',
      model: 'Chevrolet Bolt 2024',
    },
    timestamp: '2025-05-02T16:45:00',
    message: 'Falha crítica no inversor de potência',
    level: 'alto',
    status: 'pendente',
    assignedTo: 'Carlos Silva',
    component: 'Sistema de Propulsão',
    diagnostic: 'Necessária substituição do módulo inversor',
  },
  {
    id: 'a003',
    vehicle: {
      id: 'v005',
      plate: 'MNO-7890',
      model: 'Hyundai IONIQ 5 2024',
    },
    timestamp: '2025-05-02T13:10:00',
    message: 'Eficiência de regeneração reduzida',
    level: 'baixo',
    status: 'pendente',
    assignedTo: 'Carlos Silva',
    component: 'Sistema de Frenagem Regenerativa',
    diagnostic: 'Calibração do sistema regenerativo necessária',
  },
  {
    id: 'a004',
    vehicle: {
      id: 'v001',
      plate: 'ABC-1234',
      model: 'Tesla Model 3 2023',
    },
    timestamp: '2025-04-28T09:30:00',
    message: 'Desbalanceamento nas células da bateria',
    level: 'baixo',
    status: 'resolvido',
    assignedTo: 'Carlos Silva',
    component: 'Sistema de Bateria',
    diagnostic: 'Realizado balanceamento das células',
  },
  {
    id: 'a005',
    vehicle: {
      id: 'v004',
      plate: 'JKL-3456',
      model: 'VW ID.4 2023',
    },
    timestamp: '2025-04-29T14:20:00',
    message: 'Temperatura elevada no conector de carregamento',
    level: 'medio',
    status: 'resolvido',
    assignedTo: 'Carlos Silva',
    component: 'Sistema de Carregamento',
    diagnostic: 'Substituição do conector de carregamento',
  },
];

// Maintenance history data with EV-specific services
export const maintenanceHistory = [
  {
    id: 'm001',
    vehicle: {
      id: 'v001',
      plate: 'ABC-1234',
      model: 'Tesla Model 3 2023',
    },
    date: '2025-04-29T14:30:00',
    technician: 'Carlos Silva',
    service: 'Balanceamento de células da bateria',
    parts: ['Módulo de controle BMS atualizado'],
    notes: 'Realizado balanceamento preventivo das células para otimizar desempenho',
    alertId: 'a004',
    duration: 120, // minutos
    cost: 850.00,
  },
  {
    id: 'm002',
    vehicle: {
      id: 'v004',
      plate: 'JKL-3456',
      model: 'VW ID.4 2023',
    },
    date: '2025-04-30T10:15:00',
    technician: 'Carlos Silva',
    service: 'Substituição do conector de carregamento',
    parts: ['Conector de carregamento CCS', 'Cabo de sinal'],
    notes: 'Conector apresentava sinais de desgaste e aquecimento excessivo',
    alertId: 'a005',
    duration: 90,
    cost: 1200.00,
  },
  {
    id: 'm003',
    vehicle: {
      id: 'v003',
      plate: 'GHI-9012',
      model: 'Chevrolet Bolt 2024',
    },
    date: '2025-04-25T09:30:00',
    technician: 'Carlos Silva',
    service: 'Manutenção preventiva do sistema de arrefecimento',
    parts: [
      'Fluido de arrefecimento da bateria',
      'Filtro do sistema de refrigeração',
      'Sensor de temperatura',
    ],
    notes: 'Manutenção preventiva do sistema de gerenciamento térmico da bateria',
    alertId: null,
    duration: 180,
    cost: 1500.00,
  },
];

// Vehicle sensor data for individual vehicle pages
export const vehicleSensorData = {
  v001: {
    temperature: [
      { timestamp: '2025-05-01T09:00:00', value: 25 },
      { timestamp: '2025-05-01T10:00:00', value: 26 },
      { timestamp: '2025-05-01T11:00:00', value: 28 },
      { timestamp: '2025-05-01T12:00:00', value: 30 },
      { timestamp: '2025-05-01T13:00:00', value: 29 },
      { timestamp: '2025-05-01T14:00:00', value: 27 },
    ],
    voltage: [
      { timestamp: '2025-05-01T09:00:00', value: 380 },
      { timestamp: '2025-05-01T10:00:00', value: 378 },
      { timestamp: '2025-05-01T11:00:00', value: 375 },
      { timestamp: '2025-05-01T12:00:00', value: 374 },
      { timestamp: '2025-05-01T13:00:00', value: 372 },
      { timestamp: '2025-05-01T14:00:00', value: 371 },
    ],
    current: [
      { timestamp: '2025-05-01T09:00:00', value: 120 },
      { timestamp: '2025-05-01T10:00:00', value: 125 },
      { timestamp: '2025-05-01T11:00:00', value: 130 },
      { timestamp: '2025-05-01T12:00:00', value: 128 },
      { timestamp: '2025-05-01T13:00:00', value: 122 },
      { timestamp: '2025-05-01T14:00:00', value: 118 },
    ],
  },
  // Similar data structure for other vehicles...
};

// Dashboard analytics
export const dashboardStats = {
  totalVehicles: vehicles.length,
  vehiclesWithAlert: vehicles.filter(v => v.status !== 'normal').length,
  lastDiagnostic: '2025-05-02T16:45:00',
  aiEfficiency: 94.7,
  fleetStats: {
    averageBatteryHealth: 93,
    totalRange: 1150,
    chargingStations: 8,
    activeCharging: 2,
  },
  batteryHealthChart: [
    { date: '01/05', value: 94.2 },
    { date: '02/05', value: 94.0 },
    { date: '03/05', value: 93.8 },
    { date: '04/05', value: 93.5 },
    { date: '05/05', value: 93.2 },
    { date: '06/05', value: 93.0 },
    { date: '07/05', value: 92.8 },
  ],
};

// Function to generate a random alert
export const generateRandomAlert = () => {
  const vehicleIndex = Math.floor(Math.random() * vehicles.length);
  const vehicle = vehicles[vehicleIndex];
  
  const alertTypes = [
    { 
      message: 'Degradação acelerada da bateria detectada',
      level: 'medio',
      component: 'Sistema de Bateria',
      diagnostic: 'Possível falha no sistema de gerenciamento térmico'
    },
    { 
      message: 'Eficiência de regeneração reduzida',
      level: 'baixo',
      component: 'Sistema de Frenagem Regenerativa',
      diagnostic: 'Calibração do sistema regenerativo necessária'
    },
    { 
      message: 'Temperatura elevada no inversor',
      level: 'alto',
      component: 'Sistema de Propulsão',
      diagnostic: 'Verificar sistema de refrigeração do inversor'
    },
    { 
      message: 'Desbalanceamento nas células da bateria',
      level: 'medio',
      component: 'Sistema de Bateria',
      diagnostic: 'Necessário balanceamento das células'
    },
    { 
      message: 'Falha na comunicação do carregador',
      level: 'baixo',
      component: 'Sistema de Carregamento',
      diagnostic: 'Verificar conectores e protocolo de comunicação'
    },
  ];
  
  const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  
  const newAlert = {
    id: `a${alerts.length + 1}`.padStart(4, '0'),
    vehicle: {
      id: vehicle.id,
      plate: vehicle.plate,
      model: vehicle.model,
    },
    timestamp: new Date().toISOString(),
    message: alertType.message,
    level: alertType.level,
    status: 'pendente',
    assignedTo: 'Carlos Silva',
    component: alertType.component,
    diagnostic: alertType.diagnostic,
  };
  
  if (alertType.level === 'alto') {
    const vehicleToUpdate = vehicles.find(v => v.id === vehicle.id);
    if (vehicleToUpdate) {
      vehicleToUpdate.status = 'crítico';
    }
  } else if (alertType.level === 'medio') {
    const vehicleToUpdate = vehicles.find(v => v.id === vehicle.id);
    if (vehicleToUpdate && vehicleToUpdate.status === 'normal') {
      vehicleToUpdate.status = 'alerta';
    }
  }
  
  return newAlert;
};