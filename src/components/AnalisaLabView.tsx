import React, { useState } from 'react';
import {
  FlaskConical,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  Trash2
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const AnalisaLabView: React.FC = () => {
  const { analisaLab, addAnalisaLab, deleteAnalisaLab, masterPits } = useMining();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tanggalSample, setTanggalSample] = useState(new Date().toISOString().slice(0, 10));
  const [tanggalAnalisa, setTanggalAnalisa] = useState(new Date().toISOString().slice(0, 10));
  const [lokasiPit, setLokasiPit] = useState('PIT 1');
  const [material, setMaterial] = useState('Ore High Grade');
  const [noSample, setNoSample] = useState(`SPL-${Date.now().toString().slice(-4)}`);
  const [ni, setNi] = useState<number>(1.85);
  const [fe, setFe] = useState<number>(18.0);
  const [co, setCo] = useState<number>(0.08);
  const [cr, setCr] = useState<number>(0.75);
  const [mgO, setMgO] = useState<number>(2.4);
  const [siO2, setSiO2] = useState<number>(38.5);
  const [al2O3, setAl2O3] = useState<number>(3.8);
  const [caO, setCaO] = useState<number>(1.2);
  const [moisture, setMoisture] = useState<number>(31.5);
  const [keterangan, setKeterangan] = useState('');

  const filtered = analisaLab.filter(a =>
    a.noSample.toLowerCase().includes(search.toLowerCase()) ||
    a.lokasiPit.toLowerCase().includes(search.toLowerCase()) ||
    a.material.toLowerCase().includes(search.toLowerCase())
  );

  const avgNi = (analisaLab.reduce((a, b) => a + b.ni, 0) / (analisaLab.length || 1)).toFixed(2);
  const avgFe = (analisaLab.reduce((a, b) => a + b.fe, 0) / (analisaLab.length || 1)).toFixed(1);
  const minNi = Math.min(...analisaLab.map(a => a.ni)).toFixed(2);
  const maxNi = Math.max(...analisaLab.map(a => a.ni)).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnalisaLab({
      tanggalSample,
      tanggalAnalisa,
      lokasiPit,
      material,
      noSample,
      ni: Number(ni),
      fe: Number(fe),
      co: Number(co),
      cr: Number(cr),
      mgO: Number(mgO),
      siO2: Number(siO2),
      al2O3: Number(al2O3),
      caO: Number(caO),
      moisture: Number(moisture),
      keterangan
    });
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = 'No Sample,Tgl Sample,Tgl Analisa,PIT,Material,Ni(%),Fe(%),Co(%),Cr(%),MgO(%),SiO2(%),Moisture(%),Status,Keterangan\n';
    const rows = analisaLab.map(a => `"${a.noSample}","${a.tanggalSample}","${a.tanggalAnalisa}","${a.lokasiPit}","${a.material}",${a.ni},${a.fe},${a.co},${a.cr},${a.mgO},${a.siO2},${a.moisture || 0},"${a.statusSpec}","${a.keterangan || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Analisa_Lab_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Parameter QC Summary Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Rata-rata Kadar Ni</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
              ✓ In Spec
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{avgNi}%</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Min: <strong className="text-slate-800">{minNi}%</strong> | Max: <strong className="text-slate-800">{maxNi}%</strong>
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Rata-rata Kadar Besi (Fe)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{avgFe}%</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Toleransi smelter &lt; 22.0% Fe</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Rasio SiO₂ / MgO (S/M)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-blue-600 tracking-tight">
              {(38.5 / 2.45).toFixed(2)}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Indeks peleburan slag smelter RKEF</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Total Sample Teruji</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{analisaLab.length}</span>
            <span className="text-xs text-slate-500 font-medium">titik</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            {analisaLab.filter(a => a.statusSpec === 'In Spec').length} Sampel Sesuai Spesifikasi
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari No Sample, PIT..."
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
              <span>Input Hasil Analisa</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-3.5 py-2.5">No Sample</th>
                <th className="px-3.5 py-2.5">Tgl Sample</th>
                <th className="px-3.5 py-2.5">Tgl Analisa</th>
                <th className="px-3.5 py-2.5">PIT</th>
                <th className="px-3.5 py-2.5">Material</th>
                <th className="px-3.5 py-2.5 text-right font-black text-blue-700">Ni (%)</th>
                <th className="px-3.5 py-2.5 text-right font-bold text-slate-800">Fe (%)</th>
                <th className="px-3.5 py-2.5 text-right">Co (%)</th>
                <th className="px-3.5 py-2.5 text-right">Cr (%)</th>
                <th className="px-3.5 py-2.5 text-right">MgO (%)</th>
                <th className="px-3.5 py-2.5 text-right">SiO₂ (%)</th>
                <th className="px-3.5 py-2.5 text-right">MC (%)</th>
                <th className="px-3.5 py-2.5 text-center">Status</th>
                <th className="px-3.5 py-2.5">Keterangan</th>
                <th className="px-3.5 py-2.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-3.5 py-2.5 font-mono font-bold text-slate-900">{item.noSample}</td>
                  <td className="px-3.5 py-2.5 text-slate-500">{item.tanggalSample}</td>
                  <td className="px-3.5 py-2.5 text-slate-500">{item.tanggalAnalisa}</td>
                  <td className="px-3.5 py-2.5 font-bold text-slate-800">{item.lokasiPit}</td>
                  <td className="px-3.5 py-2.5 text-slate-600">{item.material}</td>
                  <td className="px-3.5 py-2.5 text-right font-mono font-black text-sm text-blue-600 bg-blue-50/40">
                    {item.ni.toFixed(2)}%
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-mono font-bold text-slate-800">
                    {item.fe.toFixed(1)}%
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-mono text-slate-600">{item.co.toFixed(2)}%</td>
                  <td className="px-3.5 py-2.5 text-right font-mono text-slate-600">{item.cr.toFixed(2)}%</td>
                  <td className="px-3.5 py-2.5 text-right font-mono text-slate-600">{item.mgO.toFixed(2)}%</td>
                  <td className="px-3.5 py-2.5 text-right font-mono text-slate-600">{item.siO2.toFixed(1)}%</td>
                  <td className="px-3.5 py-2.5 text-right font-mono text-slate-600">{item.moisture || 0}%</td>
                  <td className="px-3.5 py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.statusSpec === 'In Spec'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.statusSpec}
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-500 truncate max-w-xs">{item.keterangan || '-'}</td>
                  <td className="px-3.5 py-2.5 text-center">
                    <button
                      onClick={() => deleteAnalisaLab(item.id)}
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

      {/* Add Sample Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-amber-500" />
                <span>Input Hasil Analisa Lab QC</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">No. Sample</label>
                  <input
                    type="text"
                    required
                    value={noSample}
                    onChange={e => setNoSample(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Lokasi PIT</label>
                  <select
                    value={lokasiPit}
                    onChange={e => setLokasiPit(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    {masterPits.map(p => (
                      <option key={p.id} value={p.kodePit}>{p.kodePit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tgl Sample</label>
                  <input
                    type="date"
                    required
                    value={tanggalSample}
                    onChange={e => setTanggalSample(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tgl Analisa</label>
                  <input
                    type="date"
                    required
                    value={tanggalAnalisa}
                    onChange={e => setTanggalAnalisa(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wide">Parameter Kimia (%)</p>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-blue-700 font-black text-[11px] mb-0.5">Ni (%) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={ni}
                      onChange={e => setNi(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-blue-300 rounded font-black text-blue-700 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-[11px] mb-0.5">Fe (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={fe}
                      onChange={e => setFe(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-[11px] mb-0.5">Co (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={co}
                      onChange={e => setCo(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-[11px] mb-0.5">Cr (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={cr}
                      onChange={e => setCr(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-[11px] mb-0.5">MgO (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={mgO}
                      onChange={e => setMgO(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-[11px] mb-0.5">SiO₂ (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={siO2}
                      onChange={e => setSiO2(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-[11px] mb-0.5">Moisture (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={moisture}
                      onChange={e => setMoisture(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-[11px] mb-0.5">Al₂O₃ (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={al2O3}
                      onChange={e => setAl2O3(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-[11px] mb-0.5">CaO (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={caO}
                      onChange={e => setCaO(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-200 rounded bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Keterangan / Tindak Lanjut</label>
                <input
                  type="text"
                  value={keterangan}
                  onChange={e => setKeterangan(e.target.value)}
                  placeholder="Contoh: Sesuai spesifikasi buyer Tsingshan"
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
                  Simpan Hasil QC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
