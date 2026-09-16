import React, { useState } from 'react';
import {
  Layers,
  Ship,
  FlaskConical,
  Fuel,
  Activity,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  CloudRain,
  AlertCircle,
  AlertTriangle,
  ChevronRight,
  Info
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import {
  MOCK_DAILY_TREND,
  MOCK_NI_TREND,
  MOCK_PIT_PRODUCTION,
  MOCK_MATERIAL_COMPOSITION,
  MOCK_FUEL_RANKING
} from '../data/mockMiningData';

export const DashboardView: React.FC = () => {
  const {
    totalProduksi,
    targetRkab,
    pencapaianRkab,
    totalBarging,
    targetBarging,
    pencapaianBarging,
    avgNi,
    avgFe,
    avgCo,
    avgCr,
    avgMgo,
    totalFuelKeluar,
    totalFuelMasuk,
    stokFuel,
    fuelRatio,
    unitAktifCount,
    totalUnitCount,
    physicalAvailability,
    utilization,
    produktivitasFleet,
    totalJamHujanLabel,
    hujan,
    fuel,
    sewaUnit,
    alerts,
    setCurrentTab
  } = useMining();

  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredDonut, setHoveredDonut] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. TOP 5 KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Produksi Ore */}
        <div
          onClick={() => setCurrentTab('produksi_ore')}
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Produksi Ore</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">875.000</span>
                <span className="text-xs font-medium text-slate-500">ton</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1">
              <span>Target RKAB 1.000.000 ton</span>
              <span className="font-bold text-emerald-600">87,5%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '87.5%' }}></div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+5,2%</span>
            <span className="text-slate-400 font-normal text-[11px]">vs. bulan lalu</span>
          </div>
        </div>

        {/* Card 2: Barging / Shipping */}
        <div
          onClick={() => setCurrentTab('barging')}
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Barging / Shipping</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">520.000</span>
                <span className="text-xs font-medium text-slate-500">ton</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Ship className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1">
              <span>Plan 600.000 ton</span>
              <span className="font-bold text-blue-600">86,7%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '86.7%' }}></div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8,3%</span>
            <span className="text-slate-400 font-normal text-[11px]">vs. bulan lalu</span>
          </div>
        </div>

        {/* Card 3: Kualitas Ore (Rata-rata) */}
        <div
          onClick={() => setCurrentTab('analisa_lab')}
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-md hover:border-amber-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Kualitas Ore <span className="text-[10px] text-slate-400">(Rata-rata)</span></p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs text-slate-500 font-bold">Ni</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">1,55%</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-[11px] font-semibold w-fit">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Sesuai spesifikasi</span>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-4 gap-1 text-[10px]">
            <div>
              <span className="text-slate-400 block">Fe</span>
              <span className="font-bold text-slate-700">18,2%</span>
            </div>
            <div>
              <span className="text-slate-400 block">Co</span>
              <span className="font-bold text-slate-700">0,08%</span>
            </div>
            <div>
              <span className="text-slate-400 block">Cr</span>
              <span className="font-bold text-slate-700">0,76%</span>
            </div>
            <div>
              <span className="text-slate-400 block">MgO</span>
              <span className="font-bold text-slate-700">2,45%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Fuel */}
        <div
          onClick={() => setCurrentTab('fuel')}
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-md hover:border-purple-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Fuel</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">47.500</span>
                <span className="text-xs font-medium text-slate-500">liter</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Fuel className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Konsumsi</span>
              <span className="text-xs font-black text-slate-800">1,85 L/ton</span>
            </div>
            <span className="text-[10px] text-purple-600 font-semibold uppercase tracking-wider block">Fuel Ratio</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>-6,2%</span>
            <span className="text-slate-400 font-normal text-[11px]">vs. bulan lalu</span>
          </div>
        </div>

        {/* Card 5: Operasi Alat */}
        <div
          onClick={() => setCurrentTab('produktivitas')}
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-md hover:border-red-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Operasi Alat</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Total Unit Aktif <span className="font-extrabold text-slate-900 text-sm">18</span> / 20
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px]">PA</span>
              <span className="font-bold text-slate-800">92,5%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">UA</span>
              <span className="font-bold text-slate-800">78,3%</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-slate-100 flex justify-between">
              <span className="text-slate-500 text-[10px]">Produktivitas</span>
              <span className="font-bold text-slate-800 text-[11px]">820 ton/jam</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-3,1%</span>
            <span className="text-slate-400 font-normal text-[11px]">vs. bulan lalu</span>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE ROW: TREND PRODUKSI ORE, KOMPOSISI MATERIAL, KADAR NIKEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Trend Produksi Ore (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Trend Produksi Ore</h2>
              <p className="text-xs text-slate-400">Realisasi Harian vs Target RKAB</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-blue-500 inline-block"></span>
                <span className="text-slate-600 font-medium">Produksi (ton)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-amber-500 inline-block rounded-full"></span>
                <span className="text-slate-600 font-medium">Target (ton)</span>
              </div>
            </div>
          </div>

          {/* SVG Bar + Line Chart */}
          <div className="h-60 w-full relative pt-4">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Grid lines */}
              {[0, 50, 100, 150].map((y, i) => (
                <g key={y}>
                  <line x1="40" y1={y} x2="490" y2={y} stroke="#F1F5F9" strokeDasharray="3 3" />
                  <text x="35" y={y + 4} textAnchor="end" fontSize="9" fill="#94A3B8">
                    {125000 - i * 25000}
                  </text>
                </g>
              ))}

              {/* Bars */}
              {MOCK_DAILY_TREND.map((d, i) => {
                const x = 50 + i * 27;
                const barH = (d.produksi / 125000) * 150;
                const y = 150 - barH;
                const isHovered = hoveredBar === i;

                return (
                  <g
                    key={d.tgl}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={x}
                      y={y}
                      width="16"
                      height={barH}
                      rx="2"
                      fill={isHovered ? '#1D4ED8' : '#3B82F6'}
                      className="transition-colors"
                    />
                    {/* X axis labels */}
                    {i % 3 === 0 && (
                      <text x={x + 8} y="172" textAnchor="middle" fontSize="9" fill="#64748B">
                        {d.tgl}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Target Line */}
              <polyline
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                points={MOCK_DAILY_TREND.map((d, i) => {
                  const x = 50 + i * 27 + 8;
                  const y = 150 - (d.target / 125000) * 150;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Points on target line */}
              {MOCK_DAILY_TREND.map((d, i) => {
                const x = 50 + i * 27 + 8;
                const y = 150 - (d.target / 125000) * 150;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2.5"
                    fill="#FFFFFF"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>

            {hoveredBar !== null && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] rounded-lg px-2.5 py-1.5 shadow-lg pointer-events-none flex gap-3 z-20">
                <span className="font-bold">{MOCK_DAILY_TREND[hoveredBar].tgl}:</span>
                <span className="text-blue-300">Produksi {MOCK_DAILY_TREND[hoveredBar].produksi.toLocaleString()} t</span>
                <span className="text-amber-300">Target {MOCK_DAILY_TREND[hoveredBar].target.toLocaleString()} t</span>
              </div>
            )}
          </div>
        </div>

        {/* Komposisi Material (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Komposisi Material</h2>
            <p className="text-xs text-slate-400">Total Produksi Bulan Berjalan</p>
          </div>

          <div className="flex flex-col items-center my-3 relative">
            <svg viewBox="0 0 160 160" className="w-36 h-36">
              {/* Donut arcs for:
                  Ore: 68.4% (green)
                  Low Grade: 15.7% (yellow)
                  Waste: 10.8% (slate)
                  Top Soil: 3.1% (sky)
                  Lainnya: 1.9% (purple)
              */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="24"
                strokeDasharray="257.8 377"
                strokeDashoffset="0"
                className="transition-all hover:opacity-90"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth="24"
                strokeDasharray="59.2 377"
                strokeDashoffset="-257.8"
                className="transition-all hover:opacity-90"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#64748B"
                strokeWidth="24"
                strokeDasharray="40.7 377"
                strokeDashoffset="-317.0"
                className="transition-all hover:opacity-90"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#0284C7"
                strokeWidth="24"
                strokeDasharray="11.7 377"
                strokeDashoffset="-357.7"
                className="transition-all hover:opacity-90"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#8B5CF6"
                strokeWidth="24"
                strokeDasharray="7.2 377"
                strokeDashoffset="-369.4"
                className="transition-all hover:opacity-90"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-black text-slate-900 leading-none">875.000</span>
              <span className="text-[10px] text-slate-400 font-semibold mt-0.5">ton</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            {MOCK_MATERIAL_COMPOSITION.map(m => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }}></span>
                  <span className="text-slate-600 font-medium">{m.name}</span>
                </div>
                <span className="font-bold text-slate-800">{m.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kadar Nikel (Ni) (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Kadar Nikel (Ni)</h2>
              <p className="text-xs text-slate-400">Variasi Kualitas Ore (%)</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-[10px] text-slate-600 my-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-blue-500"></span> Rata-rata
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-amber-500"></span> Min
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-emerald-500"></span> Max
            </span>
          </div>

          <div className="h-44 w-full relative">
            <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible">
              {/* Y axis lines */}
              {[0, 35, 70, 105].map((y, idx) => (
                <g key={y}>
                  <line x1="28" y1={y + 10} x2="235" y2={y + 10} stroke="#F1F5F9" strokeDasharray="2 2" />
                  <text x="24" y={y + 13} textAnchor="end" fontSize="7" fill="#94A3B8">
                    {(2.5 - idx * 0.5).toFixed(2)}%
                  </text>
                </g>
              ))}

              {/* Max Line (Green) */}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                points="35,38 65,39 95,35 125,32 155,34 185,28 215,31"
              />
              {/* Points for Max */}
              {[[35,38], [65,39], [95,35], [125,32], [155,34], [185,28], [215,31]].map(([x,y], idx) => (
                <circle key={idx} cx={x} cy={y} r="2" fill="#10B981" />
              ))}

              {/* Rata-rata Line (Blue) */}
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                points="35,62 65,63 95,59 125,57 155,58 185,55 215,56"
              />
              {/* Points for Avg */}
              {[[35,62], [65,63], [95,59], [125,57], [155,58], [185,55], [215,56]].map(([x,y], idx) => (
                <circle key={idx} cx={x} cy={y} r="2" fill="#3B82F6" />
              ))}

              {/* Min Line (Orange) */}
              <polyline
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
                points="35,88 65,86 95,84 125,82 155,83 185,80 215,81"
              />
              {/* Points for Min */}
              {[[35,88], [65,86], [95,84], [125,82], [155,83], [185,80], [215,81]].map(([x,y], idx) => (
                <circle key={idx} cx={x} cy={y} r="2" fill="#F59E0B" />
              ))}

              {/* X Axis labels */}
              {['1 Apr', '5 Apr', '10 Apr', '15 Apr', '20 Apr', '25 Apr', '30 Apr'].map((label, idx) => (
                <text key={idx} x={35 + idx * 30} y="132" textAnchor="middle" fontSize="7" fill="#64748B">
                  {label}
                </text>
              ))}
            </svg>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px]">
            <span className="text-slate-500">Rata-rata Ni Bulan Ini:</span>
            <span className="font-black text-blue-600">1,55%</span>
          </div>
        </div>
      </div>

      {/* 3. ROW 3: PRODUKSI PER PIT, BARGING / SHIPPING PER TUJUAN, STATUS UNIT, KONSUMSI FUEL PER UNIT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Produksi per PIT */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Produksi per PIT</h2>
              <p className="text-[11px] text-slate-400">Total tonase galian ore</p>
            </div>
            <button
              onClick={() => setCurrentTab('produksi_ore')}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Lihat PIT
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_PIT_PRODUCTION.map(p => (
              <div key={p.pit}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">{p.pit}</span>
                  <span className="font-extrabold text-slate-900">{p.tonase.toLocaleString()} ton</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(p.tonase / 250000) * 100}%`,
                      backgroundColor: p.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Total 5 PIT</span>
            <span className="font-black text-slate-900">875.000 ton</span>
          </div>
        </div>

        {/* Barging / Shipping per Tujuan */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Barging / Shipping per Tujuan</h2>
              <p className="text-[11px] text-slate-400">Pencapaian Tonase Pengapalan</p>
            </div>
            <button
              onClick={() => setCurrentTab('barging')}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Detail
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] text-slate-400 border-b border-slate-100">
                  <th className="pb-1.5 font-semibold">Tujuan</th>
                  <th className="pb-1.5 font-semibold text-right">Plan (t)</th>
                  <th className="pb-1.5 font-semibold text-right">Actual (t)</th>
                  <th className="pb-1.5 font-semibold text-right">Achv</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {[
                  { tujuan: 'China', plan: 250000, act: 230000, ach: 92.0, color: 'bg-emerald-500' },
                  { tujuan: 'Jepang', plan: 150000, act: 135000, ach: 90.0, color: 'bg-emerald-500' },
                  { tujuan: 'Korea', plan: 100000, act: 95000, ach: 95.0, color: 'bg-emerald-500' },
                  { tujuan: 'Lainnya', plan: 100000, act: 60000, ach: 60.0, color: 'bg-amber-500' },
                ].map(r => (
                  <tr key={r.tujuan} className="hover:bg-slate-50/60 transition">
                    <td className="py-2 font-medium text-slate-800">{r.tujuan}</td>
                    <td className="py-2 text-right text-slate-500 font-mono text-[11px]">{r.plan.toLocaleString()}</td>
                    <td className="py-2 text-right font-bold text-slate-900 font-mono text-[11px]">{r.act.toLocaleString()}</td>
                    <td className="py-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="font-bold text-[11px]">{r.ach}%</span>
                        <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${r.color}`} style={{ width: `${r.ach}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold border-t border-slate-200 text-slate-900">
                  <td className="pt-2">Total</td>
                  <td className="pt-2 text-right font-mono text-[11px]">600.000</td>
                  <td className="pt-2 text-right font-mono text-[11px] text-blue-600">520.000</td>
                  <td className="pt-2 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-blue-600 font-black">86,7%</span>
                      <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: '86.7%' }}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Status Unit (Donut) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Status Unit</h2>
              <p className="text-[11px] text-slate-400">Kesiapan Armada Tambang</p>
            </div>
            <button
              onClick={() => setCurrentTab('master_unit')}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Armada
            </button>
          </div>

          <div className="flex flex-col items-center my-2 relative">
            <svg viewBox="0 0 140 140" className="w-32 h-32">
              {/* Beroperasi 18 (90%), Maintenance 1 (5%), Breakdown 1 (5%)
                  Circumference of r=50 is 314
                  18/20 = 282.6
                  1/20 = 15.7
                  1/20 = 15.7
              */}
              <circle
                cx="70"
                cy="70"
                r="50"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="20"
                strokeDasharray="282.6 314"
                strokeDashoffset="0"
              />
              <circle
                cx="70"
                cy="70"
                r="50"
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth="20"
                strokeDasharray="15.7 314"
                strokeDashoffset="-282.6"
              />
              <circle
                cx="70"
                cy="70"
                r="50"
                fill="transparent"
                stroke="#EF4444"
                strokeWidth="20"
                strokeDasharray="15.7 314"
                strokeDashoffset="-298.3"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 leading-none">20</span>
              <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Unit</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 font-medium">Beroperasi</span>
              </div>
              <span className="font-extrabold text-slate-800">18 Unit</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-600 font-medium">Maintenance</span>
              </div>
              <span className="font-extrabold text-slate-800">1 Unit</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-slate-600 font-medium">Breakdown</span>
              </div>
              <span className="font-extrabold text-slate-800">1 Unit</span>
            </div>
          </div>
        </div>

        {/* Konsumsi Fuel per Unit (L/ton) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Konsumsi Fuel per Unit</h2>
              <p className="text-[11px] text-slate-400">Rasio tertinggi (L/ton)</p>
            </div>
            <button
              onClick={() => setCurrentTab('fuel')}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Audit Fuel
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {MOCK_FUEL_RANKING.map(f => (
              <div key={f.unitId} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                    {f.rank}
                  </span>
                  <span className="font-bold text-slate-800">{f.unitId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold ${f.ratio > 2.2 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {f.ratio.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400">L/ton</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Rata-rata Fleet</span>
            <span className="font-black text-emerald-600">1,85 L/ton</span>
          </div>
        </div>
      </div>

      {/* 4. ROW 4: HUJAN, FUEL STOK & TRANSAKSI, SEWA UNIT, PERINGATAN & NOTIFIKASI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Hujan Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-bold text-slate-900">Hujan</h2>
            </div>
            <button
              onClick={() => setCurrentTab('hujan')}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Log Hujan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] text-slate-400 border-b border-slate-100">
                  <th className="pb-1.5">Tanggal</th>
                  <th className="pb-1.5">Mulai</th>
                  <th className="pb-1.5">Selesai</th>
                  <th className="pb-1.5">Durasi</th>
                  <th className="pb-1.5">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70 text-[11px]">
                {hujan.slice(0, 4).map(h => (
                  <tr key={h.id} className="hover:bg-slate-50">
                    <td className="py-1.5 font-medium text-slate-800">{h.tanggal.slice(0, 6)}</td>
                    <td className="py-1.5 text-slate-500 font-mono">{h.mulai}</td>
                    <td className="py-1.5 text-slate-500 font-mono">{h.selesai}</td>
                    <td className="py-1.5 font-bold text-blue-600">{h.durasiLabel}</td>
                    <td className="py-1.5 text-slate-600 truncate max-w-[80px]">{h.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50/60 p-2 rounded-lg font-medium">
            <span className="text-blue-500">💧</span>
            <span>Total jam hujan bulan ini: <strong className="font-black text-blue-800">{totalJamHujanLabel}</strong></span>
          </div>
        </div>

        {/* Fuel - Stok & Transaksi Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-purple-500" />
              <h2 className="text-sm font-bold text-slate-900">Fuel - Stok & Transaksi</h2>
            </div>
            <button
              onClick={() => setCurrentTab('fuel')}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Kelola
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] text-slate-400 border-b border-slate-100">
                  <th className="pb-1.5">Tanggal</th>
                  <th className="pb-1.5">Jenis</th>
                  <th className="pb-1.5 text-right">Liter</th>
                  <th className="pb-1.5">Distributor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70 text-[11px]">
                {fuel.slice(0, 5).map(f => (
                  <tr key={f.id} className="hover:bg-slate-50">
                    <td className="py-1.5 font-medium text-slate-800">{f.tanggal}</td>
                    <td className="py-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        f.status === 'Masuk' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="py-1.5 text-right font-bold text-slate-900 font-mono">
                      {f.liter.toLocaleString()}
                    </td>
                    <td className="py-1.5 text-slate-500 truncate max-w-[90px]">{f.distributor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-emerald-50/60 p-1.5 rounded-md">
              <span className="text-[10px] text-emerald-600 font-medium block">Total Masuk</span>
              <span className="font-extrabold text-emerald-700 text-[12px]">{totalFuelMasuk.toLocaleString()} L</span>
            </div>
            <div className="bg-rose-50/60 p-1.5 rounded-md">
              <span className="text-[10px] text-rose-600 font-medium block">Total Keluar</span>
              <span className="font-extrabold text-rose-700 text-[12px]">{totalFuelKeluar.toLocaleString()} L</span>
            </div>
            <div className="bg-blue-50/60 p-1.5 rounded-md">
              <span className="text-[10px] text-blue-600 font-medium block">Stock Akhir</span>
              <span className="font-extrabold text-blue-700 text-[12px]">{stokFuel.toLocaleString()} L</span>
            </div>
          </div>
        </div>

        {/* Sewa Unit Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">🚛</span>
              <h2 className="text-sm font-bold text-slate-900">Sewa Unit</h2>
            </div>
            <button
              onClick={() => setCurrentTab('sewa_unit')}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Daftar Sewa
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] text-slate-400 border-b border-slate-100">
                  <th className="pb-1.5">ID Unit</th>
                  <th className="pb-1.5">Tgl Bayar</th>
                  <th className="pb-1.5">Vendor</th>
                  <th className="pb-1.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70 text-[11px]">
                {sewaUnit.slice(0, 4).map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-2 font-extrabold text-slate-900">{s.unitId}</td>
                    <td className="py-2 text-slate-500">{s.tanggalBayar}</td>
                    <td className="py-2 text-slate-600 truncate max-w-[80px]">{s.vendor}</td>
                    <td className="py-2 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.statusPembayaran === 'Lunas'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : s.statusPembayaran === 'Jatuh Tempo'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {s.statusPembayaran}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Pembayaran bulan ini:</span>
            <span className="font-extrabold text-slate-900">Rp 255.000.000</span>
          </div>
        </div>

        {/* Peringatan & Notifikasi (Live Auto-Control) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900">Peringatan & Notifikasi</h2>
            </div>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          </div>

          <div className="space-y-2 text-xs overflow-y-auto max-h-56 pr-1">
            {alerts.slice(0, 5).map(a => (
              <div
                key={a.id}
                className={`p-2 rounded-lg border text-[11px] flex gap-2 items-start ${
                  a.type === 'danger'
                    ? 'bg-red-50/60 border-red-200 text-red-900'
                    : a.type === 'warning'
                    ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                    : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                }`}
              >
                <span className="text-xs shrink-0 mt-0.5">
                  {a.type === 'danger' ? '🔴' : a.type === 'warning' ? '🟡' : '🟢'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold leading-tight truncate">{a.title}</p>
                    <span className="text-[10px] opacity-70 ml-1 shrink-0">{a.time}</span>
                  </div>
                  <p className="text-[10px] opacity-85 mt-0.5 line-clamp-1">{a.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Sistem Kontrol Otomatis</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Monitoring Aktif
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER METADATA BAR MATCHING MOCKUP */}
      <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Tambang Nikel</span>
          <span className="text-slate-300">|</span>
          <span>Produksi, Efisiensi, Keberlanjutan</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span>Data terakhir diperbarui:</span>
          <strong className="font-semibold text-slate-600">30 Apr 2025 16:45</strong>
        </div>
      </div>
    </div>
  );
};
