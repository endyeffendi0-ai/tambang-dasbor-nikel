import React, { useState } from 'react';
import {
  Database,
  Plus,
  Trash2,
  Layers,
  Truck,
  Users,
  Building,
  DollarSign,
  CheckCircle2
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const MasterDataView: React.FC = () => {
  const {
    masterPits,
    masterUnits,
    masterOperators,
    masterVendors,
    masterBuyers,
    addMasterPit,
    addMasterUnit,
    addMasterOperator,
    addMasterVendor,
    addMasterBuyer
  } = useMining();

  const [activeSubTab, setActiveSubTab] = useState<'pits' | 'units' | 'operators' | 'vendors' | 'buyers'>('pits');

  // Pit Form
  const [kodePit, setKodePit] = useState('PIT 4');
  const [namaPit, setNamaPit] = useState('PIT 4 Delta Tenggara');
  const [lokasiBlok, setLokasiBlok] = useState('Blok 4 Selatan');
  const [luasAreaHa, setLuasAreaHa] = useState<number>(38.5);

  // Unit Form
  const [unitId, setUnitId] = useState('DT003');
  const [unitJenis, setUnitJenis] = useState('Dump Truck 30 Ton');
  const [merkModel, setMerkModel] = useState('Scania P360');
  const [tahunPengadaan, setTahunPengadaan] = useState<number>(2023);
  const [kapasitas, setKapasitas] = useState('30 Ton');

  // Operator Form
  const [namaOp, setNamaOp] = useState('Ahmad Rizki');
  const [nikOp, setNikOp] = useState(`OP-${Date.now().toString().slice(-4)}`);
  const [jabatanOp, setJabatanOp] = useState<'Operator' | 'Driver' | 'Supervisor' | 'Mechanic'>('Driver');
  const [shiftKerja, setShiftKerja] = useState<'Shift 1' | 'Shift 2' | 'Rotasi'>('Shift 1');

  // Vendor Form
  const [namaVendor, setNamaVendor] = useState('PT Indo Traktor Utama');
  const [kategoriVendor, setKategoriVendor] = useState<'Sewa Unit' | 'Fuel Supplier' | 'Sparepart' | 'Kontraktor Mining'>('Sewa Unit');
  const [kontak, setKontak] = useState('0811-9876-5432');
  const [alamat, setAlamat] = useState('Jakarta / Pomalaa');

  // Buyer Form
  const [namaBuyer, setNamaBuyer] = useState('PT Huadi Nickel Alloy');
  const [negara, setNegara] = useState('Indonesia / Bantaeng');
  const [spesifikasiMinNi, setSpesifikasiMinNi] = useState<number>(1.70);
  const [maxFe, setMaxFe] = useState<number>(20.0);

  const handleAddPit = (e: React.FormEvent) => {
    e.preventDefault();
    addMasterPit({ kodePit, namaPit, lokasiBlok, luasAreaHa: Number(luasAreaHa), statusAktif: true });
    alert(`Master PIT ${kodePit} berhasil ditambahkan!`);
  };

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    addMasterUnit({ unitId, unitJenis, merkModel, tahunPengadaan: Number(tahunPengadaan), kapasitas, statusOperasi: 'Ready' });
    alert(`Unit ${unitId} berhasil ditambahkan!`);
  };

  const handleAddOperator = (e: React.FormEvent) => {
    e.preventDefault();
    addMasterOperator({ nama: namaOp, nik: nikOp, jabatan: jabatanOp, shiftKerja, statusAktif: true });
    alert(`Karyawan/Operator ${namaOp} berhasil ditambahkan!`);
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    addMasterVendor({ namaVendor, kategori: kategoriVendor, kontak, alamat, statusKerjasama: 'Aktif' });
    alert(`Vendor ${namaVendor} berhasil ditambahkan!`);
  };

  const handleAddBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    addMasterBuyer({ namaBuyer, negara, spesifikasiMinNi: Number(spesifikasiMinNi), maxFe: Number(maxFe), statusKontrak: 'Aktif' });
    alert(`Buyer ${namaBuyer} berhasil ditambahkan!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Sub Navigation Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 rounded-2xl w-fit">
        <button
          onClick={() => setActiveSubTab('pits')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'pits' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Master PIT ({masterPits.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('units')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'units' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Master Unit Alat ({masterUnits.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('operators')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'operators' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Operator & Driver ({masterOperators.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('vendors')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'vendors' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Master Vendor ({masterVendors.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('buyers')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'buyers' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Master Buyer ({masterBuyers.length})</span>
        </button>
      </div>

      {/* Tab Pits */}
      {activeSubTab === 'pits' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Daftar Wilayah Tambang / PIT</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Kode PIT</th>
                  <th className="px-4 py-3">Nama PIT</th>
                  <th className="px-4 py-3">Lokasi Blok</th>
                  <th className="px-4 py-3 text-right">Luas (Ha)</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterPits.map(p => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">{p.kodePit}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{p.namaPit}</td>
                    <td className="px-4 py-3 text-slate-600">{p.lokasiBlok}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold">{p.luasAreaHa} Ha</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {p.statusAktif ? 'Aktif Menambang' : 'Nonaktif'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Tambah Master PIT</span>
            </h4>
            <form onSubmit={handleAddPit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Kode PIT</label>
                <input
                  type="text"
                  required
                  value={kodePit}
                  onChange={e => setKodePit(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama PIT</label>
                <input
                  type="text"
                  required
                  value={namaPit}
                  onChange={e => setNamaPit(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Lokasi Blok</label>
                <input
                  type="text"
                  required
                  value={lokasiBlok}
                  onChange={e => setLokasiBlok(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Luas Area (Hektar)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={luasAreaHa}
                  onChange={e => setLuasAreaHa(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-xs mt-2"
              >
                Simpan Master PIT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab Units */}
      {activeSubTab === 'units' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Daftar Fleet Alat Berat & Kendaraan</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Unit ID</th>
                  <th className="px-4 py-3">Jenis Unit</th>
                  <th className="px-4 py-3">Merk & Model</th>
                  <th className="px-4 py-3">Tahun</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterUnits.map(u => (
                  <tr key={u.id}>
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">{u.unitId}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{u.unitJenis}</td>
                    <td className="px-4 py-3 text-slate-600">{u.merkModel} ({u.kapasitas})</td>
                    <td className="px-4 py-3 text-slate-500 font-mono">{u.tahunPengadaan}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.statusOperasi === 'Ready' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {u.statusOperasi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Tambah Unit Baru</span>
            </h4>
            <form onSubmit={handleAddUnit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Unit ID (Kode Lambung)</label>
                <input
                  type="text"
                  required
                  value={unitId}
                  onChange={e => setUnitId(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Jenis Unit</label>
                <input
                  type="text"
                  required
                  value={unitJenis}
                  onChange={e => setUnitJenis(e.target.value)}
                  placeholder="Excavator, Dump Truck, Dozer, Grader"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Merk & Tipe</label>
                <input
                  type="text"
                  required
                  value={merkModel}
                  onChange={e => setMerkModel(e.target.value)}
                  placeholder="Komatsu PC200, CAT 320D, Volvo FM440"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tahun</label>
                  <input
                    type="number"
                    value={tahunPengadaan}
                    onChange={e => setTahunPengadaan(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Kapasitas</label>
                  <input
                    type="text"
                    value={kapasitas}
                    onChange={e => setKapasitas(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-xs mt-2"
              >
                Simpan Unit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab Operators */}
      {activeSubTab === 'operators' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Daftar Operator, Driver & Teknisi</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">NIK</th>
                  <th className="px-4 py-3">Nama Lengkap</th>
                  <th className="px-4 py-3">Jabatan</th>
                  <th className="px-4 py-3">Shift</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterOperators.map(o => (
                  <tr key={o.id}>
                    <td className="px-4 py-3 font-mono font-bold text-slate-600">{o.nik}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{o.nama}</td>
                    <td className="px-4 py-3 text-blue-700 font-semibold">{o.jabatan}</td>
                    <td className="px-4 py-3 text-slate-600">{o.shiftKerja}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {o.statusAktif ? 'Aktif' : 'Cuti'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Tambah Operator / Driver</span>
            </h4>
            <form onSubmit={handleAddOperator} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={namaOp}
                  onChange={e => setNamaOp(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Jabatan</label>
                  <select
                    value={jabatanOp}
                    onChange={e => setJabatanOp(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Operator">Operator</option>
                    <option value="Driver">Driver</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Mechanic">Mekanik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Shift Kerja</label>
                  <select
                    value={shiftKerja}
                    onChange={e => setShiftKerja(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Shift 1">Shift 1 (Siang)</option>
                    <option value="Shift 2">Shift 2 (Malam)</option>
                    <option value="Rotasi">Rotasi Reguler</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-xs mt-2"
              >
                Simpan Karyawan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab Vendors */}
      {activeSubTab === 'vendors' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Daftar Rekanan Vendor & Kontraktor</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Nama Vendor</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Kontak & Alamat</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterVendors.map(v => (
                  <tr key={v.id}>
                    <td className="px-4 py-3 font-bold text-slate-900">{v.namaVendor}</td>
                    <td className="px-4 py-3 text-blue-700 font-semibold">{v.kategori}</td>
                    <td className="px-4 py-3 text-slate-600">{v.kontak} ({v.alamat})</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {v.statusKerjasama}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Tambah Rekanan Vendor</span>
            </h4>
            <form onSubmit={handleAddVendor} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Perusahaan / Vendor</label>
                <input
                  type="text"
                  required
                  value={namaVendor}
                  onChange={e => setNamaVendor(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Kategori Layanan</label>
                <select
                  value={kategoriVendor}
                  onChange={e => setKategoriVendor(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Sewa Unit">Sewa Alat Berat</option>
                  <option value="Fuel Supplier">Supplier BBM Solar</option>
                  <option value="Sparepart">Suku Cadang & Oli</option>
                  <option value="Kontraktor Mining">Kontraktor Penambangan</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Kontak Person / Telepon</label>
                <input
                  type="text"
                  value={kontak}
                  onChange={e => setKontak(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Kota / Alamat Kantor</label>
                <input
                  type="text"
                  value={alamat}
                  onChange={e => setAlamat(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-xs mt-2"
              >
                Simpan Vendor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab Buyers */}
      {activeSubTab === 'buyers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Daftar Pembeli / Smelter Nikel</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Nama Smelter / Buyer</th>
                  <th className="px-4 py-3">Negara / Wilayah</th>
                  <th className="px-4 py-3 text-right">Syarat Min Ni</th>
                  <th className="px-4 py-3 text-right">Syarat Max Fe</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterBuyers.map(b => (
                  <tr key={b.id}>
                    <td className="px-4 py-3 font-bold text-slate-900">{b.namaBuyer}</td>
                    <td className="px-4 py-3 text-slate-600">{b.negara}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-blue-700">&ge; {b.spesifikasiMinNi}%</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-700">&le; {b.maxFe}%</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {b.statusKontrak}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Tambah Buyer Baru</span>
            </h4>
            <form onSubmit={handleAddBuyer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Smelter / Perusahaan</label>
                <input
                  type="text"
                  required
                  value={namaBuyer}
                  onChange={e => setNamaBuyer(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Negara / Destinasi Smelter</label>
                <input
                  type="text"
                  required
                  value={negara}
                  onChange={e => setNegara(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Min Ni (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={spesifikasiMinNi}
                    onChange={e => setSpesifikasiMinNi(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono font-bold text-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Max Fe (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={maxFe}
                    onChange={e => setMaxFe(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-xs mt-2"
              >
                Simpan Pembeli
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
