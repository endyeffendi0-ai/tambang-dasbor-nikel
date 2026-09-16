import {
  ProduksiOreItem,
  AnalisaLabItem,
  BargingItem,
  HmAlatItem,
  ProduktivitasItem,
  HujanItem,
  FuelTransactionItem,
  SewaUnitItem,
  MaintenanceItem,
  StockpileItem,
  RkabConfig,
  MasterUnit,
  MasterOperator,
  MasterPit,
  MasterMaterial,
  MasterBuyer,
  MasterVendor,
  MiningAlert
} from '../types/mining';

export const INITIAL_RKAB: RkabConfig = {
  tahun: 2025,
  targetProduksiTahunan: 12000000,
  targetBulanan: 1000000,
  targetHarian: 33333,
  targetPA: 92.0,
  targetUA: 80.0,
  jamKerja: 20,
  targetPenjualan: 900000
};

export const INITIAL_PRODUKSI_ORE: ProduksiOreItem[] = [
  { id: 'PO-001', tanggal: '2025-04-01', shift: 'Shift 1', lokasiPit: 'PIT 1', material: 'Ore', tonase: 14500, frontIdArea: 'Front Alpha-1', catatan: 'Blasting lancar, digging cepat' },
  { id: 'PO-002', tanggal: '2025-04-01', shift: 'Shift 2', lokasiPit: 'PIT 2', material: 'Ore', tonase: 12800, frontIdArea: 'Front Beta-2', catatan: 'Kondisi kering' },
  { id: 'PO-003', tanggal: '2025-04-02', shift: 'Shift 1', lokasiPit: 'PIT 1', material: 'Ore', tonase: 15200, frontIdArea: 'Front Alpha-2', catatan: 'High grade zone' },
  { id: 'PO-004', tanggal: '2025-04-03', shift: 'Shift 2', lokasiPit: 'PIT 3', material: 'Low Grade', tonase: 9800, frontIdArea: 'Front Gamma-1', catatan: 'Stockpile blending' },
  { id: 'PO-005', tanggal: '2025-04-05', shift: 'Shift 1', lokasiPit: 'PIT 2', material: 'Ore', tonase: 11200, frontIdArea: 'Front Beta-1', catatan: 'Hujan ringan 2 jam' },
  { id: 'PO-006', tanggal: '2025-04-08', shift: 'Shift 1', lokasiPit: 'PIT 4', material: 'Ore', tonase: 13900, frontIdArea: 'Front Delta-1', catatan: 'Operasi normal' },
  { id: 'PO-007', tanggal: '2025-04-12', shift: 'Shift 2', lokasiPit: 'PIT 1', material: 'Ore', tonase: 16400, frontIdArea: 'Front Alpha-3', catatan: 'Over-target' },
  { id: 'PO-008', tanggal: '2025-04-15', shift: 'Shift 1', lokasiPit: 'PIT 5', material: 'Ore', tonase: 10500, frontIdArea: 'Front Epsilon-1', catatan: 'Hauling road licin' },
  { id: 'PO-009', tanggal: '2025-04-20', shift: 'Shift 1', lokasiPit: 'PIT 1', material: 'Waste', tonase: 8200, frontIdArea: 'Front Alpha-Waste', catatan: 'Stripping OB' },
  { id: 'PO-010', tanggal: '2025-04-25', shift: 'Shift 2', lokasiPit: 'PIT 2', material: 'Ore', tonase: 17100, frontIdArea: 'Front Beta-3', catatan: 'Fleet optimal' },
  { id: 'PO-011', tanggal: '2025-04-28', shift: 'Shift 1', lokasiPit: 'PIT 3', material: 'Ore', tonase: 14800, frontIdArea: 'Front Gamma-2', catatan: 'Blending grade' },
  { id: 'PO-012', tanggal: '2025-04-30', shift: 'Shift 2', lokasiPit: 'PIT 1', material: 'Ore', tonase: 18200, frontIdArea: 'Front Alpha-Final', catatan: 'Closing bulan April' }
];

