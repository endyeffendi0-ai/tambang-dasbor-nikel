import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Trash2,
  Download,
  AlertTriangle,
  Clock,
  DollarSign,
  CheckCircle2
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const MaintenanceView: React.FC = () => {
  const { maintenance, addMaintenance, deleteMaintenance, masterUnits } = useMining();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [unitId, setUnitId] = useState('DT002');
  const [jenisPerawatan, setJenisPerawatan] = useState<'Servis Berkala' | 'Kerusakan / Breakdown' | 'Penggantian Sparepart' | 'Inspeksi'>('Kerusakan / Breakdown');
  const [komponen, setKomponen] = useState('Transmisi & Hydraulic Hose');
  const [biayaSparepart, setBiayaSparepart] = useState<number>(12500000);
  const [biayaJasa, setBiayaJasa] = useState<number>(3000000);
  const [downtimeJam, setDowntimeJam] = useState<number>(6.5);
  const [statusUnit, setStatusUnit] = useState<'Ready' | 'Breakdown' | 'Waiting Part'>('Ready');
  const [keterangan, setKeterangan] = useState('Perbaikan hose bocor selesai');

  const totalBiaya = maintenance.reduce((a, b) => a + b.totalBiaya, 0);
  const totalDowntime = maintenance.reduce((a, b) => a + b.downtimeJam, 0);
  const totalBreakdown = maintenance.filter(m => m.jenisPerawatan === 'Kerusakan / Breakdown').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMaintenance({
      tanggal,
      unitId,
      jenisPerawatan,
      komponen,
      biayaSparepart: Number(biayaSparepart),
      biayaJasa: Number(biayaJasa),
      downtimeJam: Number(downtimeJam),
      statusUnit,
      keterangan
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Tanggal,Unit ID,Jenis,Komponen,Sparepart,Jasa,Total Biaya,Downtime (Jam),Status,Keterangan\n';
    const rows = maintenance.map(m => `"${m.id}","${m.tanggal}","${m.unitId}","${m.jenisPerawatan}","${m.komponen}",${m.biayaSparepart},${m.biayaJasa},${m.totalBiaya},${m.downtimeJam},"${m.statusUnit}","${m.keterangan || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Maintenance_Repair_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Maintenance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Total Biaya Perawatan & Repair</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900">
              Rp {totalBiaya.toLocaleString('id-ID')}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Sparepart & jasa mekanik</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Total Downtime Alat</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-rose-600">{totalDowntime.toFixed(1)}</span>
            <span className="text-xs text-slate-500 font-semibold">jam</span>
          </div>
          <span className="text-[11px] text-rose-600 font-bold mt-1 block">Jam henti unit saat perbaikan</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Kejadian Breakdown</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-amber-600">{totalBreakdown}</span>
            <span className="text-xs text-slate-500 font-medium">kasus</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">MTBF & MTTR terkendali</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Fleet Availability</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-emerald-600">93,2%</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Target ketersediaan tercapai</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Log Servis Berkala & Perbaikan Alat</h2>
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
              <span>Input Perawatan</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Unit ID</th>
                <th className="px-4 py-3">Jenis Perawatan</th>
                <th className="px-4 py-3">Komponen / Pekerjaan</th>
                <th className="px-4 py-3 text-right">Sparepart</th>
                <th className="px-4 py-3 text-right">Jasa</th>
                <th className="px-4 py-3 text-right font-black text-slate-900">Total Biaya</th>
                <th className="px-4 py-3 text-right">Downtime</th>
                <th className="px-4 py-3 text-center">Status Unit</th>
                <th className="px-4 py-3">Catatan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {maintenance.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.tanggal}</td>
                  <td className="px-4 py-3 font-mono font-bold text-blue-700">{item.unitId}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.jenisPerawatan === 'Kerusakan / Breakdown'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : item.jenisPerawatan === 'Servis Berkala'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.jenisPerawatan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-800 font-medium">{item.komponen}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-600">Rp {item.biayaSparepart.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-600">Rp {item.biayaJasa.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3 text-right font-mono font-black text-sm text-slate-900 bg-slate-50/60">
                    Rp {item.totalBiaya.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-rose-600">{item.downtimeJam} Jam</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.statusUnit === 'Ready'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.statusUnit === 'Breakdown'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.statusUnit}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{item.keterangan || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteMaintenance(item.id)}
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
                <Wrench className="w-5 h-5 text-blue-600" />
                <span>Input Maintenance & Perbaikan</span>
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
                      <option key={u.id} value={u.unitId}>{u.unitId} ({u.merkModel})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Jenis Perawatan</label>
                <select
                  value={jenisPerawatan}
                  onChange={e => setJenisPerawatan(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white font-bold"
                >
                  <option value="Servis Berkala">Servis Berkala (Periodic Service 250/500/1000 HM)</option>
                  <option value="Kerusakan / Breakdown">Kerusakan / Breakdown</option>
                  <option value="Penggantian Sparepart">Penggantian Sparepart</option>
                  <option value="Inspeksi">Inspeksi Harian / Mingguan</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Komponen / Deskripsi Pekerjaan</label>
                <input
                  type="text"
                  required
                  value={komponen}
                  onChange={e => setKomponen(e.target.value)}
                  placeholder="Ganti oli, filter hydraulic, radiator, hose..."
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Biaya Sparepart (Rp)</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={biayaSparepart}
                    onChange={e => setBiayaSparepart(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Biaya Jasa (Rp)</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={biayaJasa}
                    onChange={e => setBiayaJasa(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Downtime (Jam)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={downtimeJam}
                    onChange={e => setDowntimeJam(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold text-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status Akhir Unit</label>
                  <select
                    value={statusUnit}
                    onChange={e => setStatusUnit(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white font-bold"
                  >
                    <option value="Ready">Ready (Siap Operasi)</option>
                    <option value="Breakdown">Breakdown (Mogok)</option>
                    <option value="Waiting Part">Waiting Part (Menunggu Suku Cadang)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Catatan Mekanik</label>
                <input
                  type="text"
                  value={keterangan}
                  onChange={e => setKeterangan(e.target.value)}
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
                  Simpan Catatan Servis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
