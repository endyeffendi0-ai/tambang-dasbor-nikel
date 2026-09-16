import React from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Gauge,
  Fuel,
  FlaskConical,
  Ship,
  Target,
  ArrowRight
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const KontrolOtomatisView: React.FC = () => {
  const { alerts, markAlertResolved, rkab } = useMining();

  const rules = [
    {
      category: '1. Kontrol HM Alat Berat',
      icon: Gauge,
      items: [
        { rule: 'HM Akhir < HM Awal', action: 'Ditolak / Diberi Tanda Merah', status: 'Aktif' },
        { rule: 'HM Harian > 24 Jam', action: 'Ditolak Otomatis Sistem', status: 'Aktif' },
        { rule: 'Input Ganda Unit pada Shift Sama', action: 'Peringatan Duplikasi', status: 'Aktif' },
        { rule: 'Unit Tidak Terdaftar di Master Data', action: 'Ditolak dari Input Form', status: 'Aktif' },
      ]
    },
    {
      category: '2. Kontrol Bahan Bakar (Fuel)',
      icon: Fuel,
      items: [
        { rule: 'Konsumsi L/HM di Luar Batas Normal (>40 L/HM)', action: 'Tanda Merah / Flag Anomali', status: 'Aktif' },
        { rule: 'HM Saat Pengisian < HM Terakhir', action: 'Ditolak Validasi Log', status: 'Aktif' },
        { rule: 'Fuel Ratio > 1.20 L/Ton (Boros)', action: 'Notifikasi Tim Maintenance & Fleet', status: 'Aktif' },
      ]
    },
    {
      category: '3. Kontrol Kualitas Lab (QC Ore)',
      icon: FlaskConical,
      items: [
        { rule: 'Kadar Ni di Bawah Spesifikasi Kontrak (< 1.65%)', action: 'Peringatan Reject / Degradasi ke Medium', status: 'Aktif' },
        { rule: 'Moisture Content (MC) Terlalu Tinggi (> 35%)', action: 'Peringatan Potensi Penalti / Slurry Cargo', status: 'Aktif' },
        { rule: 'Rasio SiO₂ / MgO Slag Instability (> 20)', action: 'Peringatan Titik Lebur RKEF', status: 'Aktif' },
      ]
    },
    {
      category: '4. Kontrol Barging & Shipping',
      icon: Ship,
      items: [
        { rule: 'Tonase Aktual > Kapasitas Izin Tongkang', action: 'Peringatan Overload Draft Kelaiklautan', status: 'Aktif' },
        { rule: 'Deviasi Draft Surveyor vs Timbangan Akhir > 5%', action: 'Peringatan Investigasi Survey', status: 'Aktif' },
      ]
    },
    {
      category: '5. Kontrol Target RKAB Minerba',
      icon: Target,
      items: [
        { rule: 'Pencapaian Produksi ≥ 90% Target Bulanan', action: 'Indikator Hijau (Optimal)', status: 'Aktif' },
        { rule: 'Deviasi Produksi < 70% Target Bulanan', action: 'Indikator Merah & Alarm Defisit RKAB', status: 'Aktif' },
      ]
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Overview Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Sistem Kontrol & Validasi Otomatis Terpadu</h2>
          </div>
          <p className="text-xs text-slate-500">
            Sistem pengawasan cerdas sesuai spesifikasi operasional tambang nikel untuk mencegah anomali data, kecurangan jam operasi alat berat, overfill bahan bakar, serta kegagalan mutu spesifikasi buyer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>15 Aturan Aktif</span>
          </div>
          <div className="px-3.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>{alerts.length} Isu Terdeteksi</span>
          </div>
        </div>
      </div>

      {/* Active Incident List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
          <span>Daftar Peringatan & Insiden Operasional Berjalan</span>
          <span className="text-xs font-normal text-slate-400">Real-time scanner</span>
        </h3>

        {alerts.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <p>Seluruh sistem beroperasi normal tanpa peringatan kendali.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {alerts.map(a => (
              <div
                key={a.id}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                  a.severity === 'danger'
                    ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                    : a.severity === 'warning'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                    : 'bg-blue-50/70 border-blue-200 text-blue-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {a.severity === 'danger' ? (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs uppercase tracking-wider">{a.module}</span>
                      <span className="text-[10px] text-slate-400">{a.timestamp}</span>
                    </div>
                    <p className="text-xs font-medium mt-0.5">{a.message}</p>
                  </div>
                </div>

                <button
                  onClick={() => markAlertResolved(a.id)}
                  className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold self-end sm:self-auto transition shadow-xs"
                >
                  Tandai Selesai
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Control Matrices */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Matriks Aturan Validasi Otomatis (Rules Engine)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((ruleGroup, idx) => {
            const IconComponent = ruleGroup.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">{ruleGroup.category}</h4>
                </div>

                <div className="space-y-2.5">
                  {ruleGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-800">{item.rule}</div>
                        <div className="text-[11px] text-blue-600 flex items-center gap-1 mt-0.5">
                          <ArrowRight className="w-3 h-3" />
                          <span>{item.action}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
