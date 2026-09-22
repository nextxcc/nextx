import { UseCaseItem } from '../types/usecase';

export const USE_CASES: UseCaseItem[] = [
  {
    id: 'llm-fine-tuning',
    name: 'LLM Fine-Tuning & Pre-training',
    recommendedGpus: ['H100 SXM5', 'A100 SXM4'],
    tags: ['DeepSpeed', 'FSDP', 'LoRA'],
    description: 'Multi-GPU clusters for 7B to 70B+ parameter model training, full fine-tuning, and LoRA/QLoRA adaptation.',
    metric: '900 GB/s NVLink Fabric',
  },
  {
    id: 'generative-diffusion',
    name: 'Generative Media & Video Synthesis',
    recommendedGpus: ['RTX 4090', 'RTX 3090'],
    tags: ['ComfyUI', 'SDXL', 'Flux'],
    description: 'High-speed image generation and video synthesis workflows with dedicated GDDR6X VRAM and TensorRT acceleration.',
    metric: 'Sub-second SDXL Generation',
  },
  {
    id: 'academic-research',
    name: 'Academic & Scientific Deep Learning',
    recommendedGpus: ['RTX 4090', 'A100 PCIe', 'A100 SXM4'],
    tags: ['PyTorch', 'Jupyter', 'Weights&Biases'],
    description: 'Cost-effective interactive Jupyter environments for paper replication, thesis benchmarking, and prototype experimentation.',
    metric: 'Under ¥3.00 Lab Sessions',
  },
  {
    id: 'production-inference',
    name: 'High-Throughput Production Inference',
    recommendedGpus: ['L40S', 'RTX 6000 Ada'],
    tags: ['vLLM', 'TensorRT-LLM', 'TGI'],
    description: 'Low-latency, high-concurrency LLM serving with continuous batching, paged attention, and FP8 quantization.',
    metric: '3,200+ Tokens/sec per Node',
  },
];

export const useCases = USE_CASES;
export default USE_CASES;
