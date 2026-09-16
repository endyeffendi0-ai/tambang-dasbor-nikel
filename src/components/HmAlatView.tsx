import React, { useState } from 'react';
import {
  Gauge,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Download,
  Clock
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const HmAlatView: React.FC = () => {
  const { hmAlat, addHmAlat, deleteHmAlat, masterUnits, masterOperators } = useMining();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [namaOperator, setNamaOperator] = useState('Budi Santoso');
  const [unitId, setUnitId] = useState('EX001');
  const [hmAwal, setHmAwal] = useState<number>(12450.0);
  const [hmAkhir, setHmAkhir] = useState<number>(12468.0);
  const [keterangan, setKeterangan] = useState('Operasi normal loading');

  const liveHmOperasi = Number((hmAkhir - hmAwal).toFixed(1));
  let errorWarning = '';
  if (hmAkhir < hmAwal) errorWarning = 'HM Akhir tidak boleh lebih kecil dari HM Awal!';
  else if (liveHmOperasi > 24) errorWarning = 'HM harian tidak wajar (> 24 jam)';

  const totalHmOperasi = hmAlat.reduce((a, b) => a + b.hmOperasi, 0);
  const totalWarnings = hmAlat.filter(h => !!h.warning).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hmAkhir < hmAwal) {
      if (!confirm('Peringatan: HM Akhir < HM Awal. Tetap simpan log ini untuk audit?')) return;
    }
    addHmAlat({
      tanggal,
      namaOperator,
      unitId,
      hmAwal: Number(hmAwal),
      hmAkhir: Number(hmAkhir),
      keterangan
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Tanggal,Unit ID,Operator,HM Awal,HM Akhir,HM Operasi,Keterangan,Peringatan\n';
    const rows = hmAlat.map(h => `"${h.id}","${h.tanggal}","${h.unitId}","${h.namaOperator}",${h.hmAwal},${h.hmAkhir},${h.hmOperasi},"${h.keterangan || ''}","${h.warning || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HM_Alat_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Total Jam Operasi Fleet (HM)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900">{totalHmOperasi.toFixed(1)}</span>
            <span className="text-xs text-slate-500 font-semibold">jam</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Rata-rata 15,8 jam/unit/hari</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Rumus Operasi</span>
          <div className="mt-1 p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono font-bold text-blue-700">
            HM Operasi = HM Akhir − HM Awal
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Otomatis dihitung sistem tanpa manipulasi manual</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Peringatan / Anomali Meter</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-3xl font-black ${totalWarnings > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {totalWarnings}
            </span>
            <span className="text-xs text-slate-500 font-medium">catatan warning</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Validasi HM akhir &lt; awal, input &gt;24 jam</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Buku Catatan HM Harian Alat</h2>
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
              <span>Input HM Alat</span>
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
                <th className="px-4 py-3 text-right">HM Awal</th>
                <th className="px-4 py-3 text-right">HM Akhir</th>
                <th className="px-4 py-3 text-right font-black text-blue-700">HM Operasi</th>
                <th className="px-4 py-3">Status Kontrol</th>
                <th className="px-4 py-3">Keterangan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hmAlat.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.tanggal}</td>
                  <td className="px-4 py-3 font-black text-slate-900">{item.unitId}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{item.namaOperator}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-600">{item.hmAwal.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-600">{item.hmAkhir.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right font-mono font-black text-sm text-blue-600 bg-blue-50/40">
                    {item.hmOperasi.toFixed(1)} jam
                  </td>
                  <td className="px-4 py-3">
                    {item.warning ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3" />
                        {item.warning}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" />
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{item.keterangan || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteHmAlat(item.id)}
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
                <Gauge className="w-5 h-5 text-blue-600" />
                <span>Input Hour Meter (HM) Alat</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Unit ID</label>
                  <select
                    value={unitId}
                    onChange={e => setUnitId(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    {masterUnits.map(u => (
                      <option key={u.id} value={u.unitId}>{u.unitId} ({u.unitJenis})</option>
                    ))}
                  </select>
                </div>
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">HM Awal</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={hmAwal}
                    onChange={e => setHmAwal(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">HM Akhir</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={hmAkhir}
                    onChange={e => setHmAkhir(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              {/* Real-time Calculation & Warning */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Hasil HM Operasi:</span>
                  <span className="text-base font-black text-blue-600 font-mono">{liveHmOperasi} Jam</span>
                </div>
                {errorWarning && (
                  <div className="mt-2 text-rose-600 font-bold text-[11px] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorWarning}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Keterangan / Aktivitas</label>
                <input
                  type="text"
                  value={keterangan}
                  onChange={e => setKeterangan(e.target.value)}
                  placeholder="Contoh: Loading Ore PIT 1, Front Alpha"
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
                  Simpan HM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
