// Complete Kitchen Quotation System Types

export type KitchenDesignType = 
  | 'straight'      // مطبخ مستقيم (I)
  | 'l-shape'       // مطبخ على شكل حرف L
  | 'u-shape'       // مطبخ على شكل حرف U
  | 'g-shape'       // مطبخ على شكل حرف G
  | 'island'        // مطبخ مستقيم مع جزيرة
  | 'other';        // تصميم آخر

export type WoodMaterialType =
  | 'mdf'                        // MDF
  | 'lati-standard'              // LATI عادي
  | 'lati-resistant'             // LATI مقاوم للرطوبة والحرارة
  | 'mdf-box-mdf-doors'          // صندوق MDF + أبواب MDF High Gloss
  | 'lati-box-mdf-doors'         // صندوق LATI + أبواب MDF High Gloss
  | 'lati-resistant-mdf-doors';  // صندوق LATI مقاوم + أبواب MDF High Gloss

export type DoorInstallationType = 'inset' | 'overlay';  // مدمج / ملصوق
export type DoorFinishType = 'glossy' | 'matte';         // لامع / مطفي
export type LightingType = 'warm-led' | 'cool-led' | 'none';
export type CeilingType = 'flat' | 'uneven';

// Step 1: Customer Information
export interface CustomerInfo {
  fullName: string;
  phone: string;
  address?: string;
  city?: string;
}

// Step 2: Kitchen Design Type
export interface KitchenDesignInfo {
  type: KitchenDesignType;
  customDescription?: string;  // If type is 'other'
}

// Step 3: Dimensions (Conditional based on design type)
export interface KitchenDimensions {
  // For straight kitchen (I)
  straightLength?: number;
  
  // For L-shape kitchen
  lSide1?: number;
  lSide2?: number;
  
  // For U-shape kitchen
  uSide1?: number;
  uSide2?: number;
  uSide3?: number;
  
  // For G-shape kitchen
  gSide1?: number;
  gSide2?: number;
  gSide3?: number;
  gSide4?: number;  // امتداد حرف G
  
  // For kitchen with island
  islandKitchenLength?: number;
  islandLength?: number;
  islandWidth?: number;
}

// Step 4: Kitchen Height & Ceiling
export interface HeightCeilingInfo {
  reachesCeiling: boolean;
  totalHeight?: number;
  ceilingType?: CeilingType;
  highestPoint?: number;
  lowestPoint?: number;
}

// Step 5: Scope of Work
export interface WorkScope {
  wood: boolean;
  marble: boolean;
  tiles: boolean;
  electrical: boolean;
  plumbing: boolean;
  painting: boolean;
  gypsum: boolean;
  complete: boolean;  // مشروع متكامل
}

// Step 6: Integrated Appliances
export interface IntegratedAppliances {
  // Cooking & Cooling
  electricOven: boolean;
  microwave: boolean;
  stove: boolean;            // بوتاغاز
  pizzaOven: boolean;
  hood: boolean;             // شفاط
  fridge: boolean;
  freezer: boolean;
  waterHeater: boolean;
  coffeeMachine: boolean;
  
  // Water & Cleaning
  singleSink: boolean;
  doubleSink: boolean;
  faucet: boolean;
  soapDispenser: boolean;    // ماكينة صابون
}

// Step 7: Internal Cabinet Equipment
export interface CabinetEquipment {
  gasBottleCabinet: boolean;     // خزانة قنينة بوتاغاز
  trashCabinet: boolean;         // خزانة سلة نفايات
  vegetableBaskets: boolean;     // شباك للخضروات والفواكه
  glassBaskets: boolean;         // شباك للأكواب
  spiceBaskets: boolean;         // شباك للتوابل
  cornerBaskets: boolean;        // شباك ثابت داخل الزاوية
}

// Step 8: Wood Type
export interface WoodTypeInfo {
  material: WoodMaterialType;
}

