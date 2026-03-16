export interface StatNumber {
  value: string;
  label: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  image?: string;
}

// Transformed data for component usage
export interface TransformedStats {
  clients: number;
  deals: number;
  years: number;
  assets: number;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  stats: TransformedStats;
  displayStats: StatNumber[];
  features: FeatureItem[];
  buttons: string[];
}
