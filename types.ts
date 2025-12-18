export interface FileInput {
  name: string;
  mimeType: string;
  data: string; // base64
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  files?: FileInput[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  VERDICT = 'VERDICT'
}

export interface VerdictParsed {
  topPriority: string;
  whyThisMatters: string;
  whatCanWait: string;
  firstAction: string;
}