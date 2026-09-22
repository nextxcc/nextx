export type GpuCategory = 'enterprise' | 'consumer';

export interface GpuNode {
  id: string;
  name: string;
  shortName?: string;
  vendor: 'NVIDIA';
  architecture: string;
  category: GpuCategory;
  vramGb: number;
  memoryType: string;
  memoryBandwidth: string;
  tflopsFp16: number;
  tflops?: number; // Tier 3 pairwise test alias
  cudaCores: number;
  tensorCores: number;
  interconnect: string;
  onDemandPriceHourly: number;
  spotPriceHourly: number;
  // Aliases for comprehensive test-tier compatibility:
  onDemand: number;
  spot: number;
  onDemandRate: number;
  spotRate: number;
  onDemandHourly: number;
  spotHourly: number;
  popular?: boolean;
  preInstalledEnvironments: string[];
  preInstalled?: string[]; // Tier 4 scenario alias
  availableNodes?: number;
  badge?: string;
  recommendedFor?: string[];
}

export type HardwareNode = GpuNode;
