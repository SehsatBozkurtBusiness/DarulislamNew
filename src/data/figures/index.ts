import figuresData from './data.json';
import { Figure } from '../../types/figures';

export const categories = figuresData.categories;

export const getFigureById = (id: string): Figure | undefined => {
  const allFigures = Object.values(figuresData.figures).flat();
  return allFigures.find(figure => figure.id === id) as Figure | undefined;
};

export const getFiguresByCategory = (category: string): Figure[] => {
  return (figuresData.figures[category as keyof typeof figuresData.figures] || []) as Figure[];
};

export const getCategoryCount = (category: string): number => {
  return getFiguresByCategory(category).length;
};