import React, { useState } from 'react';
import {
  Boxes,
  Plus,
  Trash2,
  Download,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Warehouse,
  CheckCircle2
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const StockpileView: React.FC = () => {
  const { stockpile, addStockpile, deleteStockpile } = useMining();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [lokasiStockpile, setLokasiStockpile] = useState('Dome 3 (High Grade ETO)');
  const [material, setMaterial] = useState('Ore High Grade');
  const [tonaseAwal, setTonaseAwal] = useState<number>(45000);
  const [masukTonase, setMasukTonase] = useState<number>(18000);
  const [keluarTonase, setKeluarTonase] = useState<number>(0);
  const [avgNi, setAvgNi] = useState<number>(1.88);
  const [avgFe, setAvgFe] = useState<number>(17.5);

  const totalInventoryTon = stockpile.reduce((a, b) => a + b.saldoAkhir, 0);
  const totalMasuk = stockpile.reduce((a, b) => a + b.masukTonase, 0);
  const totalKeluar = stockpile.reduce((a, b) => a + b.keluarTonase, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStockpile({
      lokasiStockpile,
      material,
      tonaseAwal: Number(tonaseAwal),
      masukTonase: Number(masukTonase),
      keluarTonase: Number(keluarTonase),
      avgNi: Number(avgNi),
      avgFe: Number(avgFe)
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Lokasi Stockpile,Material,Saldo Awal,Masuk,Keluar (Barging),Saldo Akhir,Ni (%),Fe (%),Status\n';
    const rows = stockpile.map(s => `"${s.id}","${s.lokasiStockpile}","${s.material}",${s.tonaseAwal},${s.masukTonase},${s.keluarTonase},${s.saldoAkhir},${s.avgNi},${s.avgFe},"${s.statusStok}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Stockpile_Inventory_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Stockpile Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Total Stockpile Fisik</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900">{totalInventoryTon.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Tersedia di EFO & Jetty</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Inflow (Masuk dari PIT)</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-blue-600">+{totalMasuk.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Pasokan hauling tambang</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Outflow (Pemuatan Tongkang)</span>
            <TrendingDown className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-amber-600">-{totalKeluar.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Pengapalan ke buyer</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Status Keamanan Stok</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-600">Aman</span>
            <span className="text-xs text-slate-500 font-medium">(2,1x buffer pengapalan)</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Batas stok minimum: 25.000 ton</span>
        </div>
      </div>

      {/* Stockpile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stockpile.map(s => (
          <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Warehouse className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">{s.lokasiStockpile}</h4>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                s.statusStok === 'Normal'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : s.statusStok === 'Kritis'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {s.statusStok}
              </span>
            </div>

            <div className="text-xs text-slate-500 mb-2">{s.material}</div>

            <div className="p-3 bg-slate-50 rounded-xl mb-3 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Saldo Awal:</span>
                <span className="font-mono text-slate-700">{s.tonaseAwal.toLocaleString()} t</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600 font-semibold">+ Masuk:</span>
                <span className="font-mono font-bold text-blue-600">+{s.masukTonase.toLocaleString()} t</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-600 font-semibold">- Keluar:</span>
                <span className="font-mono font-bold text-amber-600">-{s.keluarTonase.toLocaleString()} t</span>
              </div>
              <div className="border-t border-slate-200 pt-1 flex justify-between">
                <span className="font-bold text-slate-900">Saldo Akhir:</span>
                <span className="font-mono font-black text-sm text-slate-900">{s.saldoAkhir.toLocaleString()} ton</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
              <div className="bg-blue-50/50 p-2 rounded-lg">
                <span className="text-[10px] text-slate-500 block">Kadar Ni:</span>
                <span className="font-mono font-black text-blue-700 text-sm">{s.avgNi.toFixed(2)}%</span>
              </div>
              <div className="bg-slate-100/70 p-2 rounded-lg">
                <span className="text-[10px] text-slate-500 block">Kadar Fe:</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{s.avgFe.toFixed(1)}%</span>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => deleteStockpile(s.id)}
                className="text-[11px] text-slate-400 hover:text-red-600 flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Data</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button Bar */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Stockpile / Dome</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-blue-600" />
                <span>Input Data Stockpile Baru</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Lokasi Stockpile / Dome</label>
                <input
                  type="text"
                  required
                  value={lokasiStockpile}
                  onChange={e => setLokasiStockpile(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Jenis Material</label>
                <select
                  value={material}
                  onChange={e => setMaterial(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white font-medium"
                >
                  <option value="Ore High Grade">Ore High Grade (Ni &ge; 1.80%)</option>
                  <option value="Ore Medium Grade">Ore Medium Grade (Ni 1.50 - 1.79%)</option>
                  <option value="Ore Low Grade">Ore Low Grade (Ni &lt; 1.50%)</option>
                  <option value="Limonite">Limonite Ore</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Saldo Awal</label>
                  <input
                    type="number"
                    required
                    value={tonaseAwal}
                    onChange={e => setTonaseAwal(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-blue-700 font-bold mb-1">+ Masuk (Ton)</label>
                  <input
                    type="number"
                    required
                    value={masukTonase}
                    onChange={e => setMasukTonase(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-blue-300 rounded-lg font-mono font-bold text-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-amber-700 font-bold mb-1">- Keluar (Ton)</label>
                  <input
                    type="number"
                    required
                    value={keluarTonase}
                    onChange={e => setKeluarTonase(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-amber-300 rounded-lg font-mono font-bold text-amber-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-blue-700 font-black mb-1">Kadar Ni (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={avgNi}
                    onChange={e => setAvgNi(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-blue-300 rounded-lg font-mono font-black text-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Kadar Fe (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={avgFe}
                    onChange={e => setAvgFe(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Simpan Stockpile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
