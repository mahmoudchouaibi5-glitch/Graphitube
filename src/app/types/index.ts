export type ProjectType = 'kitchen' | 'salon' | 'custom' | null;

export type KitchenDesignType = 
  | 'straight' 
  | 'l-shape' 
  | 'u-shape' 
  | 'g-shape' 
  | 'island' 
  | 'other';

export type SalonType = 'l-shape' | 'u-shape' | 'square' | 'rectangular-open' | 'rectangular-closed' | 'custom-design';

export type WoodType = 
  | 'chene' 
  | 'noyer' 
  | 'laitre';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address?: string;
  city?: string;
}

export interface KitchenDimensions {
  type: KitchenDesignType;
  side1?: number;
  side2?: number;
  side3?: number;
  side4?: number;
  islandLength?: number;
  islandWidth?: number;
  customDescription?: string;
}

export interface HeightInfo {
  reachesCeiling: boolean;
  totalHeight?: number;
  ceilingType?: 'flat' | 'uneven';
  highestPoint?: number;
  lowestPoint?: number;
}

export interface WorkScope {
  wood: boolean;
  marble: boolean;
  tiles: boolean;
  electrical: boolean;
  plumbing: boolean;
  painting: boolean;
  gypsum: boolean;
  complete: boolean;
}

export interface Appliances {
  electricOven: boolean;
  microwave: boolean;
  stove: boolean;
  pizzaOven: boolean;
  hood: boolean;
  fridge: boolean;
  freezer: boolean;
  waterHeater: boolean;
  coffeeMachine: boolean;
  singleSink: boolean;
  doubleSink: boolean;
  faucet: boolean;
  soapDispenser: boolean;
}

export interface CabinetEquipment {
  gasBottleCabinet: boolean;
  trashCabinet: boolean;
  vegetableBaskets: boolean;
  glassBaskets: boolean;
  spiceBaskets: boolean;
  cornerBaskets: boolean;
}

export interface DoorSystem {
  installation: 'inset' | 'overlay';
  finish: 'glossy' | 'matte';
  color: string;
  colorReference?: string;
  glassDoorsCount?: number;
}

export interface MarbleDetails {
  type?: string;
  thickness?: string;
  edgeShape?: string;
  color?: string;
  colorImage?: string;
  colorLink?: string;
  hasOpenings: boolean;
  notes?: string;
  customMaterial?: boolean;
}

export interface TilesDetails {
  scope?: string;
  type?: string;
  size?: string;
  color?: string;
  colorImage?: string;
  colorLink?: string;
  notes?: string;
  customMaterial?: boolean;
}

export interface ElectricalDetails {
  workType?: string;
  pointsCount?: string;
  specialEquipment?: string;
  notes?: string;
}

export interface PlumbingDetails {
  workType?: string;
  waterPoints?: string;
  drainageCondition?: string;
  notes?: string;
}

export interface PaintingDetails {
  scope?: string;
  type?: string;
  color?: string;
  colorImage?: string;
  colorLink?: string;
  notes?: string;
}

export interface GypsumDetails {
  workType?: string;
  designLevel?: string;
  notes?: string;
}

export interface LightingInfo {
  type: 'warm-led' | 'cool-led' | 'none';
}

export interface Design3DInfo {
  wants3D: boolean;
  images?: string[];
  video?: string;
}

export interface SalonDimensions {
  type: SalonType;
  wallLength1?: number;
  wallLength2?: number;
  wallLength3?: number;
  wallLength4?: number;
  customDesignImage?: string;
}

export interface SalonWoodElements {
  largeTables: number;
  sundries: number;
  sidePanels: number;
  verticalShapes: number;
  verticalCorners: number;
}

export interface DecorationPattern {
  id: string;
  color: string;
  selected: boolean;
}

export interface WallDecoration {
  pattern: string;
  repetitions: number;
  color: string;
  colorImage?: string;
  colorLink?: string;
}

export interface SideFinish {
  design: string;
  color: string;
  colorImage?: string;
  colorLink?: string;
}

export interface KitchenFormData {
  projectType: 'kitchen';
  customerInfo: CustomerInfo;
  kitchenDesign: KitchenDimensions;
  heightInfo: HeightInfo;
  workScope: WorkScope;
  appliances: Appliances;
  cabinetEquipment: CabinetEquipment;
  woodType: WoodType;
  doorSystem: DoorSystem;
  marbleDetails: MarbleDetails;
  tilesDetails: TilesDetails;
  electricalDetails: ElectricalDetails;
  plumbingDetails: PlumbingDetails;
  paintingDetails: PaintingDetails;
  gypsumDetails: GypsumDetails;
  lighting: LightingInfo;
  design3D: Design3DInfo;
  additionalNotes?: string;
  hasPlans: boolean;
  planImages?: string[];
}

export interface SalonFormData {
  projectType: 'salon';
  customerInfo: CustomerInfo;
  salonType: SalonDimensions; // Combined type and dimensions
  woodElements: SalonWoodElements;
  woodType: WoodType;
  selectedPattern?: string;
  selectedColor?: string;
  workScope?: WorkScope;
  wallDecoration: WallDecoration[];
  sideFinish: SideFinish;
  hasPlans: boolean;
  planImages?: string[];
  additionalNotes?: {
    notes?: string;
  };
  submittedAt?: Date;
  canShowPrice?: boolean;
  priceBlockReasons?: string[];
  estimatedPrice?: number;
}

export type FormData = KitchenFormData | SalonFormData;