export const INITIAL_ANALISA_LAB: AnalisaLabItem[] = [
  { id: 'LAB-001', tanggalSample: '2025-04-01', tanggalAnalisa: '2025-04-01', lokasiPit: 'PIT 1', material: 'Ore High Grade', noSample: 'SPL-P1-0401', ni: 1.78, fe: 17.5, co: 0.07, cr: 0.72, mgO: 2.30, siO2: 38.5, al2O3: 3.8, caO: 1.1, moisture: 31.5, statusSpec: 'In Spec', keterangan: 'Kualitas sangat baik' },
  { id: 'LAB-002', tanggalSample: '2025-04-03', tanggalAnalisa: '2025-04-03', lokasiPit: 'PIT 2', material: 'Ore Medium Grade', noSample: 'SPL-P2-0403', ni: 1.55, fe: 18.2, co: 0.08, cr: 0.76, mgO: 2.45, siO2: 39.1, al2O3: 4.1, caO: 1.2, moisture: 32.8, statusSpec: 'In Spec', keterangan: 'Sesuai spesifikasi buyer' },
  { id: 'LAB-003', tanggalSample: '2025-04-07', tanggalAnalisa: '2025-04-07', lokasiPit: 'PIT 3', material: 'Low Grade', noSample: 'SPL-P3-0407', ni: 1.20, fe: 21.3, co: 0.12, cr: 0.95, mgO: 3.10, siO2: 41.2, al2O3: 4.9, caO: 1.5, moisture: 34.2, statusSpec: 'Out of Spec', keterangan: 'Ni di bawah 1.40%, alihkan ke dome blending' },
  { id: 'LAB-004', tanggalSample: '2025-04-12', tanggalAnalisa: '2025-04-12', lokasiPit: 'PIT 1', material: 'Ore High Grade', noSample: 'SPL-P1-0412', ni: 1.88, fe: 16.8, co: 0.06, cr: 0.68, mgO: 2.10, siO2: 37.8, al2O3: 3.5, caO: 0.9, moisture: 30.1, statusSpec: 'In Spec', keterangan: 'Siap barge ekspor' },
  { id: 'LAB-005', tanggalSample: '2025-04-18', tanggalAnalisa: '2025-04-18', lokasiPit: 'PIT 4', material: 'Ore Medium Grade', noSample: 'SPL-P4-0418', ni: 1.62, fe: 19.1, co: 0.09, cr: 0.81, mgO: 2.60, siO2: 39.8, al2O3: 4.2, caO: 1.3, moisture: 33.5, statusSpec: 'In Spec', keterangan: 'Normal' },
  { id: 'LAB-006', tanggalSample: '2025-04-24', tanggalAnalisa: '2025-04-24', lokasiPit: 'PIT 2', material: 'Ore High Grade', noSample: 'SPL-P2-0424', ni: 1.95, fe: 15.5, co: 0.05, cr: 0.62, mgO: 1.95, siO2: 36.9, al2O3: 3.2, caO: 0.8, moisture: 29.8, statusSpec: 'In Spec', keterangan: 'High grade premium' },
  { id: 'LAB-007', tanggalSample: '2025-04-29', tanggalAnalisa: '2025-04-29', lokasiPit: 'PIT 5', material: 'Ore Medium Grade', noSample: 'SPL-P5-0429', ni: 1.52, fe: 18.9, co: 0.08, cr: 0.77, mgO: 2.50, siO2: 40.2, al2O3: 4.4, caO: 1.2, moisture: 33.0, statusSpec: 'In Spec', keterangan: 'Sesuai spesifikasi' }
];

export const INITIAL_BARGING: BargingItem[] = [
  { id: 'BRG-001', tanggal: '2025-04-04', tb: 'TB Megamas 08', bg: 'BG Samudra 3001', jumlahRitase: 340, rencanaTonase: 250000, tonaseAktual: 230000, tujuan: 'China', pembeli: 'PT Tsingshan Steel', noDo: 'DO-2025-041', noKontrak: 'KTR-NKL-088', noShipment: 'SHP-001-CN', etaEtd: '04 Apr / 07 Apr', surveyor: 'Carsurin', draftTonaseAkhir: 230120, moisture: 32.1, pencapaian: 92.0, ket: 'Kapal berlayar tepat waktu' },
  { id: 'BRG-002', tanggal: '2025-04-11', tb: 'TB Pasifik Jaya', bg: 'BG Maritim 3302', jumlahRitase: 210, rencanaTonase: 150000, tonaseAktual: 135000, tujuan: 'Jepang', pembeli: 'Nippon Nickel Corp', noDo: 'DO-2025-042', noKontrak: 'KTR-JPN-014', noShipment: 'SHP-002-JP', etaEtd: '11 Apr / 14 Apr', surveyor: 'Sucofindo', draftTonaseAkhir: 135050, moisture: 31.8, pencapaian: 90.0, ket: 'Kualitas kadar Ni 1.82%' },
  { id: 'BRG-003', tanggal: '2025-04-19', tb: 'TB Berkah Laut', bg: 'BG Trans Ocean 300', jumlahRitase: 160, rencanaTonase: 100000, tonaseAktual: 95000, tujuan: 'Korea', pembeli: 'POSCO Steel Korea', noDo: 'DO-2025-043', noKontrak: 'KTR-KOR-029', noShipment: 'SHP-003-KR', etaEtd: '19 Apr / 22 Apr', surveyor: 'Geoservices', draftTonaseAkhir: 95200, moisture: 32.4, pencapaian: 95.0, ket: 'Draft final disetujui surveyor' },
  { id: 'BRG-004', tanggal: '2025-04-26', tb: 'TB Bintang Samudera', bg: 'BG Andalas 270', jumlahRitase: 110, rencanaTonase: 100000, tonaseAktual: 60000, tujuan: 'Lainnya', pembeli: 'PT Smelter Konawe', noDo: 'DO-2025-044', noKontrak: 'KTR-DOM-005', noShipment: 'SHP-004-DM', etaEtd: '26 Apr / 28 Apr', surveyor: 'Carsurin', draftTonaseAkhir: 60100, moisture: 33.0, pencapaian: 60.0, ket: 'Sebagian ditunda kendala cuaca' }
];

