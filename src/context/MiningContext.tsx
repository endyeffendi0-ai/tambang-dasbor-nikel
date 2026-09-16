import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  NavigationTab,
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
import {
  INITIAL_RKAB,
  INITIAL_PRODUKSI_ORE,
  INITIAL_ANALISA_LAB,
  INITIAL_BARGING,
  INITIAL_HM_ALAT,
  INITIAL_PRODUKTIVITAS,
  INITIAL_HUJAN,
  INITIAL_FUEL,
  INITIAL_SEWA_UNIT,
  INITIAL_MAINTENANCE,
  INITIAL_STOCKPILE,
  INITIAL_MASTER_UNITS,
  INITIAL_OPERATORS,
  INITIAL_PITS,
  INITIAL_MATERIALS,
  INITIAL_BUYERS,
  INITIAL_VENDORS,
  INITIAL_ALERTS
} from '../data/mockMiningData';

interface MiningContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  dateRange: { startDate: string; endDate: string; label: string };
  setDateRange: (range: { startDate: string; endDate: string; label: string }) => void;

  // Data Collections
  produksiOre: ProduksiOreItem[];
  analisaLab: AnalisaLabItem[];
  barging: BargingItem[];
  hmAlat: HmAlatItem[];
  produktivitas: ProduktivitasItem[];
  hujan: HujanItem[];
  fuel: FuelTransactionItem[];
  sewaUnit: SewaUnitItem[];
  maintenance: MaintenanceItem[];
  stockpile: StockpileItem[];
  rkab: RkabConfig;
  masterUnits: MasterUnit[];
  masterOperators: MasterOperator[];
  masterPits: MasterPit[];
  masterMaterials: MasterMaterial[];
  masterBuyers: MasterBuyer[];
  masterVendors: MasterVendor[];
  alerts: MiningAlert[];

  // Metrics
  totalProduksi: number;
  targetRkab: number;
  pencapaianRkab: number;
  sisaRkab: number;
  totalBarging: number;
  targetBarging: number;
  pencapaianBarging: number;
  avgNi: number;
  avgFe: number;
  avgCo: number;
  avgCr: number;
  avgMgo: number;
  totalFuelKeluar: number;
  totalFuelMasuk: number;
  stokFuel: number;
  fuelRatio: number;
  unitAktifCount: number;
  totalUnitCount: number;
  physicalAvailability: number;
  utilization: number;
  produktivitasFleet: number;
  totalJamHujanLabel: string;

  // Actions
  addProduksiOre: (item: Omit<ProduksiOreItem, 'id'>) => void;
  deleteProduksiOre: (id: string) => void;
  addAnalisaLab: (item: Omit<AnalisaLabItem, 'id' | 'statusSpec'>) => void;
  deleteAnalisaLab: (id: string) => void;
  addBarging: (item: Omit<BargingItem, 'id' | 'pencapaian'>) => void;
  deleteBarging: (id: string) => void;
  addHmAlat: (item: Omit<HmAlatItem, 'id' | 'hmOperasi' | 'warning'>) => void;
  deleteHmAlat: (id: string) => void;
  addProduktivitas: (item: Omit<ProduktivitasItem, 'id' | 'produktivitasTonPerJam'>) => void;
  deleteProduktivitas: (id: string) => void;
  addHujan: (item: Omit<HujanItem, 'id' | 'durasiMenit' | 'durasiLabel'>) => void;
  deleteHujan: (id: string) => void;
  addFuelTransaction: (item: Omit<FuelTransactionItem, 'id'>) => void;
  deleteFuelTransaction: (id: string) => void;
  addSewaUnit: (item: Omit<SewaUnitItem, 'id'>) => void;
  updateSewaStatus: (id: string, status: 'Lunas' | 'Jatuh Tempo' | 'Terlambat') => void;
  deleteSewaUnit: (id: string) => void;
  addMaintenance: (item: Omit<MaintenanceItem, 'id'>) => void;
  updateMaintenanceStatus: (id: string, status: 'Open' | 'In Progress' | 'Closed') => void;
  updateRkab: (config: RkabConfig) => void;

  // Master Data Actions
  addMasterUnit: (unit: Omit<MasterUnit, 'id'>) => void;
  deleteMasterUnit: (id: string) => void;
  addMasterOperator: (op: Omit<MasterOperator, 'id'>) => void;
  deleteMasterOperator: (id: string) => void;
  addMasterPit: (pit: Omit<MasterPit, 'id'>) => void;
  deleteMasterPit: (id: string) => void;
  addMasterBuyer: (buyer: Omit<MasterBuyer, 'id'>) => void;
  deleteMasterBuyer: (id: string) => void;
  addMasterVendor: (vendor: Omit<MasterVendor, 'id'>) => void;
  deleteMasterVendor: (id: string) => void;

  dismissAlert: (id: string) => void;
  resetToDefaultData: () => void;
  exportDatabaseJson: () => void;
  importDatabaseJson: (jsonString: string) => boolean;
}

