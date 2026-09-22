export interface UseCaseItem {
  id: string;
  name: string;
  recommendedGpus: string[];
  tags: string[];
  description: string;
  metric: string;
}

export type AiWorkload = UseCaseItem;
