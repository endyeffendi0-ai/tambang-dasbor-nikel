export type NavigationTab =
  | 'dashboard'
  | 'produksi_ore'
  | 'analisa_lab'
  | 'barging'
  | 'hm_alat'
  | 'produktivitas'
  | 'hujan'
  | 'fuel'
  | 'sewa_unit'
  | 'maintenance'
  | 'stockpile'
  | 'rkab'
  | 'master_unit'
  | 'master_operator'
  | 'master_pit'
  | 'master_material'
  | 'master_buyer'
  | 'master_vendor'
  | 'pengaturan'
  | 'laporan';

export interface ProduksiOreItem {
  id: string;
  tanggal: string; // YYYY-MM-DD
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3';
  lokasiPit: string; // PIT 1 - PIT 5
  material: 'Ore' | 'Low Grade' | 'Waste' | 'Top Soil' | 'OB' | 'Lainnya';
  tonase: number;
  frontIdArea?: string;
  fotoGambar?: string;
  catatan?: string;
}

export interface AnalisaLabItem {
  id: string;
  tanggalSample: string;
  tanggalAnalisa: string;
  lokasiPit: string;
  material: string;
  noSample: string;
  ni: number; // %
  fe: number; // %
  co: number; // %
  cr: number; // %
  mgO: number; // %
  siO2: number; // %
  al2O3?: number; // %
  caO?: number; // %
  moisture?: number; // %
  keterangan?: string;
  statusSpec: 'In Spec' | 'Out of Spec';
}

export interface BargingItem {
  id: string;
  tanggal: string;
  tb: string; // Tugboat
  bg: string; // Barge
  jumlahRitase: number;
  rencanaTonase: number;
  tonaseAktual: number;
  tujuan: string;
  pembeli: string;
  ket?: string;
  noDo?: string;
  noKontrak?: string;
  noShipment?: string;
  etaEtd?: string;
  surveyor?: string;
  draftTonaseAkhir?: number;
  moisture?: number;
  pencapaian?: number; // %
}

export interface HmAlatItem {
  id: string;
  tanggal: string;
  namaOperator: string;
  unitId: string;
  hmAwal: number;
  hmAkhir: number;
  hmOperasi: number;
  keterangan?: string;
  warning?: string;
}

export interface ProduktivitasItem {
  id: string;
  tanggal: string;
  namaOperator: string;
  unitId: string;
  mulai: string; // HH:mm
  selesai: string; // HH:mm
  lokasi: string;
  aktivitas: 'Loading' | 'Hauling' | 'Digging' | 'Dumping' | 'Spreading';
  material: string;
  cycleTime: number; // minutes
  ritase: number;
  tonase: number;
  delay: number; // minutes
  keterangan?: string;
  produktivitasTonPerJam: number;
}

export interface HujanItem {
  id: string;
  tanggal: string;
  mulai: string; // HH:mm
  selesai: string; // HH:mm
  durasiMenit: number;
  durasiLabel: string; // e.g. "2 jam 30 m"
  intensitas: 'Hujan ringan' | 'Hujan sedang' | 'Hujan lebat';
  lokasi: string;
  kondisiJalan: 'Kering' | 'Licin' | 'Kritis / Ambles';
  kondisiPit: 'Aman' | 'Genangan Ringan' | 'Banjir / Stop Operasi';
  jamHilang: number;
  tonaseHilang: number;
  keterangan: string;
}

export interface FuelTransactionItem {
  id: string;
  tanggal: string;
  unitId: string;
  status: 'Masuk' | 'Keluar';
  liter: number;
  distributor: string;
  noDo?: string;
  noSlip?: string;
  unitHm?: number;
  operator?: string;
  hargaPerLiter: number;
  totalBiaya: number;
  keterangan?: string;
}

export interface SewaUnitItem {
  id: string;
  tanggal: string;
  unitId: string;
  tanggalBayar: string;
  vendor: string;
  nilaiSewa: number;
  periodeSewa: string;
  statusPembayaran: 'Lunas' | 'Jatuh Tempo' | 'Terlambat';
  keterangan?: string;
}

export interface MaintenanceItem {
  id: string;
  tanggal: string;
  unitId: string;
  jenis: 'Breakdown Unscheduled' | 'Periodic Service' | 'Backlog Repair' | 'Inspection';
  jamMulai: string;
  jamSelesai: string;
  downtimeJam: number;
  komponen: string;
  tindakan: string;
  mekanik: string;
  status: 'Open' | 'In Progress' | 'Closed';
}

export interface StockpileItem {
  id: string;
  namaDome: string;
  jenisMaterial: string;
  kadarRataNi: number;
  kadarFe: number;
  tonaseAwal: number;
  tonaseMasuk: number;
  tonaseKeluar: number;
  tonaseAkhir: number;
  kapasitasMaks: number;
  status: 'Aktif Pengisian' | 'Siap Barging' | 'Karantina QC';
}

export interface RkabConfig {
  tahun: number;
  targetProduksiTahunan: number;
  targetBulanan: number;
  targetHarian: number;
  targetPA: number;
  targetUA: number;
  jamKerja: number;
  targetPenjualan: number;
}

export interface MasterUnit {
  id: string;
  unitId: string;
  unitJenis: 'Excavator' | 'Dump Truck' | 'Bulldozer' | 'Motor Grader' | 'Wheel Loader' | 'Water Truck';
  merkModel: string;
  kapasitas: string;
  vendor: string;
  status: 'Beroperasi' | 'Maintenance' | 'Breakdown' | 'Standby';
}

export interface MasterOperator {
  id: string;
  nik: string;
  nama: string;
  jabatan: string;
  unitKompetensi: string;
  status: 'Aktif' | 'Cuti' | 'Off';
}

export interface MasterPit {
  id: string;
  kodePit: string;
  namaPit: string;
  daerah: string;
  status: 'Operasi Aktif' | 'Reklamasi' | 'Cadangan';
}

export interface MasterMaterial {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string;
  targetNi?: string;
}

export interface MasterBuyer {
  id: string;
  nama: string;
  negara: string;
  tujuan: string;
  produk: string;
  specNiMin: number;
}

export interface MasterVendor {
  id: string;
  nama: string;
  kategori: 'Fuel' | 'Unit Sewa' | 'Jasa Hauling' | 'Surveyor' | 'Laboratorium' | 'Kontraktor';
  kontak: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface MiningAlert {
  id: string;
  type: 'danger' | 'warning' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
  category: 'Produksi' | 'Fuel' | 'QC' | 'Sewa' | 'HM' | 'Barging' | 'Alat';
}

export interface DashboardFilter {
  startDate: string;
  endDate: string;
  pitFilter: string;
  shiftFilter: string;
}
