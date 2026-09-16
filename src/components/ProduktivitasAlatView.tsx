import React, { useState } from 'react';
import {
  Activity,
  Plus,
  Search,
  Download,
  Trash2,
  Clock,
  TrendingUp,
  Flame
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const ProduktivitasAlatView: React.FC = () => {
  const { produktivitas, addProduktivitas, deleteProduktivitas, masterUnits, masterOperators, masterPits } = useMining();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [namaOperator, setNamaOperator] = useState('Budi Santoso');
  const [unitId, setUnitId] = useState('EX001');
  const [mulai, setMulai] = useState('07:00');
  const [selesai, setSelesai] = useState('17:00');
  const [lokasi, setLokasi] = useState('PIT 1 Front Alpha');
  const [aktivitas, setAktivitas] = useState<'Loading' | 'Hauling' | 'Digging' | 'Dumping' | 'Spreading'>('Loading');
  const [material, setMaterial] = useState('Ore');
  const [cycleTime, setCycleTime] = useState<number>(2.4);
  const [ritase, setRitase] = useState<number>(140);
  const [tonase, setTonase] = useState<number>(4200);
  const [delay, setDelay] = useState<number>(30);
  const [keterangan, setKeterangan] = useState('Fleet berjalan optimal');

  const avgProductivity = Math.round(
    produktivitas.reduce((a, b) => a + b.produktivitasTonPerJam, 0) / (produktivitas.length || 1)
  );

  const totalTonase = produktivitas.reduce((a, b) => a + b.tonase, 0);
  const totalRitase = produktivitas.reduce((a, b) => a + b.ritase, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduktivitas({
      tanggal,
      namaOperator,
      unitId,
      mulai,
      selesai,
      lokasi,
      aktivitas,
      material,
      cycleTime: Number(cycleTime),
      ritase: Number(ritase),
      tonase: Number(tonase),
      delay: Number(delay),
      keterangan
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Tanggal,Unit ID,Operator,Aktivitas,Lokasi,Material,Cycle Time (m),Ritase,Tonase,Delay (m),Produktivitas (Ton/Jam),Ket\n';
    const rows = produktivitas.map(p => `"${p.id}","${p.tanggal}","${p.unitId}","${p.namaOperator}","${p.aktivitas}","${p.lokasi}","${p.material}",${p.cycleTime},${p.ritase},${p.tonase},${p.delay},${p.produktivitasTonPerJam},"${p.keterangan || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Produktivitas_Alat_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Productivity Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Rata-rata Produktivitas Fleet</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900">{avgProductivity}</span>
            <span className="text-xs text-slate-500 font-semibold">ton/jam</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Standar operasi tambang &gt; 350 t/jam</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Total Produksi Tercatat</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-blue-600">{totalTonase.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Total ritase: {totalRitase} rit</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Target Cycle Time Loading</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900">2.5</span>
            <span className="text-xs text-slate-500 font-semibold">menit/rit</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Bucket pass 4-5 kali per truck</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Ketersediaan Fisik (PA)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-emerald-600">92,5%</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Utilization of Availability (UA): 78,3%</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Catatan Produktivitas Unit & Operator</h2>
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
              <span>Input Kinerja</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Unit ID</th>
                <th className="px-4 py-3">Operator</th>
                <th className="px-4 py-3">Aktivitas & Material</th>
                <th className="px-4 py-3">Lokasi</th>
                <th className="px-4 py-3 text-right">Cycle Time</th>
                <th className="px-4 py-3 text-right">Ritase</th>
                <th className="px-4 py-3 text-right">Tonase</th>
                <th className="px-4 py-3 text-right font-black text-blue-700">Produktivitas</th>
                <th className="px-4 py-3">Delay</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {produktivitas.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.tanggal}</td>
                  <td className="px-4 py-3 font-black text-slate-900">{item.unitId}</td>
                  <td className="px-4 py-3 text-slate-700">{item.namaOperator}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-900">{item.aktivitas}</span>
                    <span className="text-[11px] text-slate-500 block">{item.material}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.lokasi}</td>
                  <td className="px-4 py-3 text-right font-mono">{item.cycleTime} m</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-slate-800">{item.ritase} rit</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">{item.tonase.toLocaleString()} t</td>
                  <td className="px-4 py-3 text-right font-mono font-black text-blue-600 text-sm bg-blue-50/40">
                    {item.produktivitasTonPerJam} ton/jam
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                      {item.delay} m
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteProduktivitas(item.id)}
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>Input Produktivitas Alat Berat</span>
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
                      <option key={u.id} value={u.unitId}>{u.unitId} - {u.merkModel}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Operator</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Aktivitas</label>
                  <select
                    value={aktivitas}
                    onChange={e => setAktivitas(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Loading">Loading (Pemuatan)</option>
                    <option value="Hauling">Hauling (Pengangkutan)</option>
                    <option value="Digging">Digging (Penggalian)</option>
                    <option value="Dumping">Dumping (Penumpahan)</option>
                    <option value="Spreading">Spreading / Dozing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Lokasi (PIT / Front)</label>
                  <input
                    type="text"
                    required
                    value={lokasi}
                    onChange={e => setLokasi(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Material</label>
                  <input
                    type="text"
                    required
                    value={material}
                    onChange={e => setMaterial(e.target.value)}
                    placeholder="Ore / OB / Waste"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Cycle Time (m)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={cycleTime}
                    onChange={e => setCycleTime(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Ritase</label>
                  <input
                    type="number"
                    required
                    value={ritase}
                    onChange={e => setRitase(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tonase (Ton)</label>
                  <input
                    type="number"
                    required
                    value={tonase}
                    onChange={e => setTonase(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-lg font-mono font-black"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Delay (Menit)</label>
                  <input
                    type="number"
                    value={delay}
                    onChange={e => setDelay(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Keterangan Tambahan</label>
                <input
                  type="text"
                  value={keterangan}
                  onChange={e => setKeterangan(e.target.value)}
                  placeholder="Kondisi jalan, antrian, fuel, dll."
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
                  Simpan Produktivitas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
