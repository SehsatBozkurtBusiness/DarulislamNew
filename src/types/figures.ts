export interface BaseFigure {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  period: string;
  description: string;
  significance: string;
  image?: string;
  category: 'prophet' | 'family' | 'companion' | 'scholar' | 'ruler';
}

export interface Prophet extends BaseFigure {
  category: 'prophet';
}

export interface FamilyMember extends BaseFigure {
  category: 'family';
  relationship: string;
}

export interface Companion extends BaseFigure {
  category: 'companion';
  relationship: string;
}

export interface Scholar extends BaseFigure {
  category: 'scholar';
  madhab: string;
}

export interface Ruler extends BaseFigure {
  category: 'ruler';
  dynasty: string;
  achievements: string[];
}

export type Figure = Prophet | FamilyMember | Companion | Scholar | Ruler;

export interface FigureCategory {
  id: string;
  title: string;
  description: string;
  image: string;
}