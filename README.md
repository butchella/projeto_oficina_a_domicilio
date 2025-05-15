# VehiPredict AI - Sistema de Manutenção Preditiva de Veículos

VehiPredict AI é uma aplicação web para monitoramento e manutenção preditiva de frotas de veículos, utilizando dados de sensores e inteligência artificial para detectar problemas potenciais antes que causem falhas.

## Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Recharts para visualização de dados
- Context API para gerenciamento de estado

## Funcionalidades

- **Autenticação Simulada**: Login/logout e rotas protegidas
- **Dashboard**: Visão geral da frota, estatísticas e alertas recentes
- **Monitoramento de Veículos**: Lista completa e detalhes individuais
- **Alertas**: Sistema de alertas com níveis de severidade e filtragem
- **Histórico de Manutenção**: Registro de todas as manutenções realizadas
- **Configurações**: Personalização do perfil e preferências do sistema
- **Simulação de Falhas**: Função para simular novos alertas durante apresentações

## Início Rápido

Para executar o projeto localmente:

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## Credenciais de Demonstração

- **E-mail**: rafael@velox.com
- **Senha**: admin123

## Estrutura do Projeto

- `src/components`: Componentes reutilizáveis da UI
- `src/context`: Context API para autenticação
- `src/data`: Dados simulados para demonstração
- `src/pages`: Páginas principais da aplicação
- `src/main.tsx`: Ponto de entrada da aplicação

## Simulação de Dados

O projeto utiliza dados simulados para demonstração. O botão "Simular nova leitura" na página de detalhes do veículo gera um alerta aleatório para fins de demonstração.