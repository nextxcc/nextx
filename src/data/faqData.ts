import { FaqItem } from '../types/faq';

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'billing',
    q: 'How does hourly and fractional billing work?',
    question: 'How does hourly and fractional billing work?',
    a: 'Billing is calculated per minute based on actual active container runtime with zero minimum commitment.',
    answer: 'Billing is calculated per minute based on actual active container runtime with zero minimum commitment.',
    category: 'Billing',
  },
  {
    id: 'ssh',
    q: 'How do I connect to my GPU instance via SSH?',
    question: 'How do I connect to my GPU instance via SSH?',
    a: 'Every instance provides a direct root SSH command and optional web terminal link immediately after boot.',
    answer: 'Every instance provides a direct root SSH command and optional web terminal link immediately after boot.',
    category: 'Connectivity',
  },
  {
    id: 'storage',
    q: 'Is my data persistent across instance restarts?',
    question: 'Is my data persistent across instance restarts?',
    a: 'Yes, data stored in attached persistent NVMe volumes remains intact even when instances are paused or terminated.',
    answer: 'Yes, data stored in attached persistent NVMe volumes remains intact even when instances are paused or terminated.',
    category: 'Storage',
  },
  {
    id: 'models',
    q: 'What GPU models are offered and how do I choose for my workload?',
    question: 'What GPU models are offered and how do I choose for my workload?',
    a: 'We offer consumer GPUs (RTX 5090/5080/4090/3090/PRO 6000) for GenAI & fine-tuning, and enterprise nodes (B300/B200/H100/A100) for large distributed training.',
    answer: 'We offer consumer GPUs (RTX 5090/5080/4090/3090/PRO 6000) for GenAI & fine-tuning, and enterprise nodes (B300/B200/H100/A100) for large distributed training.',
    category: 'Hardware',
  },
  {
    id: 'security',
    q: 'How is tenant isolation and security guaranteed?',
    question: 'How is tenant isolation and security guaranteed?',
    a: 'Each container runs in an isolated KVM microVM with encrypted NVMe storage and dedicated GPU passthrough.',
    answer: 'Each container runs in an isolated KVM microVM with encrypted NVMe storage and dedicated GPU passthrough.',
    category: 'Security',
  },
];

export const faqItems = FAQ_ITEMS;
export default FAQ_ITEMS;
