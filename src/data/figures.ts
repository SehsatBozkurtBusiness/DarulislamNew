import { Figure } from '../types/figures';

export const categories = [
  {
    id: 'prophets',
    title: 'Prophets',
    description: 'The noble messengers of Allah who guided humanity',
    image: 'https://images.unsplash.com/photo-1564769625392-651b89c75a77?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'family',
    title: "Prophet's Family",
    description: 'The blessed family members of Prophet Muhammad ﷺ',
    image: 'https://images.unsplash.com/photo-1591456983933-0c126b90ffd2?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'companions',
    title: 'Companions',
    description: 'The blessed companions (Sahaba) of Prophet Muhammad ﷺ',
    image: 'https://images.unsplash.com/photo-1583482183021-daa0eda21b62?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'scholars',
    title: 'Scholars',
    description: 'The great Islamic scholars who preserved and explained the religion',
    image: 'https://images.unsplash.com/photo-1584286595398-a59511e0649f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'rulers',
    title: 'Important Rulers',
    description: 'The notable rulers of Islamic empires throughout history',
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?auto=format&fit=crop&q=80&w=1200'
  }
] as const;

// Import all figures data
import { prophets } from './figures/prophets';
import { family } from './figures/family';
import { companions } from './figures/companions';
import { scholars } from './figures/scholars';
import { rulers } from './figures/rulers';

const allFigures: Figure[] = [
  ...prophets,
  ...family,
  ...companions,
  ...scholars,
  ...rulers
];

export const getFigureById = (id: string): Figure | undefined => {
  return allFigures.find(figure => figure.id === id);
};

export const getFiguresByCategory = (category: Figure['category']): Figure[] => {
  return allFigures.filter(figure => figure.category === category);
};

export const getCategoryCount = (category: Figure['category']): number => {
  return getFiguresByCategory(category).length;
};

export { prophets, family, companions, scholars, rulers };