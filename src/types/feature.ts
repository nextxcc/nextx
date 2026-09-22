export interface PlatformPillar {
  id: string;
  title: string;
  spec: string;
  description: string;
  iconName: string;
}

export interface EnvironmentCatalog {
  cudaVersions: string[];
  frameworks: string[];
  defaultImage: string;
  sshSample: string;
}

export type FeatureCard = PlatformPillar;