export const INITIAL_HM_ALAT: HmAlatItem[] = [
  { id: 'HM-001', tanggal: '2025-04-28', namaOperator: 'Budi Santoso', unitId: 'EX001', hmAwal: 12450.5, hmAkhir: 12468.5, hmOperasi: 18.0, keterangan: 'Loading Ore PIT 1' },
  { id: 'HM-002', tanggal: '2025-04-28', namaOperator: 'Andi Saputra', unitId: 'EX002', hmAwal: 8930.0, hmAkhir: 8947.5, hmOperasi: 17.5, keterangan: 'Loading OB PIT 2' },
  { id: 'HM-003', tanggal: '2025-04-28', namaOperator: 'Dedi Kurniawan', unitId: 'DT001', hmAwal: 15400.0, hmAkhir: 15418.0, hmOperasi: 18.0, keterangan: 'Hauling PIT 1 to ETO' },
  { id: 'HM-004', tanggal: '2025-04-28', namaOperator: 'Eko Prasetyo', unitId: 'DT002', hmAwal: 14120.0, hmAkhir: 14138.5, hmOperasi: 18.5, keterangan: 'Hauling PIT 2 to Jetty' },
  { id: 'HM-005', tanggal: '2025-04-28', namaOperator: 'Rian Hidayat', unitId: 'DT005', hmAwal: 9800.0, hmAkhir: 9814.0, hmOperasi: 14.0, keterangan: 'Fuel ratio agak boros' },
  { id: 'HM-006', tanggal: '2025-04-28', namaOperator: 'Agus Salim', unitId: 'GD001', hmAwal: 6200.0, hmAkhir: 6215.0, hmOperasi: 15.0, keterangan: 'Grading Hauling Road' },
  { id: 'HM-007', tanggal: '2025-04-28', namaOperator: 'Hendra Wijaya', unitId: 'EX003', hmAwal: 5120.0, hmAkhir: 5122.0, hmOperasi: 2.0, keterangan: 'Breakdown hydraulic hose', warning: 'Breakdown 16 jam' }
];

export const INITIAL_PRODUKTIVITAS: ProduktivitasItem[] = [
  { id: 'PRD-001', tanggal: '2025-04-28', namaOperator: 'Budi Santoso', unitId: 'EX001', mulai: '07:00', selesai: '17:00', lokasi: 'PIT 1 Front Alpha', aktivitas: 'Loading', material: 'Ore', cycleTime: 2.4, ritase: 140, tonase: 4200, delay: 30, keterangan: 'Kinerja prima', produktivitasTonPerJam: 442 },
  { id: 'PRD-002', tanggal: '2025-04-28', namaOperator: 'Andi Saputra', unitId: 'EX002', mulai: '07:00', selesai: '17:00', lokasi: 'PIT 2 Front Beta', aktivitas: 'Loading', material: 'OB', cycleTime: 2.8, ritase: 120, tonase: 3600, delay: 45, keterangan: 'Digging material keras', produktivitasTonPerJam: 389 },
  { id: 'PRD-003', tanggal: '2025-04-28', namaOperator: 'Dedi Kurniawan', unitId: 'DT001', mulai: '07:00', selesai: '17:00', lokasi: 'PIT 1 to Jetty', aktivitas: 'Hauling', material: 'Ore', cycleTime: 28.0, ritase: 18, tonase: 540, delay: 20, keterangan: 'Jalan kering kecepatan 35km/h', produktivitasTonPerJam: 56.8 },
  { id: 'PRD-004', tanggal: '2025-04-28', namaOperator: 'Eko Prasetyo', unitId: 'DT002', mulai: '07:00', selesai: '17:00', lokasi: 'PIT 2 to ETO', aktivitas: 'Hauling', material: 'Ore', cycleTime: 22.0, ritase: 22, tonase: 660, delay: 15, keterangan: 'Optimal', produktivitasTonPerJam: 68.4 }
];