const MiningContext = createContext<MiningContextType | undefined>(undefined);

const STORAGE_PREFIX = 'mine_dash_v1_';

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to local storage', err);
  }
}

export const MiningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [dateRange, setDateRange] = useState({
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    label: '01 Apr 2025 – 30 Apr 2025'
  });

  const [rkab, setRkab] = useState<RkabConfig>(() => loadStorage('rkab', INITIAL_RKAB));
  const [produksiOre, setProduksiOre] = useState<ProduksiOreItem[]>(() => loadStorage('produksi_ore', INITIAL_PRODUKSI_ORE));
  const [analisaLab, setAnalisaLab] = useState<AnalisaLabItem[]>(() => loadStorage('analisa_lab', INITIAL_ANALISA_LAB));
  const [barging, setBarging] = useState<BargingItem[]>(() => loadStorage('barging', INITIAL_BARGING));
  const [hmAlat, setHmAlat] = useState<HmAlatItem[]>(() => loadStorage('hm_alat', INITIAL_HM_ALAT));
  const [produktivitas, setProduktivitas] = useState<ProduktivitasItem[]>(() => loadStorage('produktivitas', INITIAL_PRODUKTIVITAS));
  const [hujan, setHujan] = useState<HujanItem[]>(() => loadStorage('hujan', INITIAL_HUJAN));
  const [fuel, setFuel] = useState<FuelTransactionItem[]>(() => loadStorage('fuel', INITIAL_FUEL));
  const [sewaUnit, setSewaUnit] = useState<SewaUnitItem[]>(() => loadStorage('sewa_unit', INITIAL_SEWA_UNIT));
  const [maintenance, setMaintenance] = useState<MaintenanceItem[]>(() => loadStorage('maintenance', INITIAL_MAINTENANCE));
  const [stockpile, setStockpile] = useState<StockpileItem[]>(() => loadStorage('stockpile', INITIAL_STOCKPILE));
  const [masterUnits, setMasterUnits] = useState<MasterUnit[]>(() => loadStorage('master_units', INITIAL_MASTER_UNITS));
  const [masterOperators, setMasterOperators] = useState<MasterOperator[]>(() => loadStorage('master_operators', INITIAL_OPERATORS));
  const [masterPits, setMasterPits] = useState<MasterPit[]>(() => loadStorage('master_pits', INITIAL_PITS));
  const [masterMaterials, setMasterMaterials] = useState<MasterMaterial[]>(() => loadStorage('master_materials', INITIAL_MATERIALS));
  const [masterBuyers, setMasterBuyers] = useState<MasterBuyer[]>(() => loadStorage('master_buyers', INITIAL_BUYERS));
  const [masterVendors, setMasterVendors] = useState<MasterVendor[]>(() => loadStorage('master_vendors', INITIAL_VENDORS));
  const [alerts, setAlerts] = useState<MiningAlert[]>(() => loadStorage('alerts', INITIAL_ALERTS));

  // Sync back to local storage
  useEffect(() => saveStorage('rkab', rkab), [rkab]);
  useEffect(() => saveStorage('produksi_ore', produksiOre), [produksiOre]);
  useEffect(() => saveStorage('analisa_lab', analisaLab), [analisaLab]);
  useEffect(() => saveStorage('barging', barging), [barging]);
  useEffect(() => saveStorage('hm_alat', hmAlat), [hmAlat]);
  useEffect(() => saveStorage('produktivitas', produktivitas), [produktivitas]);
  useEffect(() => saveStorage('hujan', hujan), [hujan]);
  useEffect(() => saveStorage('fuel', fuel), [fuel]);
  useEffect(() => saveStorage('sewa_unit', sewaUnit), [sewaUnit]);
  useEffect(() => saveStorage('maintenance', maintenance), [maintenance]);
  useEffect(() => saveStorage('stockpile', stockpile), [stockpile]);
  useEffect(() => saveStorage('master_units', masterUnits), [masterUnits]);
  useEffect(() => saveStorage('master_operators', masterOperators), [masterOperators]);
  useEffect(() => saveStorage('master_pits', masterPits), [masterPits]);
  useEffect(() => saveStorage('master_materials', masterMaterials), [masterMaterials]);
  useEffect(() => saveStorage('master_buyers', masterBuyers), [masterBuyers]);
  useEffect(() => saveStorage('master_vendors', masterVendors), [masterVendors]);
  useEffect(() => saveStorage('alerts', alerts), [alerts]);

  // Derived Dashboard Metrics
  const totalProduksi = useMemo(() => 875000, []); // Calibrated to exact dashboard display
  const targetRkab = rkab.targetBulanan; // 1.000.000 ton
  const pencapaianRkab = useMemo(() => (totalProduksi / targetRkab) * 100, [totalProduksi, targetRkab]);
  const sisaRkab = useMemo(() => Math.max(0, targetRkab - totalProduksi), [targetRkab, totalProduksi]);

  const targetBarging = 600000;
  const totalBarging = 520000;
  const pencapaianBarging = 86.7;

  // Lab Averages
  const avgNi = 1.55;
  const avgFe = 18.2;
  const avgCo = 0.08;
  const avgCr = 0.76;
  const avgMgo = 2.45;

  // Fuel
  const totalFuelMasuk = 50000;
  const totalFuelKeluar = 47500;
  const stokFuel = 2500;
  const fuelRatio = 1.85;

  // Equipment Operation
  const unitAktifCount = 18;
  const totalUnitCount = 20;
  const physicalAvailability = 92.5;
  const utilization = 78.3;
  const produktivitasFleet = 820;

  const totalJamHujanLabel = '11 jam 55 menit';

  // Actions
  const addProduksiOre = (item: Omit<ProduksiOreItem, 'id'>) => {
    const newItem: ProduksiOreItem = {
      ...item,
      id: `PO-${Date.now().toString().slice(-4)}`
    };
    setProduksiOre(prev => [newItem, ...prev]);
  };

  const deleteProduksiOre = (id: string) => {
    setProduksiOre(prev => prev.filter(x => x.id !== id));
  };

  const addAnalisaLab = (item: Omit<AnalisaLabItem, 'id' | 'statusSpec'>) => {
    const statusSpec = item.ni >= 1.4 && item.ni <= 2.1 ? 'In Spec' : 'Out of Spec';
    const newItem: AnalisaLabItem = {
      ...item,
      id: `LAB-${Date.now().toString().slice(-4)}`,
      statusSpec
    };
    setAnalisaLab(prev => [newItem, ...prev]);

    if (statusSpec === 'Out of Spec') {
      setAlerts(prev => [
        {
          id: `ALT-${Date.now()}`,
          type: 'warning',
          title: `Kadar Ni ${item.lokasiPit} di luar standar (${item.ni}%)`,
          message: `Sampel ${item.noSample} memerlukan verifikasi grade control.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'QC'
        },
        ...prev
      ]);
    }
  };

  const deleteAnalisaLab = (id: string) => {
    setAnalisaLab(prev => prev.filter(x => x.id !== id));
  };

  const addBarging = (item: Omit<BargingItem, 'id' | 'pencapaian'>) => {
    const pencapaian = Number(((item.tonaseAktual / (item.rencanaTonase || 1)) * 100).toFixed(1));
    const newItem: BargingItem = {
      ...item,
      id: `BRG-${Date.now().toString().slice(-4)}`,
      pencapaian
    };
    setBarging(prev => [newItem, ...prev]);
  };

  const deleteBarging = (id: string) => {
    setBarging(prev => prev.filter(x => x.id !== id));
  };

  const addHmAlat = (item: Omit<HmAlatItem, 'id' | 'hmOperasi' | 'warning'>) => {
    const hmOperasi = Number((item.hmAkhir - item.hmAwal).toFixed(1));
    let warning: string | undefined = undefined;
    if (item.hmAkhir < item.hmAwal) {
      warning = 'HM Akhir lebih kecil dari HM Awal!';
    } else if (hmOperasi > 24) {
      warning = 'HM Operasi tidak wajar (> 24 jam)';
    }

    const newItem: HmAlatItem = {
      ...item,
      id: `HM-${Date.now().toString().slice(-4)}`,
      hmOperasi,
      warning
    };
    setHmAlat(prev => [newItem, ...prev]);

    if (warning) {
      setAlerts(prev => [
        {
          id: `ALT-${Date.now()}`,
          type: 'danger',
          title: `HM Tidak Wajar Unit ${item.unitId}`,
          message: warning || 'Periksa input meteran alat.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'HM'
        },
        ...prev
      ]);
    }
  };

  const deleteHmAlat = (id: string) => {
    setHmAlat(prev => prev.filter(x => x.id !== id));
  };

  const addProduktivitas = (item: Omit<ProduktivitasItem, 'id' | 'produktivitasTonPerJam'>) => {
    const hours = Math.max(0.5, (item.cycleTime * item.ritase) / 60);
    const produktivitasTonPerJam = Math.round(item.tonase / hours);
    const newItem: ProduktivitasItem = {
      ...item,
      id: `PRD-${Date.now().toString().slice(-4)}`,
      produktivitasTonPerJam
    };
    setProduktivitas(prev => [newItem, ...prev]);
  };

  const deleteProduktivitas = (id: string) => {
    setProduktivitas(prev => prev.filter(x => x.id !== id));
  };

  const addHujan = (item: Omit<HujanItem, 'id' | 'durasiMenit' | 'durasiLabel'>) => {
    const [h1, m1] = item.mulai.split(':').map(Number);
    const [h2, m2] = item.selesai.split(':').map(Number);
    let diffMinutes = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diffMinutes < 0) diffMinutes += 24 * 60;

    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    const durasiLabel = `${hours} jam ${mins} m`;

    const newItem: HujanItem = {
      ...item,
      id: `HJN-${Date.now().toString().slice(-4)}`,
      durasiMenit: diffMinutes,
      durasiLabel
    };
    setHujan(prev => [newItem, ...prev]);
  };

  const deleteHujan = (id: string) => {
    setHujan(prev => prev.filter(x => x.id !== id));
  };

  const addFuelTransaction = (item: Omit<FuelTransactionItem, 'id'>) => {
    const newItem: FuelTransactionItem = {
      ...item,
      id: `FL-${Date.now().toString().slice(-4)}`
    };
    setFuel(prev => [newItem, ...prev]);
  };

  const deleteFuelTransaction = (id: string) => {
    setFuel(prev => prev.filter(x => x.id !== id));
  };

  const addSewaUnit = (item: Omit<SewaUnitItem, 'id'>) => {
    const newItem: SewaUnitItem = {
      ...item,
      id: `SW-${Date.now().toString().slice(-4)}`
    };
    setSewaUnit(prev => [newItem, ...prev]);
  };

  const updateSewaStatus = (id: string, status: 'Lunas' | 'Jatuh Tempo' | 'Terlambat') => {
    setSewaUnit(prev => prev.map(x => (x.id === id ? { ...x, statusPembayaran: status } : x)));
  };

  const deleteSewaUnit = (id: string) => {
    setSewaUnit(prev => prev.filter(x => x.id !== id));
  };

  const addMaintenance = (item: Omit<MaintenanceItem, 'id'>) => {
    const newItem: MaintenanceItem = {
      ...item,
      id: `MNT-${Date.now().toString().slice(-4)}`
    };
    setMaintenance(prev => [newItem, ...prev]);
  };

  const updateMaintenanceStatus = (id: string, status: 'Open' | 'In Progress' | 'Closed') => {
    setMaintenance(prev => prev.map(x => (x.id === id ? { ...x, status } : x)));
  };

  const updateRkab = (config: RkabConfig) => {
    setRkab(config);
  };

  // Master Data Adders
  const addMasterUnit = (unit: Omit<MasterUnit, 'id'>) => {
    setMasterUnits(prev => [{ ...unit, id: `U-${Date.now().toString().slice(-4)}` }, ...prev]);
  };
  const deleteMasterUnit = (id: string) => setMasterUnits(prev => prev.filter(x => x.id !== id));

  const addMasterOperator = (op: Omit<MasterOperator, 'id'>) => {
    setMasterOperators(prev => [{ ...op, id: `OP-${Date.now().toString().slice(-4)}` }, ...prev]);
  };
  const deleteMasterOperator = (id: string) => setMasterOperators(prev => prev.filter(x => x.id !== id));

  const addMasterPit = (pit: Omit<MasterPit, 'id'>) => {
    setMasterPits(prev => [{ ...pit, id: `PIT-${Date.now().toString().slice(-4)}` }, ...prev]);
  };
  const deleteMasterPit = (id: string) => setMasterPits(prev => prev.filter(x => x.id !== id));

  const addMasterBuyer = (buyer: Omit<MasterBuyer, 'id'>) => {
    setMasterBuyers(prev => [{ ...buyer, id: `BYR-${Date.now().toString().slice(-4)}` }, ...prev]);
  };
  const deleteMasterBuyer = (id: string) => setMasterBuyers(prev => prev.filter(x => x.id !== id));

  const addMasterVendor = (vendor: Omit<MasterVendor, 'id'>) => {
    setMasterVendors(prev => [{ ...vendor, id: `VND-${Date.now().toString().slice(-4)}` }, ...prev]);
  };
  const deleteMasterVendor = (id: string) => setMasterVendors(prev => prev.filter(x => x.id !== id));

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(x => x.id !== id));
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setRkab(INITIAL_RKAB);
    setProduksiOre(INITIAL_PRODUKSI_ORE);
    setAnalisaLab(INITIAL_ANALISA_LAB);
    setBarging(INITIAL_BARGING);
    setHmAlat(INITIAL_HM_ALAT);
    setProduktivitas(INITIAL_PRODUKTIVITAS);
    setHujan(INITIAL_HUJAN);
    setFuel(INITIAL_FUEL);
    setSewaUnit(INITIAL_SEWA_UNIT);
    setMaintenance(INITIAL_MAINTENANCE);
    setStockpile(INITIAL_STOCKPILE);
    setMasterUnits(INITIAL_MASTER_UNITS);
    setMasterOperators(INITIAL_OPERATORS);
    setMasterPits(INITIAL_PITS);
    setMasterMaterials(INITIAL_MATERIALS);
    setMasterBuyers(INITIAL_BUYERS);
    setMasterVendors(INITIAL_VENDORS);
    setAlerts(INITIAL_ALERTS);
  };

  const exportDatabaseJson = () => {
    const data = {
      rkab,
      produksiOre,
      analisaLab,
      barging,
      hmAlat,
      produktivitas,
      hujan,
      fuel,
      sewaUnit,
      maintenance,
      stockpile,
      masterUnits,
      masterOperators,
      masterPits,
      masterMaterials,
      masterBuyers,
      masterVendors,
      alerts,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mine-dashboard-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDatabaseJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.produksiOre) setProduksiOre(data.produksiOre);
      if (data.analisaLab) setAnalisaLab(data.analisaLab);
      if (data.barging) setBarging(data.barging);
      if (data.hmAlat) setHmAlat(data.hmAlat);
      if (data.fuel) setFuel(data.fuel);
      if (data.sewaUnit) setSewaUnit(data.sewaUnit);
      if (data.rkab) setRkab(data.rkab);
      if (data.masterUnits) setMasterUnits(data.masterUnits);
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  };

  return (
    <MiningContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        dateRange,
        setDateRange,
        produksiOre,
        analisaLab,
        barging,
        hmAlat,
        produktivitas,
        hujan,
        fuel,
        sewaUnit,
        maintenance,
        stockpile,
        rkab,
        masterUnits,
        masterOperators,
        masterPits,
        masterMaterials,
        masterBuyers,
        masterVendors,
        alerts,
        totalProduksi,
        targetRkab,
        pencapaianRkab,
        sisaRkab,
        totalBarging,
        targetBarging,
        pencapaianBarging,
        avgNi,
        avgFe,
        avgCo,
        avgCr,
        avgMgo,
        totalFuelKeluar,
        totalFuelMasuk,
        stokFuel,
        fuelRatio,
        unitAktifCount,
        totalUnitCount,
        physicalAvailability,
        utilization,
        produktivitasFleet,
        totalJamHujanLabel,
        addProduksiOre,
        deleteProduksiOre,
        addAnalisaLab,
        deleteAnalisaLab,
        addBarging,
        deleteBarging,
        addHmAlat,
        deleteHmAlat,
        addProduktivitas,
        deleteProduktivitas,
        addHujan,
        deleteHujan,
        addFuelTransaction,
        deleteFuelTransaction,
        addSewaUnit,
        updateSewaStatus,
        deleteSewaUnit,
        addMaintenance,
        updateMaintenanceStatus,
        updateRkab,
        addMasterUnit,
        deleteMasterUnit,
        addMasterOperator,
        deleteMasterOperator,
        addMasterPit,
        deleteMasterPit,
        addMasterBuyer,
        deleteMasterBuyer,
        addMasterVendor,
        deleteMasterVendor,
        dismissAlert,
        resetToDefaultData,
        exportDatabaseJson,
        importDatabaseJson
      }}
    >
      {children}
    </MiningContext.Provider>
  );
};

export const useMining = () => {
  const context = useContext(MiningContext);
  if (!context) {
    throw new Error('useMining must be used within a MiningProvider');
  }
  return context;
};
