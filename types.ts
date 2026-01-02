
export enum StudioMode {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  id: string;
  thinking?: string;
  groundingLinks?: Array<{ uri: string; title: string }>;
}

export interface ImageResult {
  url: string;
  prompt: string;
  timestamp: number;
}