export const INITIAL_HUJAN: HujanItem[] = [
  { id: 'HJN-001', tanggal: '05 Apr 2025', mulai: '08:15', selesai: '10:45', durasiMenit: 150, durasiLabel: '2 jam 30 m', intensitas: 'Hujan ringan', lokasi: 'Area Tambang & PIT 1-2', kondisiJalan: 'Licin', kondisiPit: 'Genangan Ringan', jamHilang: 2.5, tonaseHilang: 1200, keterangan: 'Hujan ringan' },
  { id: 'HJN-002', tanggal: '12 Apr 2025', mulai: '14:20', selesai: '17:10', durasiMenit: 170, durasiLabel: '2 jam 50 m', intensitas: 'Hujan sedang', lokasi: 'Seluruh Konsesi Tambang', kondisiJalan: 'Kritis / Ambles', kondisiPit: 'Genangan Ringan', jamHilang: 3.2, tonaseHilang: 2400, keterangan: 'Hujan sedang' },
  { id: 'HJN-003', tanggal: '18 Apr 2025', mulai: '09:00', selesai: '12:30', durasiMenit: 210, durasiLabel: '3 jam 30 m', intensitas: 'Hujan lebat', lokasi: 'PIT 3, PIT 4 & Jetty', kondisiJalan: 'Kritis / Ambles', kondisiPit: 'Banjir / Stop Operasi', jamHilang: 4.5, tonaseHilang: 4800, keterangan: 'Hujan lebat' },
  { id: 'HJN-004', tanggal: '24 Apr 2025', mulai: '16:05', selesai: '18:20', durasiMenit: 135, durasiLabel: '2 jam 15 m', intensitas: 'Hujan ringan', lokasi: 'PIT 5 & Stockpile EFO', kondisiJalan: 'Licin', kondisiPit: 'Aman', jamHilang: 1.8, tonaseHilang: 950, keterangan: 'Hujan ringan' }
];

export const INITIAL_FUEL: FuelTransactionItem[] = [
  { id: 'FL-001', tanggal: '01 Apr', unitId: 'STORAGE-T1', status: 'Masuk', liter: 10000, distributor: 'PT. Energi Nusantara', noDo: 'DO-EN-991', noSlip: 'SLIP-01', hargaPerLiter: 16500, totalBiaya: 165000000, keterangan: 'Pengisian Tangki Induk 01' },
  { id: 'FL-002', tanggal: '03 Apr', unitId: 'FLEET-A', status: 'Keluar', liter: 5000, distributor: '-', noSlip: 'SLIP-02', unitHm: 12400, operator: 'Tim Fuel Truck 1', hargaPerLiter: 16500, totalBiaya: 82500000, keterangan: 'Dispense ke Excavator & DT' },
  { id: 'FL-003', tanggal: '06 Apr', unitId: 'FLEET-B', status: 'Keluar', liter: 8000, distributor: '-', noSlip: 'SLIP-03', unitHm: 15380, operator: 'Tim Fuel Truck 2', hargaPerLiter: 16500, totalBiaya: 132000000, keterangan: 'Dispense Shift Siang & Malam' },
  { id: 'FL-004', tanggal: '10 Apr', unitId: 'STORAGE-T1', status: 'Masuk', liter: 15000, distributor: 'PT. Energi Nusantara', noDo: 'DO-EN-998', noSlip: 'SLIP-04', hargaPerLiter: 16500, totalBiaya: 247500000, keterangan: 'Penerimaan Solar B35' },
  { id: 'FL-005', tanggal: '14 Apr', unitId: 'FLEET-ALL', status: 'Keluar', liter: 7500, distributor: '-', noSlip: 'SLIP-05', hargaPerLiter: 16500, totalBiaya: 123750000, keterangan: 'Distribusi reguler seluruh unit' },
  { id: 'FL-006', tanggal: '18 Apr', unitId: 'STORAGE-T2', status: 'Masuk', liter: 25000, distributor: 'PT. Energi Nusantara', noDo: 'DO-EN-1012', noSlip: 'SLIP-06', hargaPerLiter: 16500, totalBiaya: 412500000, keterangan: 'Stok Jetty & Pit' },
  { id: 'FL-007', tanggal: '22 Apr', unitId: 'FLEET-ALL', status: 'Keluar', liter: 14000, distributor: '-', noSlip: 'SLIP-07', hargaPerLiter: 16500, totalBiaya: 231000000, keterangan: 'Distribusi pekan ke-3' },
  { id: 'FL-008', tanggal: '28 Apr', unitId: 'FLEET-ALL', status: 'Keluar', liter: 13000, distributor: '-', noSlip: 'SLIP-08', hargaPerLiter: 16500, totalBiaya: 214500000, keterangan: 'Distribusi pekan ke-4' }
];

