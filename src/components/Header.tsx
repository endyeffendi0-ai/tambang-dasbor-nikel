import React, { useState, useEffect } from 'react';
import {
  Calendar,
  ChevronDown,
  CloudSun,
  Plus,
  Bell,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { getAppsScriptConfig } from '../services/appsScriptService';

interface HeaderProps {
  onOpenQuickAdd?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuickAdd }) => {
  const { dateRange, setDateRange, alerts, dismissAlert, currentTab, setCurrentTab } = useMining();
  const [showAlertDropdown, setShowAlertDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasCloudConfig, setHasCloudConfig] = useState(false);

  useEffect(() => {
    const cfg = getAppsScriptConfig();
    setHasCloudConfig(Boolean(cfg.webAppUrl));
  }, [currentTab]);

  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return {
          title: 'Dashboard Tambang Nikel',
          subtitle: 'Monitoring Produksi • Kualitas • Alat • Barging • Fuel • RKAB'
        };
      case 'spreadsheet_sync':
        return {
          title: 'Integrasi Database Google Spreadsheet',
          subtitle: 'Sinkronisasi Real-Time Dua Arah & Deployment Web App Google Apps Script'
        };
      case 'produksi_ore':
        return {
          title: 'Produksi Ore & Overburden',
          subtitle: 'Pencatatan Ritase, Tonase per PIT, Shift, dan Deviasi Target RKAB'
        };
      case 'analisa_lab':
        return {
          title: 'Hasil Analisa Lab & QC Grade',
          subtitle: 'Assay Nikel (Ni), Besi (Fe), Co, Cr, MgO, SiO2, dan Kepatuhan Spesifikasi'
        };
      case 'barging':
        return {
          title: 'Barging & Pengapalan (Shipping)',
          subtitle: 'Draft Survey, Tonase Aktual vs Rencana, Vessel TB/BG, dan Buyer Tracking'
        };
      case 'hm_alat':
        return {
          title: 'Hour Meter (HM) Alat Berat',
          subtitle: 'Pencatatan HM Operasi Harian & Validasi Anomali Otomatis'
        };
      case 'produktivitas':
        return {
          title: 'Produktivitas Alat & Cycle Time',
          subtitle: 'Kinerja Loading, Hauling, Delay Time, dan Produktivitas Ton/Jam'
        };
      case 'hujan':
        return {
          title: 'Monitoring Curah Hujan & Dampak Tambang',
          subtitle: 'Catatan Jam Hujan, Kondisi Jalan Licin/Ambles, dan Estimasi Tonase Hilang'
        };
      case 'fuel':
        return {
          title: 'Manajemen Bahan Bakar (Fuel)',
          subtitle: 'Monitoring Stok Solar B35, Rasio Konsumsi (L/ton), dan DO Transaksi'
        };
      case 'sewa_unit':
        return {
          title: 'Sewa Unit & Pembayaran Vendor',
          subtitle: 'Monitoring Kontrak Alat Sewa, Jatuh Tempo, dan Status Pelunasan'
        };
      case 'maintenance':
        return {
          title: 'Maintenance & Breakdown Unit',
          subtitle: 'Pencatatan Downtime, Ketersediaan Fisik (PA), dan Jam Servis'
        };
      case 'stockpile':
        return {
          title: 'Stockpile & Inventory Ore',
          subtitle: 'Stok Dome ETO / EFO, Grade Nikel, dan Kesiapan Barging'
        };
      case 'rkab':
        return {
          title: 'Master & Realisasi RKAB',
          subtitle: 'Rencana Kerja dan Anggaran Biaya Kementerian ESDM 2025/2026'
        };
      case 'laporan':
        return {
          title: 'Pusat Laporan & Ekspor Data',
          subtitle: 'Laporan Flash Harian, Rekonsiliasi QC, Fuel Ratio, dan Ekspor CSV/PDF'
        };
      case 'pengaturan':
        return {
          title: 'Pengaturan Sistem & Database',
          subtitle: 'Konfigurasi Toleransi Grade, Threshold Alert, Backup & Restore'
        };
      default:
        return {
          title: 'Master Data Tambang',
          subtitle: 'Basis Data Unit, Operator, PIT, Material, Buyer, dan Vendor'
        };
    }
  };

  const { title, subtitle } = getTabTitle();

  return (
    <header className="bg-white border-b border-slate-200/90 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center flex-wrap gap-2.5">
        {/* Date Filter */}
        <div className="relative">
          <button
            id="btn-date-filter"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{dateRange.label}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showDatePicker && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
              <p className="text-xs font-bold text-slate-800 mb-2">Pilih Rentang Waktu</p>
              <div className="space-y-1 text-xs">
                {[
                  { label: '01 Apr 2025 – 30 Apr 2025 (Bulan Berjalan)', start: '2025-04-01', end: '2025-04-30' },
                  { label: '7 Hari Terakhir', start: '2025-04-24', end: '2025-04-30' },
                  { label: 'Hari Ini (30 Apr 2025)', start: '2025-04-30', end: '2025-04-30' },
                  { label: 'Triwulan 1 2025 (Jan - Mar)', start: '2025-01-01', end: '2025-03-31' },
                ].map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setDateRange({ startDate: opt.start, endDate: opt.end, label: opt.label });
                      setShowDatePicker(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Weather Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
          <CloudSun className="w-4 h-4 text-amber-500" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-[11px]">Cuaca</span>
            <span className="font-semibold text-slate-800">Berawan</span>
            <span className="font-bold text-blue-600">26°C</span>
          </div>
        </div>

        {/* Alerts Notification Button */}
        <div className="relative">
          <button
            id="btn-alerts-toggle"
            onClick={() => setShowAlertDropdown(!showAlertDropdown)}
            className="relative p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition"
            title="Peringatan & Notifikasi Tambang"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[10px] font-bold">
                {alerts.length}
              </span>
            )}
          </button>

          {showAlertDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Peringatan Tambang ({alerts.length})</span>
                <span className="text-[10px] text-slate-500">Live Auto-Control</span>
              </div>
              {alerts.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-500">Tidak ada peringatan aktif.</div>
              ) : (
                <div className="space-y-2">
                  {alerts.map(a => (
                    <div
                      key={a.id}
                      className={`p-2.5 rounded-lg border text-xs flex gap-2.5 items-start ${
                        a.type === 'danger'
                          ? 'bg-red-50/70 border-red-200 text-red-900'
                          : a.type === 'warning'
                          ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                          : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[12px]">{a.title}</p>
                        <p className="text-[11px] opacity-90 mt-0.5 leading-snug">{a.message}</p>
                        <span className="text-[10px] opacity-70 mt-1 block">{a.time} • {a.category}</span>
                      </div>
                      <button
                        onClick={() => dismissAlert(a.id)}
                        className="text-slate-400 hover:text-slate-600 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Google Sheets Database Status Pill */}
        <button
          id="btn-header-sheets-sync"
          onClick={() => setCurrentTab('spreadsheet_sync')}
          className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-semibold transition ${
            hasCloudConfig
              ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
          }`}
          title="Sinkronisasi Google Spreadsheet Cloud"
        >
          <FileSpreadsheet className={`w-3.5 h-3.5 ${hasCloudConfig ? 'text-emerald-600' : 'text-slate-500'}`} />
          <span className="hidden sm:inline">Sheets DB</span>
          <span className={`w-2 h-2 rounded-full ${hasCloudConfig ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
        </button>

        {/* Quick Add Button */}
        <button
          id="btn-quick-add"
          onClick={() => {
            if (onOpenQuickAdd) {
              onOpenQuickAdd();
            } else {
              setCurrentTab('produksi_ore');
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm shadow-blue-600/30 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Data</span>
        </button>
      </div>
    </header>
  );
};
