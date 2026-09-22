import { PlatformPillar, EnvironmentCatalog } from '../types/feature';

export const CORE_PILLARS: PlatformPillar[] = [
  {
    id: 'instant-boot',
    title: 'Instant Container Spin-up',
    spec: 'Instant on pre-cached nodes',
    description: 'Pre-cached OCI container images boot with direct SSH terminal access in seconds without download waits.',
    iconName: 'Zap',
  },
  {
    id: 'root-ssh',
    title: 'Direct Root SSH Access',
    spec: 'Port forwarding & key-based auth',
    description: 'Direct root terminal access with custom SSH public key injection and dedicated port forwarding.',
    iconName: 'Terminal',
  },
  {
    id: 'pay-per-minute',
    title: 'Granular Billing & Breach Protection',
    spec: 'Mutual cancellation protection',
    description: 'Granular per-minute billing for active compute runtime with mutual early-cancellation penalties protecting both hosts and renters.',
    iconName: 'Clock',
  },
  {
    id: 'turnkey-env',
    title: 'Turnkey AI Containers',
    spec: 'Host-cached image instant start',
    description: 'Supports PyTorch, CUDA, and vLLM. Instant startup depends on whether the host machine owner pre-downloaded the selected image.',
    iconName: 'Cpu',
  },
  {
    id: 'bare-metal',
    title: 'Docker GPU Passthrough',
    spec: 'NVIDIA Container Toolkit (Docker)',
    description: 'Direct GPU passthrough within lightweight Docker containers, providing near-native GPU compute performance.',
    iconName: 'Activity',
  },
  {
    id: 'encrypted-storage',
    title: 'High-Speed NVMe Storage',
    spec: 'Persistent volume mounts',
    description: 'Encrypted persistent NVMe volume mounts that retain model weights and datasets across container restarts.',
    iconName: 'HardDrive',
  },
];

export const ENVIRONMENT_CATALOG: EnvironmentCatalog = {
  cudaVersions: ['12.4', '12.1', '11.8'],
  frameworks: ['PyTorch 2.4', 'TensorFlow 2.16', 'vLLM', 'Ollama', 'ComfyUI'],
  defaultImage: 'pytorch/pytorch:2.4.0-cuda12.4-cudnn9-runtime',
  sshSample: 'ssh root@connect.nextx.cc -p 42100',
};

export const corePillars = CORE_PILLARS;
export const environmentCatalog = ENVIRONMENT_CATALOG;

export default CORE_PILLARS;