export const INITIAL_SEWA_UNIT: SewaUnitItem[] = [
  { id: 'SW-001', tanggal: '2025-04-01', unitId: 'TR001', tanggalBayar: '05 Apr', vendor: 'CV. Rental Jaya', nilaiSewa: 45000000, periodeSewa: 'April 2025', statusPembayaran: 'Lunas', keterangan: 'Dump Truck 30T' },
  { id: 'SW-002', tanggal: '2025-04-01', unitId: 'EX003', tanggalBayar: '12 Apr', vendor: 'PT. Alat Berat', nilaiSewa: 95000000, periodeSewa: 'April 2025', statusPembayaran: 'Lunas', keterangan: 'Excavator Cat 349D' },
  { id: 'SW-003', tanggal: '2025-04-01', unitId: 'DT005', tanggalBayar: '18 Apr', vendor: 'PT. Mitra Rental', nilaiSewa: 50000000, periodeSewa: 'April 2025', statusPembayaran: 'Jatuh Tempo', keterangan: 'Dump Truck Volvo FMX' },
  { id: 'SW-004', tanggal: '2025-04-01', unitId: 'GD002', tanggalBayar: '25 Apr', vendor: 'PT. Prima Sewa', nilaiSewa: 65000000, periodeSewa: 'April 2025', statusPembayaran: 'Jatuh Tempo', keterangan: 'Motor Grader Komatsu' },
  { id: 'SW-005', tanggal: '2025-04-01', unitId: 'WL001', tanggalBayar: '28 Mar', vendor: 'PT. Sarana Tambang', nilaiSewa: 55000000, periodeSewa: 'Maret 2025', statusPembayaran: 'Terlambat', keterangan: 'Invoice tertunda verifikasi HM' }
];

export const INITIAL_MAINTENANCE: MaintenanceItem[] = [
  { id: 'MNT-001', tanggal: '2025-04-28', unitId: 'EX003', jenis: 'Breakdown Unscheduled', jamMulai: '08:00', jamSelesai: '-', downtimeJam: 16.0, komponen: 'Hydraulic Main Pump', tindakan: 'Penggantian seal & check valve', mekanik: 'Team A (Supardi)', status: 'In Progress' },
  { id: 'MNT-002', tanggal: '2025-04-27', unitId: 'DT004', jenis: 'Periodic Service', jamMulai: '13:00', jamSelesai: '18:00', downtimeJam: 5.0, komponen: 'Engine Oil & Filter 500 HM', tindakan: 'PM 500 HM selesai', mekanik: 'Mekanik Workshop', status: 'Closed' },
  { id: 'MNT-003', tanggal: '2025-04-26', unitId: 'DZ002', jenis: 'Backlog Repair', jamMulai: '09:00', jamSelesai: '15:30', downtimeJam: 6.5, komponen: 'Track Link & Sprocket', tindakan: 'Tensioning track adjuster', mekanik: 'Team B (Joko)', status: 'Closed' }
];

export const INITIAL_STOCKPILE: StockpileItem[] = [
  { id: 'STK-001', namaDome: 'Dome ETO 01 (High Grade)', jenisMaterial: 'Ore High Grade', kadarRataNi: 1.85, kadarFe: 16.5, tonaseAwal: 85000, tonaseMasuk: 45000, tonaseKeluar: 35000, tonaseAkhir: 95000, kapasitasMaks: 120000, status: 'Siap Barging' },
  { id: 'STK-002', namaDome: 'Dome ETO 02 (Medium Grade)', jenisMaterial: 'Ore Medium Grade', kadarRataNi: 1.58, kadarFe: 18.2, tonaseAwal: 110000, tonaseMasuk: 65000, tonaseKeluar: 45000, tonaseAkhir: 130000, kapasitasMaks: 150000, status: 'Aktif Pengisian' },
  { id: 'STK-003', namaDome: 'Dome EFO 01 (Low Grade)', jenisMaterial: 'Low Grade Ore', kadarRataNi: 1.25, kadarFe: 21.0, tonaseAwal: 60000, tonaseMasuk: 25000, tonaseKeluar: 5000, tonaseAkhir: 80000, kapasitasMaks: 100000, status: 'Karantina QC' },
  { id: 'STK-004', namaDome: 'Dome Jetty Transit', jenisMaterial: 'Ore High Grade Blended', kadarRataNi: 1.72, kadarFe: 17.8, tonaseAwal: 40000, tonaseMasuk: 35000, tonaseKeluar: 30000, tonaseAkhir: 45000, kapasitasMaks: 60000, status: 'Siap Barging' }
];

