import React from 'react';
import { MiningProvider, useMining } from './context/MiningContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

// Views
import { DashboardView } from './components/DashboardView';
import { ProduksiOreView } from './components/ProduksiOreView';
import { AnalisaLabView } from './components/AnalisaLabView';
import { BargingView } from './components/BargingView';
import { HmAlatView } from './components/HmAlatView';
import { ProduktivitasAlatView } from './components/ProduktivitasAlatView';
import { HujanSlipperyView } from './components/HujanSlipperyView';
import { FuelView } from './components/FuelView';
import { SewaUnitView } from './components/SewaUnitView';
import { MaintenanceView } from './components/MaintenanceView';
import { StockpileView } from './components/StockpileView';
import { RkabPlanningView } from './components/RkabPlanningView';
import { MasterDataView } from './components/MasterDataView';
import { KontrolOtomatisView } from './components/KontrolOtomatisView';
import { DataAlurDiagramView } from './components/DataAlurDiagramView';
import { SpreadsheetSyncView } from './components/SpreadsheetSyncView';

const MainContent: React.FC = () => {
  const { currentTab } = useMining();

  const renderActiveView = () => {
    switch (currentTab) {
      case 'dashboard':
      case 'dash_produksi':
      case 'dash_operasi':
      case 'dash_kualitas':
      case 'dash_fuel':
        return <DashboardView />;
      case 'produksi_ore':
        return <ProduksiOreView />;
      case 'analisa_lab':
        return <AnalisaLabView />;
      case 'barging':
      case 'dash_barging':
        return <BargingView />;
      case 'hm_alat':
        return <HmAlatView />;
      case 'produktivitas':
        return <ProduktivitasAlatView />;
      case 'hujan':
        return <HujanSlipperyView />;
      case 'fuel':
        return <FuelView />;
      case 'sewa_unit':
        return <SewaUnitView />;
      case 'maintenance':
        return <MaintenanceView />;
      case 'stockpile':
        return <StockpileView />;
      case 'rkab':
        return <RkabPlanningView />;
      case 'master_data':
        return <MasterDataView />;
      case 'kontrol_otomatis':
        return <KontrolOtomatisView />;
      case 'data_alur':
        return <DataAlurDiagramView />;
      case 'spreadsheet_sync':
        return <SpreadsheetSyncView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-800 overflow-hidden">
      {/* 20-Module Mining Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <MiningProvider>
      <MainContent />
    </MiningProvider>
  );
}
