import React, { useState } from 'react';
import {
  Fuel,
  Plus,
  Trash2,
  Download,
  AlertTriangle,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const FuelView: React.FC = () => {
  const { fuel, addFuel, deleteFuel, masterUnits, masterOperators, produksiOre } = useMining();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [unitId, setUnitId] = useState('EX001');
  const [lokasi, setLokasi] = useState('PIT 1 Fuel Station');
  const [jumlahLiter, setJumlahLiter] = useState<number>(350);
  const [hmPengisian, setHmPengisian] = useState<number>(12468.0);
  const [hmTerakhir, setHmTerakhir] = useState<number>(12450.0);
  const [namaOperator, setNamaOperator] = useState('Budi Santoso');
  const [catatan, setCatatan] = useState('Pengisian rutin solar B35');

  const totalFuelLiters = fuel.reduce((a, b) => a + b.jumlahLiter, 0);
  const totalProductionTons = produksiOre.reduce((a, b) => a + b.tonase, 0) || 57000;
  const fuelRatio = (totalFuelLiters / totalProductionTons).toFixed(2); // Liter / ton

  const avgConsumptionPerHour = (
    fuel.reduce((a, b) => a + (b.konsumsiLiterPerHm || 0), 0) / (fuel.length || 1)
  ).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFuel({
      tanggal,
      unitId,
      lokasi,
      jumlahLiter: Number(jumlahLiter),
      hmPengisian: Number(hmPengisian),
      hmTerakhir: Number(hmTerakhir),
      namaOperator,
      catatan
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Tanggal,Unit ID,Lokasi,Jumlah Liter,HM Pengisian,HM Terakhir,Delta HM,Konsumsi (L/HM),Operator,Catatan\n';
    const rows = fuel.map(f => `"${f.id}","${f.tanggal}","${f.unitId}","${f.lokasi}",${f.jumlahLiter},${f.hmPengisian},${f.hmTerakhir},${f.hmPengisian - f.hmTerakhir},${f.konsumsiLiterPerHm},"${f.namaOperator}","${f.catatan || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Fuel_Consumption_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Fuel KPI Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Total Pemakaian Solar</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900">{totalFuelLiters.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-semibold">liter</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Solar Industri B35</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Fuel Ratio (L/Ton)</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
              Optimal
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-emerald-600">{fuelRatio}</span>
            <span className="text-xs text-slate-500 font-semibold">L/ton</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Total Liter / Total Tonase Ore</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Rata-rata Konsumsi / Jam</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-blue-600">{avgConsumptionPerHour}</span>
            <span className="text-xs text-slate-500 font-semibold">L/HM</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Liter / (HM Akhir - HM Awal)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Status Unit Boros</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-emerald-600">0</span>
            <span className="text-xs text-slate-500 font-medium">unit anomali</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Semua unit dalam toleransi standar</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fuel className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Distribusi & Log Pengisian Bahan Bakar</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Input Pengisian BBM</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Unit ID</th>
                <th className="px-4 py-3">Lokasi Dispenser</th>
                <th className="px-4 py-3 text-right font-black text-slate-900">Volume Solar</th>
                <th className="px-4 py-3 text-right">HM Terakhir</th>
                <th className="px-4 py-3 text-right">HM Pengisian</th>
                <th className="px-4 py-3 text-right font-bold text-blue-700">Laju Konsumsi</th>
                <th className="px-4 py-3">Operator</th>
                <th className="px-4 py-3">Catatan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fuel.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.tanggal}</td>
                  <td className="px-4 py-3 font-black text-slate-900">{item.unitId}</td>
                  <td className="px-4 py-3 text-slate-600">{item.lokasi}</td>
                  <td className="px-4 py-3 text-right font-mono font-black text-blue-600">
                    {item.jumlahLiter.toLocaleString()} Liter
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-500">{item.hmTerakhir.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-800">{item.hmPengisian.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right font-mono font-black text-sm text-slate-900 bg-slate-50/70">
                    {item.konsumsiLiterPerHm} L/HM
                  </td>
                  <td className="px-4 py-3 text-slate-700">{item.namaOperator}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{item.catatan || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteFuel(item.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Fuel className="w-5 h-5 text-blue-600" />
                <span>Input Pengisian Solar / Fuel</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={tanggal}
                    onChange={e => setTanggal(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Unit ID</label>
                  <select
                    value={unitId}
                    onChange={e => setUnitId(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    {masterUnits.map(u => (
                      <option key={u.id} value={u.unitId}>{u.unitId} - {u.unitJenis}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Lokasi Tangki/Dispenser</label>
                  <input
                    type="text"
                    required
                    value={lokasi}
                    onChange={e => setLokasi(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Volume (Liter)</label>
                  <input
                    type="number"
                    required
                    value={jumlahLiter}
                    onChange={e => setJumlahLiter(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">HM Pengisian Terakhir</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={hmTerakhir}
                    onChange={e => setHmTerakhir(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">HM Saat Pengisian</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={hmPengisian}
                    onChange={e => setHmPengisian(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex justify-between items-center">
                <span className="font-bold text-slate-700">Konsumsi Terhitung:</span>
                <span className="text-sm font-black text-blue-700 font-mono">
                  {hmPengisian > hmTerakhir ? ((jumlahLiter) / (hmPengisian - hmTerakhir)).toFixed(1) : '0'} L/HM
                </span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Operator / Driver</label>
                <select
                  value={namaOperator}
                  onChange={e => setNamaOperator(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  {masterOperators.map(o => (
                    <option key={o.id} value={o.nama}>{o.nama}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Catatan</label>
                <input
                  type="text"
                  value={catatan}
                  onChange={e => setCatatan(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
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
                  Simpan Pengisian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
