import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Trash2,
  Download,
  Building,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const SewaUnitView: React.FC = () => {
  const { sewaUnit, addSewaUnit, deleteSewaUnit, masterVendors, masterUnits } = useMining();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [namaVendor, setNamaVendor] = useState('PT United Tractors');
  const [unitId, setUnitId] = useState('EX001');
  const [jenisUnit, setJenisUnit] = useState('Excavator 30 Ton');
  const [jamKerjaHm, setJamKerjaHm] = useState<number>(18.0);
  const [tarifPerJam, setTarifPerJam] = useState<number>(650000);
  const [statusPembayaran, setStatusPembayaran] = useState<'Lunas' | 'Belum Lunas' | 'Pending Approval'>('Belum Lunas');
  const [keterangan, setKeterangan] = useState('Operasi shift siang dan malam');

  const totalBiayaSewa = sewaUnit.reduce((a, b) => a + b.totalBiaya, 0);
  const totalLunas = sewaUnit.filter(s => s.statusPembayaran === 'Lunas').reduce((a, b) => a + b.totalBiaya, 0);
  const totalHutang = sewaUnit.filter(s => s.statusPembayaran !== 'Lunas').reduce((a, b) => a + b.totalBiaya, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSewaUnit({
      tanggal,
      namaVendor,
      unitId,
      jenisUnit,
      jamKerjaHm: Number(jamKerjaHm),
      tarifPerJam: Number(tarifPerJam),
      statusPembayaran,
      keterangan
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Tanggal,Vendor,Unit ID,Jenis Unit,HM Kerja,Tarif per Jam,Total Biaya,Status,Keterangan\n';
    const rows = sewaUnit.map(s => `"${s.id}","${s.tanggal}","${s.namaVendor}","${s.unitId}","${s.jenisUnit}",${s.jamKerjaHm},${s.tarifPerJam},${s.totalBiaya},"${s.statusPembayaran}","${s.keterangan || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sewa_Unit_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Total Tagihan Sewa Unit</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900">
              Rp {totalBiayaSewa.toLocaleString('id-ID')}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Total biaya rental per jam kerja HM</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Sewa Terbayar (Lunas)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-600">
              Rp {totalLunas.toLocaleString('id-ID')}
            </span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Invoice telah diverifikasi tim Finance</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Outstanding / Belum Lunas</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-amber-600">
              Rp {totalHutang.toLocaleString('id-ID')}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Menunggu verifikasi timesheet HM vendor</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Rekapitulasi Biaya & Billing Sewa Unit</h2>
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
              <span>Input Sewa Unit</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Nama Vendor</th>
                <th className="px-4 py-3">Unit ID & Jenis</th>
                <th className="px-4 py-3 text-right">Jam Kerja (HM)</th>
                <th className="px-4 py-3 text-right">Tarif / Jam</th>
                <th className="px-4 py-3 text-right font-black text-slate-900">Total Biaya Sewa</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3">Keterangan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sewaUnit.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.tanggal}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{item.namaVendor}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono font-bold text-blue-700">{item.unitId}</span>
                    <span className="text-[11px] text-slate-500 block">{item.jenisUnit}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-slate-800">{item.jamKerjaHm.toFixed(1)} Jam</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-600">Rp {item.tarifPerJam.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3 text-right font-mono font-black text-sm text-slate-900 bg-slate-50/60">
                    Rp {item.totalBiaya.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.statusPembayaran === 'Lunas'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.statusPembayaran === 'Belum Lunas'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.statusPembayaran}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{item.keterangan || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteSewaUnit(item.id)}
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
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>Input Data Sewa Unit</span>
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
                  <label className="block text-slate-700 font-bold mb-1">Nama Vendor</label>
                  <select
                    value={namaVendor}
                    onChange={e => setNamaVendor(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    {masterVendors.map(v => (
                      <option key={v.id} value={v.namaVendor}>{v.namaVendor}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Unit ID</label>
                  <select
                    value={unitId}
                    onChange={e => {
                      setUnitId(e.target.value);
                      const unit = masterUnits.find(u => u.unitId === e.target.value);
                      if (unit) setJenisUnit(unit.unitJenis);
                    }}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    {masterUnits.map(u => (
                      <option key={u.id} value={u.unitId}>{u.unitId} - {u.unitJenis}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Jenis Unit</label>
                <input
                  type="text"
                  required
                  value={jenisUnit}
                  onChange={e => setJenisUnit(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Jam Kerja HM</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={jamKerjaHm}
                    onChange={e => setJamKerjaHm(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tarif Sewa / Jam (Rp)</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={tarifPerJam}
                    onChange={e => setTarifPerJam(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center">
                <span className="font-bold text-slate-700">Total Biaya Sewa:</span>
                <span className="text-sm font-black text-emerald-700 font-mono">
                  Rp {(jamKerjaHm * tarifPerJam).toLocaleString('id-ID')}
                </span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Status Pembayaran</label>
                <select
                  value={statusPembayaran}
                  onChange={e => setStatusPembayaran(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white font-bold"
                >
                  <option value="Belum Lunas">Belum Lunas</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Lunas">Lunas</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Keterangan / PO Ref</label>
                <input
                  type="text"
                  value={keterangan}
                  onChange={e => setKeterangan(e.target.value)}
                  placeholder="PO-2025-081, shift operasional"
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
                  Simpan Invoice Sewa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
