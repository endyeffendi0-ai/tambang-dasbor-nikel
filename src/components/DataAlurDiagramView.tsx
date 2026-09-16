import React from 'react';
import {
  Layers,
  FlaskConical,
  Boxes,
  Ship,
  Building,
  Gauge,
  Activity,
  Wrench,
  Fuel,
  CreditCard,
  CloudRain,
  ArrowDown,
  ArrowRight,
  Workflow
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const DataAlurDiagramView: React.FC = () => {
  const { setCurrentTab } = useMining();

  return (
    <div className="space-y-6 pb-12">
      {/* Intro Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Workflow className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Arsitektur Alur Data Operasional Tambang (Mine Data Flow)</h2>
        </div>
        <p className="text-xs text-slate-500">
          Representasi terpadu rantai pasok nikel dari Pit Front hingga Buyer Smelter, terintegrasi secara otomatis dengan modul pendukung operasi alat, konsumsi bahan bakar, dan biaya sewa.
        </p>
      </div>

      {/* Primary Ore Flow */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
          1. ALUR UTAMA MATERIAL (ORE SUPPLY CHAIN)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Step 1: PIT */}
          <div
            onClick={() => setCurrentTab('produksi_ore')}
            className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 cursor-pointer transition text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-2 shadow-xs group-hover:scale-105 transition">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-blue-900 uppercase">Tahap 1</div>
            <h4 className="font-bold text-sm text-slate-900">PIT Tambang</h4>
            <p className="text-[11px] text-slate-500 mt-1">Penambangan Bijih, Overburden, Front Loading</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-blue-300">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Step 2: Lab */}
          <div
            onClick={() => setCurrentTab('analisa_lab')}
            className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 cursor-pointer transition text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-2 shadow-xs group-hover:scale-105 transition">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-amber-900 uppercase">Tahap 2</div>
            <h4 className="font-bold text-sm text-slate-900">Analisa Lab QC</h4>
            <p className="text-[11px] text-slate-500 mt-1">Kadar Ni (%), Fe (%), Moisture, rasio S/M</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-amber-300">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Step 3: Stockpile */}
          <div
            onClick={() => setCurrentTab('stockpile')}
            className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 cursor-pointer transition text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-xs group-hover:scale-105 transition">
              <Boxes className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-emerald-900 uppercase">Tahap 3</div>
            <h4 className="font-bold text-sm text-slate-900">Stockpile & Dome</h4>
            <p className="text-[11px] text-slate-500 mt-1">Blending, Penumpukan EFO, Kontrol Saldo Tonase</p>
          </div>
        </div>

        {/* Next Tier Arrow */}
        <div className="flex justify-center my-4 text-slate-300">
          <ArrowDown className="w-6 h-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {/* Step 4: Barging */}
          <div
            onClick={() => setCurrentTab('barging')}
            className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/50 hover:bg-cyan-100/60 cursor-pointer transition text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center mx-auto mb-2 shadow-xs group-hover:scale-105 transition">
              <Ship className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-cyan-900 uppercase">Tahap 4</div>
            <h4 className="font-bold text-sm text-slate-900">Barging Jetty</h4>
            <p className="text-[11px] text-slate-500 mt-1">Pemuatan Tongkang, Draft Survey, Ritase</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-cyan-300">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Step 5: Smelter */}
          <div
            onClick={() => setCurrentTab('master_data')}
            className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/60 cursor-pointer transition text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mx-auto mb-2 shadow-xs group-hover:scale-105 transition">
              <Building className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-purple-900 uppercase">Tahap 5</div>
            <h4 className="font-bold text-sm text-slate-900">Smelter / Buyer</h4>
            <p className="text-[11px] text-slate-500 mt-1">Penerimaan Kargo, Verifikasi DO, Final Invoice</p>
          </div>
        </div>
      </div>

      {/* Concurrent Operational Streams */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stream 1: Equipment & Fleet */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Alur Operasi Alat Berat</h4>
              <span className="text-[10px] text-slate-400">HM → Kinerja → Perawatan</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div
              onClick={() => setCurrentTab('hm_alat')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">1. Catatan HM Alat</div>
              <div className="text-[11px] text-slate-500">Validasi meter awal & akhir per shift</div>
            </div>
            <div
              onClick={() => setCurrentTab('produktivitas')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">2. Produktivitas Fleet</div>
              <div className="text-[11px] text-slate-500">Cycle time, ritase, dan ton/jam</div>
            </div>
            <div
              onClick={() => setCurrentTab('maintenance')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">3. Perawatan & Repair</div>
              <div className="text-[11px] text-slate-500">Service 250 HM, sparepart & breakdown</div>
            </div>
          </div>
        </div>

        {/* Stream 2: Energy & Fuel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Fuel className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Alur Bahan Bakar & Energi</h4>
              <span className="text-[10px] text-slate-400">Log Pengisian → Rasio Efisiensi</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div
              onClick={() => setCurrentTab('fuel')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">1. Pengisian Dispenser Solar</div>
              <div className="text-[11px] text-slate-500">Liter masuk terhadap HM unit berjalan</div>
            </div>
            <div
              onClick={() => setCurrentTab('fuel')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">2. Laju Konsumsi L/HM</div>
              <div className="text-[11px] text-slate-500">Deteksi otomatis unit boros bahan bakar</div>
            </div>
            <div
              onClick={() => setCurrentTab('dashboard')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">3. Mine Fuel Ratio (L/Ton)</div>
              <div className="text-[11px] text-slate-500">Indeks biaya energi per ton bijih keluar</div>
            </div>
          </div>
        </div>

        {/* Stream 3: Climate & Financial Impact */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <CloudRain className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Cuaca & Finansial Sewa</h4>
              <span className="text-[10px] text-slate-400">Lost Time → Billing Rental</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div
              onClick={() => setCurrentTab('hujan')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-purple-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">1. Jam Hujan & Slippery</div>
              <div className="text-[11px] text-slate-500">Downtime hauling road & pengurangan jam efektif</div>
            </div>
            <div
              onClick={() => setCurrentTab('sewa_unit')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-purple-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">2. Validasi Billing Sewa</div>
              <div className="text-[11px] text-slate-500">Tarif per jam x total HM kerja aktual</div>
            </div>
            <div
              onClick={() => setCurrentTab('rkab')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-purple-50 cursor-pointer transition border border-slate-100"
            >
              <div className="font-bold text-slate-800">3. Evaluasi Kinerja RKAB</div>
              <div className="text-[11px] text-slate-500">Deviasi terhadap target kuota resmi Minerba</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
