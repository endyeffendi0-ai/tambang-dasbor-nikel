import React, { useState } from 'react';
import {
  CloudRain,
  Plus,
  Trash2,
  Download,
  AlertTriangle,
  Clock,
  Droplets,
  Sun
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const HujanSlipperyView: React.FC = () => {
  const { hujanSlippery, addHujanSlippery, deleteHujanSlippery } = useMining();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [curahHujanMm, setCurahHujanMm] = useState<number>(28.5);
  const [mulaiHujan, setMulaiHujan] = useState('13:30');
  const [selesaiHujan, setSelesaiHujan] = useState('15:00');
  const [mulaiSlippery, setMulaiSlippery] = useState('15:00');
  const [selesaiSlippery, setSelesaiSlippery] = useState('16:30');
  const [dampakOperasi, setDampakOperasi] = useState<'Stop Total' | 'Jalan Licin' | 'Normal'>('Jalan Licin');
  const [keterangan, setKeterangan] = useState('Front tambang basah, grading aktif');

  const totalHujanJam = hujanSlippery.reduce((a, b) => a + b.totalJamHujan, 0);
  const totalSlipperyJam = hujanSlippery.reduce((a, b) => a + b.totalJamSlippery, 0);
  const totalLostTime = totalHujanJam + totalSlipperyJam;
  const avgCurahHujan = (hujanSlippery.reduce((a, b) => a + b.curahHujanMm, 0) / (hujanSlippery.length || 1)).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHujanSlippery({
      tanggal,
      curahHujanMm: Number(curahHujanMm),
      mulaiHujan,
      selesaiHujan,
      mulaiSlippery,
      selesaiSlippery,
      dampakOperasi,
      keterangan
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Tanggal,Curah Hujan (mm),Mulai Hujan,Selesai Hujan,Mulai Slippery,Selesai Slippery,Jam Hujan,Jam Slippery,Dampak,Keterangan\n';
    const rows = hujanSlippery.map(h => `"${h.id}","${h.tanggal}",${h.curahHujanMm},"${h.mulaiHujan}","${h.selesaiHujan}","${h.mulaiSlippery}","${h.selesaiSlippery}",${h.totalJamHujan},${h.totalJamSlippery},"${h.dampakOperasi}","${h.keterangan || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Hujan_Slippery_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* KPI Cards per prompt requirement */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Total Lost Time Hujan & Slippery</span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-rose-600">{totalLostTime.toFixed(1)}</span>
            <span className="text-xs text-slate-500 font-semibold">jam</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Waktu hilang terhadap jam kerja efektif</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Waktu Hujan (Rain)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-blue-600">{totalHujanJam.toFixed(1)}</span>
            <span className="text-xs text-slate-500 font-semibold">jam</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Durasi presipitasi aktif</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Waktu Licin (Slippery)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-amber-600">{totalSlipperyJam.toFixed(1)}</span>
            <span className="text-xs text-slate-500 font-semibold">jam</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Durasi pemulihan hauling road</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Rata-rata Curah Hujan</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900">{avgCurahHujan}</span>
            <span className="text-xs text-slate-500 font-semibold">mm/hari</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Klasifikasi: Hujan Sedang-Lebat</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Catatan Presipitasi & Delai Slippery</h2>
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
              <span>Input Curah Hujan</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3 text-right">Curah Hujan (mm)</th>
                <th className="px-4 py-3">Waktu Hujan</th>
                <th className="px-4 py-3 text-right">Durasi Hujan</th>
                <th className="px-4 py-3">Waktu Slippery</th>
                <th className="px-4 py-3 text-right">Durasi Slippery</th>
                <th className="px-4 py-3">Dampak Operasi</th>
                <th className="px-4 py-3">Keterangan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hujanSlippery.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3 font-bold text-slate-900">{item.tanggal}</td>
                  <td className="px-4 py-3 text-right font-mono font-black text-blue-600">
                    {item.curahHujanMm} mm
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono">
                    {item.mulaiHujan} - {item.selesaiHujan}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-slate-800">
                    {item.totalJamHujan} jam
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono">
                    {item.mulaiSlippery} - {item.selesaiSlippery}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-amber-600">
                    {item.totalJamSlippery} jam
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.dampakOperasi === 'Stop Total'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : item.dampakOperasi === 'Jalan Licin'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {item.dampakOperasi}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{item.keterangan || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteHujanSlippery(item.id)}
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
                <CloudRain className="w-5 h-5 text-blue-600" />
                <span>Input Data Curah Hujan & Slippery</span>
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
                  <label className="block text-slate-700 font-bold mb-1">Curah Hujan (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={curahHujanMm}
                    onChange={e => setCurahHujanMm(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                <p className="font-bold text-blue-900 text-[11px]">WAKTU HUJAN</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-0.5">Mulai Hujan</label>
                    <input
                      type="time"
                      value={mulaiHujan}
                      onChange={e => setMulaiHujan(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-0.5">Selesai Hujan</label>
                    <input
                      type="time"
                      value={selesaiHujan}
                      onChange={e => setSelesaiHujan(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
                <p className="font-bold text-amber-900 text-[11px]">WAKTU SLIPPERY (JALAN LICIN)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-0.5">Mulai Slippery</label>
                    <input
                      type="time"
                      value={mulaiSlippery}
                      onChange={e => setMulaiSlippery(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-0.5">Selesai Slippery</label>
                    <input
                      type="time"
                      value={selesaiSlippery}
                      onChange={e => setSelesaiSlippery(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Dampak Operasi</label>
                <select
                  value={dampakOperasi}
                  onChange={e => setDampakOperasi(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Stop Total">Stop Total (Operasi Dihentikan)</option>
                  <option value="Jalan Licin">Jalan Licin (Kecepatan & Kapasitas Dibatasi)</option>
                  <option value="Normal">Normal (Operasi Berjalan Aman)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Keterangan / Tindakan</label>
                <input
                  type="text"
                  value={keterangan}
                  onChange={e => setKeterangan(e.target.value)}
                  placeholder="Contoh: Unit grader merapikan hauling road segmen PIT 1"
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
                  Simpan Laporan Cuaca
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
