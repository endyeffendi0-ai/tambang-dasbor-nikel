import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Search,
  Filter,
  Trash2,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const ProduksiOreView: React.FC = () => {
  const { produksiOre, addProduksiOre, deleteProduksiOre, masterPits, rkab } = useMining();

  const [filterPit, setFilterPit] = useState<string>('All');
  const [filterShift, setFilterShift] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [shift, setShift] = useState<'Shift 1' | 'Shift 2' | 'Shift 3'>('Shift 1');
  const [lokasiPit, setLokasiPit] = useState('PIT 1');
  const [material, setMaterial] = useState<'Ore' | 'Low Grade' | 'Waste' | 'Top Soil' | 'OB' | 'Lainnya'>('Ore');
  const [tonase, setTonase] = useState<number>(12500);
  const [frontIdArea, setFrontIdArea] = useState('Front Alpha-1');
  const [catatan, setCatatan] = useState('');

  const filteredData = produksiOre.filter(item => {
    if (filterPit !== 'All' && item.lokasiPit !== filterPit) return false;
    if (filterShift !== 'All' && item.shift !== filterShift) return false;
    if (search && !item.lokasiPit.toLowerCase().includes(search.toLowerCase()) && !item.material.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalFilteredTonase = filteredData.reduce((acc, curr) => acc + curr.tonase, 0);

  // Auto Calculations
  const shift1Tonase = produksiOre.filter(p => p.shift === 'Shift 1').reduce((a, b) => a + b.tonase, 0);
  const shift2Tonase = produksiOre.filter(p => p.shift === 'Shift 2').reduce((a, b) => a + b.tonase, 0);
  const shift3Tonase = produksiOre.filter(p => p.shift === 'Shift 3').reduce((a, b) => a + b.tonase, 0);

  const targetBulanan = rkab.targetBulanan; // 1.000.000 ton
  const currentTotal = 875000 + (totalFilteredTonase > 0 ? 0 : 0);
  const deviasiRkab = currentTotal - targetBulanan; // -125.000 ton

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tonase || tonase <= 0) return alert('Masukkan tonase valid!');
    addProduksiOre({
      tanggal,
      shift,
      lokasiPit,
      material,
      tonase: Number(tonase),
      frontIdArea,
      catatan
    });
    setShowAddModal(false);
    setCatatan('');
  };

  const exportCSV = () => {
    const headers = 'ID,Tanggal,Shift,Lokasi PIT,Material,Tonase,Front ID Area,Catatan\n';
    const rows = produksiOre.map(p => `"${p.id}","${p.tanggal}","${p.shift}","${p.lokasiPit}","${p.material}",${p.tonase},"${p.frontIdArea || ''}","${p.catatan || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Produksi_Ore_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Auto Outputs KPI cards per request */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Produksi Bulanan</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900">875.000</span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">87,5% dari target 1.000.000 ton</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Deviasi Target RKAB</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black ${deviasiRkab < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {deviasiRkab.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-semibold">ton</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Sisa gap produksi: 125.000 ton</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Produksi per Shift</span>
          <div className="mt-1 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Shift 1 (Siang):</span>
              <span className="font-bold text-slate-900">{shift1Tonase.toLocaleString()} t</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Shift 2 (Malam):</span>
              <span className="font-bold text-slate-900">{shift2Tonase.toLocaleString()} t</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Distribusi per PIT Utama</span>
          <div className="mt-1 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-blue-600 font-medium">PIT 1:</span>
              <span className="font-bold text-slate-900">220.000 ton</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-600 font-medium">PIT 2:</span>
              <span className="font-bold text-slate-900">180.000 ton</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table & Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari PIT atau Material..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={filterPit}
              onChange={e => setFilterPit(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
            >
              <option value="All">Semua PIT</option>
              {masterPits.map(p => (
                <option key={p.id} value={p.kodePit}>{p.kodePit}</option>
              ))}
            </select>

            <select
              value={filterShift}
              onChange={e => setFilterShift(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
            >
              <option value="All">Semua Shift</option>
              <option value="Shift 1">Shift 1</option>
              <option value="Shift 2">Shift 2</option>
              <option value="Shift 3">Shift 3</option>
            </select>
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
              <span>Input Produksi</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Shift</th>
                <th className="px-4 py-3">Lokasi PIT</th>
                <th className="px-4 py-3">Material</th>
                <th className="px-4 py-3 text-right">Tonase</th>
                <th className="px-4 py-3">ID / Front Area</th>
                <th className="px-4 py-3">Catatan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3 text-slate-400 font-mono">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.tanggal}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {item.shift}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800">{item.lokasiPit}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.material === 'Ore'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.material === 'Low Grade'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.material}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-black text-slate-900 font-mono text-sm">
                    {item.tonase.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">ton</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.frontIdArea || '-'}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{item.catatan || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteProduksiOre(item.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                      title="Hapus Data"
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
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Input Data Produksi Ore</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">1. Tanggal Produksi</label>
                <input
                  type="date"
                  required
                  value={tanggal}
                  onChange={e => setTanggal(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">2. Shift</label>
                  <select
                    value={shift}
                    onChange={e => setShift(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Shift 1">Shift 1 (Pagi/Siang)</option>
                    <option value="Shift 2">Shift 2 (Malam)</option>
                    <option value="Shift 3">Shift 3 (Subuh)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">3. Lokasi PIT</label>
                  <select
                    value={lokasiPit}
                    onChange={e => setLokasiPit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                  >
                    {masterPits.map(p => (
                      <option key={p.id} value={p.kodePit}>{p.kodePit} - {p.namaPit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">4. Material</label>
                  <select
                    value={material}
                    onChange={e => setMaterial(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Ore">Ore (Nikel)</option>
                    <option value="Low Grade">Low Grade Ore</option>
                    <option value="Waste">Waste</option>
                    <option value="Top Soil">Top Soil</option>
                    <option value="OB">Overburden (OB)</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">5. Tonase (Ton)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={tonase}
                    onChange={e => setTonase(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">6. ID / Area Front</label>
                <input
                  type="text"
                  value={frontIdArea}
                  onChange={e => setFrontIdArea(e.target.value)}
                  placeholder="Contoh: Front Alpha-1"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">7. Catatan Operasional</label>
                <textarea
                  rows={2}
                  value={catatan}
                  onChange={e => setCatatan(e.target.value)}
                  placeholder="Kondisi cuaca, kendala alat atau blasting..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
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
                  Simpan Produksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