export const INITIAL_MASTER_UNITS: MasterUnit[] = [
  { id: 'U-001', unitId: 'EX001', unitJenis: 'Excavator', merkModel: 'Komatsu PC400LC-8', kapasitas: '40 Ton / 2.8 m³', vendor: 'Milik Sendiri', status: 'Beroperasi' },
  { id: 'U-002', unitId: 'EX002', unitJenis: 'Excavator', merkModel: 'CAT 349D', kapasitas: '50 Ton / 3.2 m³', vendor: 'Milik Sendiri', status: 'Beroperasi' },
  { id: 'U-003', unitId: 'EX003', unitJenis: 'Excavator', merkModel: 'Hitachi ZX470', kapasitas: '47 Ton / 3.0 m³', vendor: 'PT. Alat Berat', status: 'Breakdown' },
  { id: 'U-004', unitId: 'DT001', unitJenis: 'Dump Truck', merkModel: 'Scania P410 8x4', kapasitas: '30 Ton', vendor: 'Milik Sendiri', status: 'Beroperasi' },
  { id: 'U-005', unitId: 'DT002', unitJenis: 'Dump Truck', merkModel: 'Mercedes-Benz Axor 3340', kapasitas: '30 Ton', vendor: 'Milik Sendiri', status: 'Beroperasi' },
  { id: 'U-006', unitId: 'DT003', unitJenis: 'Dump Truck', merkModel: 'Volvo FMX 440', kapasitas: '35 Ton', vendor: 'Milik Sendiri', status: 'Beroperasi' },
  { id: 'U-007', unitId: 'DT004', unitJenis: 'Dump Truck', merkModel: 'Hino 700 Series', kapasitas: '25 Ton', vendor: 'Milik Sendiri', status: 'Maintenance' },
  { id: 'U-008', unitId: 'DT005', unitJenis: 'Dump Truck', merkModel: 'Volvo FMX 400', kapasitas: '30 Ton', vendor: 'PT. Mitra Rental', status: 'Beroperasi' },
  { id: 'U-009', unitId: 'GD001', unitJenis: 'Motor Grader', merkModel: 'CAT 140K', kapasitas: '14 Ft Blade', vendor: 'Milik Sendiri', status: 'Beroperasi' },
  { id: 'U-010', unitId: 'GD002', unitJenis: 'Motor Grader', merkModel: 'Komatsu GD705', kapasitas: '14 Ft Blade', vendor: 'PT. Prima Sewa', status: 'Beroperasi' },
  { id: 'U-011', unitId: 'DZ001', unitJenis: 'Bulldozer', merkModel: 'Komatsu D85ESS-2', kapasitas: 'Blade 4.5 m³', vendor: 'Milik Sendiri', status: 'Beroperasi' },
  { id: 'U-012', unitId: 'DZ002', unitJenis: 'Bulldozer', merkModel: 'CAT D8R', kapasitas: 'Blade 5.0 m³', vendor: 'Milik Sendiri', status: 'Beroperasi' },
  { id: 'U-013', unitId: 'WL001', unitJenis: 'Wheel Loader', merkModel: 'Komatsu WA500', kapasitas: '5.0 m³ Bucket', vendor: 'PT. Sarana Tambang', status: 'Beroperasi' },
  { id: 'U-014', unitId: 'WT001', unitJenis: 'Water Truck', merkModel: 'Hino 500 20KL', kapasitas: '20.000 Liter', vendor: 'Milik Sendiri', status: 'Beroperasi' }
];

export const INITIAL_OPERATORS: MasterOperator[] = [
  { id: 'OP-001', nik: 'NKL-2021-01', nama: 'Budi Santoso', jabatan: 'Operator Excavator Senior', unitKompetensi: 'PC400, PC800, CAT349', status: 'Aktif' },
  { id: 'OP-002', nik: 'NKL-2021-02', nama: 'Andi Saputra', jabatan: 'Operator Excavator', unitKompetensi: 'PC400, CAT349', status: 'Aktif' },
  { id: 'OP-003', nik: 'NKL-2022-03', nama: 'Dedi Kurniawan', jabatan: 'Driver Hauler DT', unitKompetensi: 'Scania, Volvo FMX', status: 'Aktif' },
  { id: 'OP-004', nik: 'NKL-2022-04', nama: 'Eko Prasetyo', jabatan: 'Driver Hauler DT', unitKompetensi: 'Axor, Hino 700', status: 'Aktif' },
  { id: 'OP-005', nik: 'NKL-2023-05', nama: 'Rian Hidayat', jabatan: 'Driver DT Rental', unitKompetensi: 'Volvo FMX 400', status: 'Aktif' },
  { id: 'OP-006', nik: 'NKL-2020-06', nama: 'Agus Salim', jabatan: 'Operator Grader', unitKompetensi: 'CAT 140K, GD705', status: 'Aktif' },
  { id: 'OP-007', nik: 'NKL-2021-07', nama: 'Hendra Wijaya', jabatan: 'Operator Excavator', unitKompetensi: 'Hitachi ZX470', status: 'Aktif' },
  { id: 'OP-008', nik: 'NKL-2022-08', nama: 'Joko Susanto', jabatan: 'Mekanik Alat Berat', unitKompetensi: 'Engine & Hydraulic Specialist', status: 'Aktif' }
];

