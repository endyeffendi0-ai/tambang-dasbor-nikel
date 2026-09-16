import React, { useState } from 'react';
import {
  FileText,
  Target,
  TrendingUp,
  TrendingDown,
  Edit,
  CheckCircle2,
  AlertTriangle,
  Award
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const RkabPlanningView: React.FC = () => {
  const { rkab, updateRkab } = useMining();
  const [showEditModal, setShowEditModal] = useState(false);

  // Form State
  const [targetTahunan, setTargetTahunan] = useState(rkab.targetTahunan);
  const [targetBulanan, setTargetBulanan] = useState(rkab.targetBulanan);
  const [targetHarian, setTargetHarian] = useState(rkab.targetHarian);
  const [targetStrippingRatio, setTargetStrippingRatio] = useState(rkab.targetStrippingRatio);
  const [targetBarging, setTargetBarging] = useState(rkab.targetBarging);
  const [realisasiBulanan, setRealisasiBulanan] = useState(rkab.realisasiBulanan);
  const [realisasiOb, setRealisasiOb] = useState(rkab.realisasiOb);
  const [realisasiBarging, setRealisasiBarging] = useState(rkab.realisasiBarging);

  const persentaseOre = ((rkab.realisasiBulanan / rkab.targetBulanan) * 100).toFixed(1);
  const persentaseBarging = ((rkab.realisasiBarging / rkab.targetBarging) * 100).toFixed(1);
  const deviasiOre = rkab.realisasiBulanan - rkab.targetBulanan;
  const deviasiBarging = rkab.realisasiBarging - rkab.targetBarging;
  const actualSr = (rkab.realisasiOb / rkab.realisasiBulanan).toFixed(2);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRkab({
      targetTahunan: Number(targetTahunan),
      targetBulanan: Number(targetBulanan),
      targetHarian: Number(targetHarian),
      targetStrippingRatio: Number(targetStrippingRatio),
      targetBarging: Number(targetBarging),
      realisasiBulanan: Number(realisasiBulanan),
      realisasiOb: Number(realisasiOb),
      realisasiBarging: Number(realisasiBarging)
    });
    setShowEditModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
              Disetujui Ditjen Minerba KESDM RI
            </span>
            <span className="text-xs text-slate-400">Periode: Tahun 2025</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">Rencana Kerja & Anggaran Biaya (RKAB)</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Monitoring kepatuhan kuota produksi tambang, stripping ratio batas izin IUP, dan realisasi penjualan bijih nikel domestik & ekspor.
          </p>
        </div>

        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-xs w-fit"
        >
          <Edit className="w-4 h-4" />
          <span>Sesuaikan Target RKAB</span>
        </button>
      </div>

      {/* Target vs Realisasi Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Produksi Ore Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Produksi Bijih Nikel (Ore)</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">
              {rkab.realisasiBulanan.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-bold">/ {rkab.targetBulanan.toLocaleString()} ton</span>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Pencapaian Target</span>
              <span className="font-bold text-blue-600">{persentaseOre}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(100, Number(persentaseOre))}%` }}></div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500">Deviasi Bulanan:</span>
            <span className={`font-mono font-bold ${deviasiOre < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {deviasiOre.toLocaleString()} ton
            </span>
          </div>
        </div>

        {/* Barging & Penjualan Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pengapalan / Barging</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">
              {rkab.realisasiBarging.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-bold">/ {rkab.targetBarging.toLocaleString()} ton</span>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Pencapaian Barging</span>
              <span className="font-bold text-emerald-600">{persentaseBarging}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, Number(persentaseBarging))}%` }}></div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500">Deviasi Pengapalan:</span>
            <span className={`font-mono font-bold ${deviasiBarging < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {deviasiBarging.toLocaleString()} ton
            </span>
          </div>
        </div>

        {/* Stripping Ratio Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stripping Ratio (SR)</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">
              {actualSr}
            </span>
            <span className="text-xs text-slate-400 font-bold">: 1 (Target: {rkab.targetStrippingRatio}:1)</span>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Realisasi Pengupasan OB:</span>
              <span className="font-mono font-bold text-slate-800">{rkab.realisasiOb.toLocaleString()} BCM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Produksi Ore:</span>
              <span className="font-mono font-bold text-slate-800">{rkab.realisasiBulanan.toLocaleString()} Ton</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500">Status Stripping:</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Efisien (Di Bawah Batas Maksimum)
            </span>
          </div>
        </div>
      </div>

      {/* Target Hierarchy Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Struktur Target Produksi & Toleransi Kuota IUP</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Parameter RKAB</th>
                <th className="px-4 py-3 text-right">Target Resmi KESDM</th>
                <th className="px-4 py-3 text-right">Realisasi Berjalan</th>
                <th className="px-4 py-3 text-right">Capaian (%)</th>
                <th className="px-4 py-3 text-right">Deviasi</th>
                <th className="px-4 py-3 text-center">Status Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-slate-900">1. Target Produksi Tahunan (Total Kuota)</td>
                <td className="px-4 py-3 text-right font-bold text-slate-700">{rkab.targetTahunan.toLocaleString()} ton</td>
                <td className="px-4 py-3 text-right font-black text-blue-700">9.450.000 ton</td>
                <td className="px-4 py-3 text-right text-emerald-600 font-bold">78,8%</td>
                <td className="px-4 py-3 text-right text-slate-500">-2.550.000 ton</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans">
                    On Track
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-slate-900">2. Target Produksi Bulanan</td>
                <td className="px-4 py-3 text-right font-bold text-slate-700">{rkab.targetBulanan.toLocaleString()} ton</td>
                <td className="px-4 py-3 text-right font-black text-blue-700">{rkab.realisasiBulanan.toLocaleString()} ton</td>
                <td className="px-4 py-3 text-right text-blue-600 font-bold">{persentaseOre}%</td>
                <td className="px-4 py-3 text-right text-rose-600 font-bold">{deviasiOre.toLocaleString()} ton</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 font-sans">
                    Perhatian
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-slate-900">3. Target Rata-rata Harian</td>
                <td className="px-4 py-3 text-right font-bold text-slate-700">{rkab.targetHarian.toLocaleString()} ton/hari</td>
                <td className="px-4 py-3 text-right font-black text-blue-700">29.166 ton/hari</td>
                <td className="px-4 py-3 text-right text-blue-600 font-bold">87,5%</td>
                <td className="px-4 py-3 text-right text-rose-600 font-bold">-4.167 ton</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans">
                    Normal
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-slate-900">4. Target Pengapalan (Barging)</td>
                <td className="px-4 py-3 text-right font-bold text-slate-700">{rkab.targetBarging.toLocaleString()} ton</td>
                <td className="px-4 py-3 text-right font-black text-blue-700">{rkab.realisasiBarging.toLocaleString()} ton</td>
                <td className="px-4 py-3 text-right text-emerald-600 font-bold">{persentaseBarging}%</td>
                <td className="px-4 py-3 text-right text-rose-600 font-bold">{deviasiBarging.toLocaleString()} ton</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans">
                    On Track
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Ubah Target & Realisasi RKAB</span>
              </h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Tahunan (Ton)</label>
                <input
                  type="number"
                  required
                  value={targetTahunan}
                  onChange={e => setTargetTahunan(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Bulanan (Ton)</label>
                  <input
                    type="number"
                    required
                    value={targetBulanan}
                    onChange={e => setTargetBulanan(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Harian (Ton)</label>
                  <input
                    type="number"
                    required
                    value={targetHarian}
                    onChange={e => setTargetHarian(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Stripping Ratio (SR)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={targetStrippingRatio}
                    onChange={e => setTargetStrippingRatio(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Barging (Ton)</label>
                  <input
                    type="number"
                    required
                    value={targetBarging}
                    onChange={e => setTargetBarging(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-800 mb-2">Realisasi Berjalan</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1">Ore (Ton)</label>
                    <input
                      type="number"
                      required
                      value={realisasiBulanan}
                      onChange={e => setRealisasiBulanan(Number(e.target.value))}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded-lg font-mono font-bold text-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">OB (BCM)</label>
                    <input
                      type="number"
                      required
                      value={realisasiOb}
                      onChange={e => setRealisasiOb(Number(e.target.value))}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Barging (Ton)</label>
                    <input
                      type="number"
                      required
                      value={realisasiBarging}
                      onChange={e => setRealisasiBarging(Number(e.target.value))}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded-lg font-mono font-bold text-emerald-700"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Perbarui Parameter RKAB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