// Step 9: Door System & Finish
export interface DoorSystemInfo {
  installation: DoorInstallationType;
  finish: DoorFinishType;
  kitchenColor: string;
  colorReference?: string;
  colorImage?: string;
  colorLink?: string;
  glassDoorsWithAluminum?: number;  // عدد أبواب زجاج بإطار ألمنيوم
}

// Step 10: Lighting
export interface LightingInfo {
  type: LightingType;
}

// Step 11: Marble / Worktop Details (Conditional - if marble selected in scope)
export interface MarbleDetails {
  surfaceType?: string;
  thickness?: string;
  edgeShape?: string;
  color?: string;
  colorReference?: string;
  colorImage?: string;
  colorLink?: string;
  hasOpenings: boolean;  // فتحات للحوض / البوتاغاز
  notes?: string;
  isCustomMaterial: boolean;  // Client-provided material
  isGraphitubeSelection: boolean;  // Company catalog selection
  graphitubeRef?: string;  // If Graphitube material selected
}

// Step 12: Tiles Details (Conditional - if tiles selected in scope)
export interface TilesDetails {
  scope?: string;
  type?: string;
  size?: string;
  color?: string;
  colorReference?: string;
  colorImage?: string;
  colorLink?: string;
  notes?: string;
  isCustomMaterial: boolean;
  isGraphitubeSelection: boolean;
  graphitubeRef?: string;
}

// Step 13: Electrical Works (Conditional - if electrical selected in scope)
export interface ElectricalDetails {
  workType?: string;
  estimatedPoints?: string;
  specialEquipment?: string;
  notes?: string;
}

// Step 14: Plumbing Works (Conditional - if plumbing selected in scope)
export interface PlumbingDetails {
  workType?: string;
  waterPoints?: string;
  drainageCondition?: string;
  notes?: string;
}

// Step 15: Painting Works (Conditional - if painting selected in scope)
export interface PaintingDetails {
  scope?: string;
  paintType?: string;
  color?: string;
  colorReference?: string;
  colorImage?: string;
  colorLink?: string;
  notes?: string;
}

// Step 16: Gypsum Works (Conditional - if gypsum selected in scope)
export interface GypsumDetails {
  workType?: string;
  designLevel?: string;
  notes?: string;
}

// Step 17: 3D Design
export interface Design3DInfo {
  wants3D: boolean;
  images?: File[];  // Up to 4 images
  video?: File;     // 1 video
  imageUrls?: string[];  // For preview
  videoUrl?: string;     // For preview
}

// Step 18: Additional Notes
export interface AdditionalInfo {
  notes?: string;
  uploadedFiles?: File[];
}

// Complete Kitchen Form Data
export interface CompleteKitchenFormData {
  // Core Info
  customerInfo: CustomerInfo;
  kitchenDesign: KitchenDesignInfo;
  dimensions: KitchenDimensions;
  heightCeiling: HeightCeilingInfo;
  
  // Work Details
  workScope: WorkScope;
  appliances: IntegratedAppliances;
  cabinetEquipment: CabinetEquipment;
  woodType: WoodTypeInfo;
  doorSystem: DoorSystemInfo;
  lighting: LightingInfo;
  
  // Conditional Details
  marbleDetails?: MarbleDetails;
  tilesDetails?: TilesDetails;
  electricalDetails?: ElectricalDetails;
  plumbingDetails?: PlumbingDetails;
  paintingDetails?: PaintingDetails;
  gypsumDetails?: GypsumDetails;
  
  // Final Steps
  design3D: Design3DInfo;
  additionalInfo: AdditionalInfo;
  
  // Metadata
  submittedAt?: Date;
  canShowPrice: boolean;  // Based on conditions
  priceBlockReasons?: string[];  // Why price cannot be shown
  estimatedPrice?: number;  // Calculated price if canShowPrice is true
}

// Helper type for partial form data during wizard
export type PartialKitchenFormData = Partial<CompleteKitchenFormData>;