export const INITIAL_PITS: MasterPit[] = [
  { id: 'PIT-001', kodePit: 'PIT 1', namaPit: 'PIT 1 Alpha Rim', daerah: 'Blok Barat (Elevasi +180)', status: 'Operasi Aktif' },
  { id: 'PIT-002', kodePit: 'PIT 2', namaPit: 'PIT 2 Beta Crest', daerah: 'Blok Tengah (Elevasi +220)', status: 'Operasi Aktif' },
  { id: 'PIT-003', kodePit: 'PIT 3', namaPit: 'PIT 3 Gamma Valley', daerah: 'Blok Timur (Elevasi +140)', status: 'Operasi Aktif' },
  { id: 'PIT-004', kodePit: 'PIT 4', namaPit: 'PIT 4 Delta Ridge', daerah: 'Blok Selatan (Elevasi +260)', status: 'Operasi Aktif' },
  { id: 'PIT-005', kodePit: 'PIT 5', namaPit: 'PIT 5 Epsilon Peak', daerah: 'Blok Utara (Elevasi +310)', status: 'Operasi Aktif' }
];

export const INITIAL_MATERIALS: MasterMaterial[] = [
  { id: 'MAT-001', kode: 'ORE-HG', nama: 'Ore (High Grade)', deskripsi: 'Nikel Saprolit kadar Ni >= 1.70%', targetNi: '1.70% - 2.10%' },
  { id: 'MAT-002', kode: 'ORE-MG', nama: 'Ore (Medium Grade)', deskripsi: 'Nikel Saprolit kadar Ni 1.50% - 1.69%', targetNi: '1.50% - 1.69%' },
  { id: 'MAT-003', kode: 'ORE-LG', nama: 'Low Grade Ore (Limonit)', deskripsi: 'Nikel Limonit kadar Ni 1.20% - 1.49% untuk HPAL', targetNi: '1.20% - 1.49%' },
  { id: 'MAT-004', kode: 'MAT-OB', nama: 'Overburden (OB)', deskripsi: 'Lapisan penutup batuan dasar', targetNi: '< 0.80%' },
  { id: 'MAT-005', kode: 'MAT-TS', nama: 'Top Soil', deskripsi: 'Lapisan tanah pucuk untuk reklamasi revegetasi', targetNi: '-' },
  { id: 'MAT-006', kode: 'MAT-WST', nama: 'Waste', deskripsi: 'Batuan buangan steril / barren rock', targetNi: '-' }
];

export const INITIAL_BUYERS: MasterBuyer[] = [
  { id: 'BYR-001', nama: 'PT Tsingshan Steel', negara: 'China', tujuan: 'Pelabuhan Ningbo / Morowali IMIP', produk: 'Nickel Saprolite Ore 1.80%', specNiMin: 1.80 },
  { id: 'BYR-002', nama: 'Nippon Nickel Corp', negara: 'Jepang', tujuan: 'Pelabuhan Chiba / Niihama', produk: 'Nickel Ore Premium Saprolite', specNiMin: 1.85 },
  { id: 'BYR-003', nama: 'POSCO Steel Korea', negara: 'Korea', tujuan: 'Pelabuhan Gwangyang', produk: 'Saprolite Ore Direct Smelting', specNiMin: 1.75 },
  { id: 'BYR-004', nama: 'PT Smelter Konawe', negara: 'Domestik Indonesia', tujuan: 'Kawasan Industri Konawe (VDNI)', produk: 'Nickel Ore RKEF Feed', specNiMin: 1.60 }
];

export const INITIAL_VENDORS: MasterVendor[] = [
  { id: 'VND-001', nama: 'PT. Energi Nusantara', kategori: 'Fuel', kontak: 'fuel-sales@energinusantara.co.id | 021-8899221', status: 'Aktif' },
  { id: 'VND-002', nama: 'PT. Alat Berat Makmur', kategori: 'Unit Sewa', kontak: 'rental@alatberat.com | 0812-9988-1122', status: 'Aktif' },
  { id: 'VND-003', nama: 'PT. Mitra Rental Jaya', kategori: 'Unit Sewa', kontak: 'fleet@mitrarental.id | 0811-2233-4455', status: 'Aktif' },
  { id: 'VND-004', nama: 'PT Carsurin Mining Services', kategori: 'Surveyor', kontak: 'marine.ops@carsurin.com | 021-5544332', status: 'Aktif' },
  { id: 'VND-005', nama: 'PT Geoservices Nickel Lab', kategori: 'Laboratorium', kontak: 'lab-assay@geoservices.com', status: 'Aktif' },
  { id: 'VND-006', nama: 'PT Samudra Trans Logistik', kategori: 'Jasa Hauling', kontak: 'ops@samudratrans.co.id', status: 'Aktif' }
];

