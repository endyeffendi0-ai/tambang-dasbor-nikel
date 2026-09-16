import React, { useState } from 'react';
import {
  Ship,
  Plus,
  Search,
  Download,
  Trash2,
  Anchor,
  Compass,
  FileCheck,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const BargingView: React.FC = () => {
  const { barging, addBarging, deleteBarging, masterBuyers } = useMining();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [tb, setTb] = useState('TB Megamas 08');
  const [bg, setBg] = useState('BG Samudra 3001');
  const [jumlahRitase, setJumlahRitase] = useState<number>(340);
  const [rencanaTonase, setRencanaTonase] = useState<number>(250000);
  const [tonaseAktual, setTonaseAktual] = useState<number>(230000);
  const [tujuan, setTujuan] = useState('China');
  const [pembeli, setPembeli] = useState('PT Tsingshan Steel');
  const [noDo, setNoDo] = useState(`DO-2025-${Date.now().toString().slice(-3)}`);
  const [noKontrak, setNoKontrak] = useState('KTR-NKL-099');
  const [noShipment, setNoShipment] = useState('SHP-005-EXP');
  const [etaEtd, setEtaEtd] = useState('28 Apr / 01 Mei');
  const [surveyor, setSurveyor] = useState('Carsurin');
  const [draftTonaseAkhir, setDraftTonaseAkhir] = useState<number>(230500);
  const [moisture, setMoisture] = useState<number>(32.0);
  const [ket, setKet] = useState('');

  const filtered = barging.filter(b =>
    b.tujuan.toLowerCase().includes(search.toLowerCase()) ||
    b.pembeli.toLowerCase().includes(search.toLowerCase()) ||
    b.tb.toLowerCase().includes(search.toLowerCase()) ||
    b.bg.toLowerCase().includes(search.toLowerCase())
  );

  const totalPlan = barging.reduce((a, b) => a + b.rencanaTonase, 0);
  const totalActual = barging.reduce((a, b) => a + b.tonaseAktual, 0);
  const overallAchievement = ((totalActual / (totalPlan || 1)) * 100).toFixed(1);
  const selisihPlanAct = totalActual - totalPlan;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBarging({
      tanggal,
      tb,
      bg,
      jumlahRitase: Number(jumlahRitase),
      rencanaTonase: Number(rencanaTonase),
      tonaseAktual: Number(tonaseAktual),
      tujuan,
      pembeli,
      noDo,
      noKontrak,
      noShipment,
      etaEtd,
      surveyor,
      draftTonaseAkhir: Number(draftTonaseAkhir),
      moisture: Number(moisture),
      ket
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'ID,Tanggal,TB,BG,Ritase,Plan Tonase,Actual Tonase,Draft Final,Pencapaian,Tujuan,Pembeli,Surveyor,No DO,No Kontrak,Ket\n';
    const rows = barging.map(b => `"${b.id}","${b.tanggal}","${b.tb}","${b.bg}",${b.jumlahRitase},${b.rencanaTonase},${b.tonaseAktual},${b.draftTonaseAkhir || 0},"${b.pencapaian}%","${b.tujuan}","${b.pembeli}","${b.surveyor || ''}","${b.noDo || ''}","${b.noKontrak || ''}","${b.ket || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Barging_Shipping_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Barging Dashboard Highlights per prompt section 10 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Rencana Tonase</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900">{totalPlan.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Alokasi shipping schedule</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Tonase Aktual</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-blue-600">{totalActual.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Terkapalkan di pelabuhan</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Pencapaian Barging</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-600">{overallAchievement}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, Number(overallAchievement))}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Jumlah Tongkang / Kapal</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900">{barging.length}</span>
            <span className="text-xs text-slate-500 font-semibold">set TB/BG</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Total ritase: 820 rit</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Selisih Rencana vs Aktual</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black ${selisihPlanAct < 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {selisihPlanAct.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Deviasi pengapalan bulan ini</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari Tujuan, Buyer, Tugboat..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              <span>Input Pengapalan</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-3.5 py-3">Tanggal</th>
                <th className="px-3.5 py-3">Tugboat (TB) & Barge (BG)</th>
                <th className="px-3.5 py-3">Tujuan & Pembeli</th>
                <th className="px-3.5 py-3 text-right">Ritase</th>
                <th className="px-3.5 py-3 text-right">Plan Tonase</th>
                <th className="px-3.5 py-3 text-right font-black text-slate-900">Actual Tonase</th>
                <th className="px-3.5 py-3 text-right">Pencapaian</th>
                <th className="px-3.5 py-3">No. DO / Kontrak</th>
                <th className="px-3.5 py-3">Surveyor & Draft</th>
                <th className="px-3.5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-3.5 py-3 font-medium text-slate-800">{item.tanggal}</td>
                  <td className="px-3.5 py-3">
                    <div className="font-bold text-slate-900">{item.tb}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{item.bg}</div>
                  </td>
                  <td className="px-3.5 py-3">
                    <div className="font-bold text-blue-700">{item.tujuan}</div>
                    <div className="text-[11px] text-slate-600">{item.pembeli}</div>
                  </td>
                  <td className="px-3.5 py-3 text-right font-mono text-slate-700">{item.jumlahRitase} rit</td>
                  <td className="px-3.5 py-3 text-right font-mono text-slate-500">{item.rencanaTonase.toLocaleString()} t</td>
                  <td className="px-3.5 py-3 text-right font-mono font-black text-sm text-slate-900">
                    {item.tonaseAktual.toLocaleString()} t
                  </td>
                  <td className="px-3.5 py-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      (item.pencapaian || 0) >= 90
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.pencapaian}%
                    </span>
                  </td>
                  <td className="px-3.5 py-3">
                    <div className="font-mono text-[11px] text-slate-800">{item.noDo}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.noKontrak}</div>
                  </td>
                  <td className="px-3.5 py-3">
                    <div className="font-semibold text-slate-700">{item.surveyor}</div>
                    <div className="text-[10px] text-slate-500">Draft: {item.draftTonaseAkhir?.toLocaleString()} t (MC {item.moisture}%)</div>
                  </td>
                  <td className="px-3.5 py-3 text-center">
                    <button
                      onClick={() => deleteBarging(item.id)}
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

      {/* Add Barging Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Ship className="w-5 h-5 text-blue-600" />
                <span>Input Data Barging / Pengapalan</span>
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
                  <label className="block text-slate-700 font-bold mb-1">Jumlah Ritase</label>
                  <input
                    type="number"
                    required
                    value={jumlahRitase}
                    onChange={e => setJumlahRitase(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tugboat (TB)</label>
                  <input
                    type="text"
                    required
                    value={tb}
                    onChange={e => setTb(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tongkang / Barge (BG)</label>
                  <input
                    type="text"
                    required
                    value={bg}
                    onChange={e => setBg(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Rencana Tonase</label>
                  <input
                    type="number"
                    required
                    value={rencanaTonase}
                    onChange={e => setRencanaTonase(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-blue-700 font-black mb-1">Tonase Aktual</label>
                  <input
                    type="number"
                    required
                    value={tonaseAktual}
                    onChange={e => setTonaseAktual(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-blue-300 rounded-lg font-black text-blue-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tujuan</label>
                  <input
                    type="text"
                    required
                    value={tujuan}
                    onChange={e => setTujuan(e.target.value)}
                    placeholder="China, Jepang, Korea, Domestik"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Pembeli (Buyer)</label>
                  <input
                    type="text"
                    required
                    value={pembeli}
                    onChange={e => setPembeli(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">No. DO</label>
                  <input
                    type="text"
                    value={noDo}
                    onChange={e => setNoDo(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">No. Kontrak</label>
                  <input
                    type="text"
                    value={noKontrak}
                    onChange={e => setNoKontrak(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Surveyor</label>
                  <input
                    type="text"
                    value={surveyor}
                    onChange={e => setSurveyor(e.target.value)}
                    placeholder="Carsurin / Sucofindo"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
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
                  Simpan Pengapalan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
