import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  FlaskConical,
  Ship,
  Gauge,
  Activity,
  CloudRain,
  Fuel,
  Truck,
  Wrench,
  Database,
  Target,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  HardHat,
  MapPin,
  Package,
  Users,
  Briefcase,
  User,
  LogOut,
  Mountain
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { NavigationTab } from '../types/mining';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, alerts } = useMining();
  const [masterOpen, setMasterOpen] = useState(false);
  const [laporanOpen, setLaporanOpen] = useState(false);

  const mainNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'produksi_ore', label: 'Produksi Ore', icon: Layers },
    { id: 'analisa_lab', label: 'Analisa Lab', icon: FlaskConical },
    { id: 'barging', label: 'Barging / Shipping', icon: Ship },
    { id: 'hm_alat', label: 'HM Alat', icon: Gauge },
    { id: 'produktivitas', label: 'Produktivitas Alat', icon: Activity },
    { id: 'hujan', label: 'Hujan', icon: CloudRain },
    { id: 'fuel', label: 'Fuel', icon: Fuel },
    { id: 'sewa_unit', label: 'Sewa Unit', icon: Truck },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'stockpile', label: 'Stockpile / Inventory', icon: Database },
    { id: 'rkab', label: 'RKAB', icon: Target },
  ];

  const masterSubItems: { id: NavigationTab; label: string; icon: React.ElementType }[] = [
    { id: 'master_unit', label: 'Master Unit', icon: Truck },
    { id: 'master_operator', label: 'Master Operator', icon: HardHat },
    { id: 'master_pit', label: 'Master PIT', icon: MapPin },
    { id: 'master_material', label: 'Master Material', icon: Package },
    { id: 'master_buyer', label: 'Master Buyer', icon: Users },
    { id: 'master_vendor', label: 'Master Vendor', icon: Briefcase },
  ];

  const isMasterActive = masterSubItems.some(item => item.id === currentTab);

  return (
    <aside
      id="main-sidebar"
      className="w-64 bg-[#0B1527] text-slate-300 flex flex-col h-screen shrink-0 select-none border-r border-slate-800/80 sticky top-0"
    >
      {/* Brand Header */}
      <div className="p-4 flex items-center gap-3 border-b border-slate-800/60">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/30">
          <Mountain className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-tight leading-tight">Mine Dashboard</h1>
          <p className="text-xs text-slate-400 font-medium">Nikel Operation</p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
        {mainNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.id === 'dashboard' && alerts.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>
          );
        })}

        {/* Master Data Collapsible */}
        <div>
          <button
            id="nav-btn-master-data-toggle"
            onClick={() => setMasterOpen(!masterOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isMasterActive
                ? 'text-white bg-slate-800/90 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-slate-400" />
              <span>Master Data</span>
            </div>
            {masterOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {masterOpen && (
            <div className="mt-1 ml-4 pl-3 border-l border-slate-700/60 space-y-1">
              {masterSubItems.map(sub => {
                const SubIcon = sub.icon;
                const isSubActive = currentTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    id={`nav-btn-${sub.id}`}
                    onClick={() => setCurrentTab(sub.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isSubActive
                        ? 'bg-blue-600/90 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <SubIcon className="w-3.5 h-3.5" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Laporan Link */}
        <button
          id="nav-btn-laporan"
          onClick={() => setCurrentTab('laporan')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentTab === 'laporan'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <FileText className={`w-4 h-4 ${currentTab === 'laporan' ? 'text-white' : 'text-slate-400'}`} />
            <span>Laporan</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Pengaturan */}
        <button
          id="nav-btn-pengaturan"
          onClick={() => setCurrentTab('pengaturan')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentTab === 'pengaturan'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
          }`}
        >
          <Settings className={`w-4 h-4 ${currentTab === 'pengaturan' ? 'text-white' : 'text-slate-400'}`} />
          <span>Pengaturan</span>
        </button>
      </div>

      {/* User Info & Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-[#09101e]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800/50 transition cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 ring-2 ring-slate-600">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin Tambang</p>
            <p className="text-[11px] text-slate-400 truncate">Administrator</p>
          </div>
        </div>
        <button
          id="btn-logout"
          onClick={() => alert('Sesi operasional aktif. Mode multi-role administrator.')}
          className="w-full mt-2 flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
};