export const INITIAL_ALERTS: MiningAlert[] = [
  { id: 'ALT-001', type: 'danger', title: 'Produksi hari ini di bawah target (-12%)', message: 'Realisasi shift siang mencapai 28.500 ton vs target 32.500 ton akibat kendala front loading.', time: '08:30', category: 'Produksi' },
  { id: 'ALT-002', type: 'warning', title: 'Fuel ratio unit DT005 tinggi (2,45 L/ton)', message: 'Konsumsi solar unit DT005 melebihi batas toleransi efisiensi armada (standar 1,85 L/ton).', time: '09:15', category: 'Fuel' },
  { id: 'ALT-003', type: 'warning', title: 'Kadar Ni PIT 3 di bawah standar (1,20%)', message: 'Hasil analisa laboratorium sampel SPL-P3-0407 menunjukkan kadar nikel 1,20% (minimum 1,40%).', time: '10:20', category: 'QC' },
  { id: 'ALT-004', type: 'warning', title: 'Sewa unit EX003 jatuh tempo (2 hari lagi)', message: 'Kewajiban sewa periode April senilai Rp 95.000.000 kepada PT. Alat Berat jatuh tempo 12 April.', time: '11:00', category: 'Sewa' },
  { id: 'ALT-005', type: 'success', title: 'Target RKAB bulan ini tercapai 87,5%', message: 'Total produksi April mencapai 875.000 ton dari target 1.000.000 ton (on-track sesuai kalender kerja).', time: '12:45', category: 'Produksi' }
];

export const MOCK_DAILY_TREND = [
  { tgl: '1 Apr', produksi: 62000, target: 78000 },
  { tgl: '3 Apr', produksi: 75000, target: 82000 },
  { tgl: '5 Apr', produksi: 68000, target: 82000 },
  { tgl: '7 Apr', produksi: 72000, target: 83000 },
  { tgl: '9 Apr', produksi: 70000, target: 84000 },
  { tgl: '11 Apr', produksi: 69000, target: 85000 },
  { tgl: '13 Apr', produksi: 74000, target: 88000 },
  { tgl: '15 Apr', produksi: 76000, target: 87000 },
  { tgl: '17 Apr', produksi: 78000, target: 87000 },
  { tgl: '19 Apr', produksi: 71000, target: 87000 },
  { tgl: '21 Apr', produksi: 77000, target: 86000 },
  { tgl: '23 Apr', produksi: 74000, target: 86000 },
  { tgl: '25 Apr', produksi: 72000, target: 86000 },
  { tgl: '27 Apr', produksi: 81000, target: 86000 },
  { tgl: '29 Apr', produksi: 84000, target: 86000 },
  { tgl: '30 Apr', produksi: 82000, target: 86000 }
];

export const MOCK_NI_TREND = [
  { tgl: '1 Apr', rataRata: 1.55, min: 1.20, max: 1.88 },
  { tgl: '5 Apr', rataRata: 1.52, min: 1.22, max: 1.85 },
  { tgl: '10 Apr', rataRata: 1.58, min: 1.25, max: 1.92 },
  { tgl: '15 Apr', rataRata: 1.62, min: 1.28, max: 1.98 },
  { tgl: '20 Apr', rataRata: 1.60, min: 1.27, max: 1.95 },
  { tgl: '25 Apr', rataRata: 1.65, min: 1.30, max: 2.05 },
  { tgl: '30 Apr', rataRata: 1.63, min: 1.29, max: 2.00 }
];

export const MOCK_PIT_PRODUCTION = [
  { pit: 'PIT 1', tonase: 220000, color: '#3B82F6' },
  { pit: 'PIT 2', tonase: 180000, color: '#10B981' },
  { pit: 'PIT 3', tonase: 150000, color: '#F59E0B' },
  { pit: 'PIT 4', tonase: 120000, color: '#8B5CF6' },
  { pit: 'PIT 5', tonase: 90000, color: '#06B6D4' }
];

export const MOCK_MATERIAL_COMPOSITION = [
  { name: 'Ore', percentage: 68.4, color: '#10B981', tonase: 598500 },
  { name: 'Low Grade', percentage: 15.7, color: '#F59E0B', tonase: 137375 },
  { name: 'Waste', percentage: 10.8, color: '#64748B', tonase: 94500 },
  { name: 'Top Soil', percentage: 3.1, color: '#0284C7', tonase: 27125 },
  { name: 'Lainnya', percentage: 1.9, color: '#8B5CF6', tonase: 17500 }
];

export const MOCK_FUEL_RANKING = [
  { rank: 1, unitId: 'DT001', ratio: 2.45 },
  { rank: 2, unitId: 'EX001', ratio: 2.32 },
  { rank: 3, unitId: 'DT002', ratio: 2.18 },
  { rank: 4, unitId: 'EX002', ratio: 2.05 },
  { rank: 5, unitId: 'GD001', ratio: 1.96 }
];
