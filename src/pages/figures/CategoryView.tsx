import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getFiguresByCategory } from '../../data/figures';
import { FigureCard } from '../../components/figures/FigureCard';
import { ScrollToTop } from '../../components/ScrollToTop';

export function CategoryView() {
  const { category } = useParams<{ category: string }>();
  const figures = getFiguresByCategory(category || '');

  const categoryTitles: Record<string, string> = {
    prophets: 'Prophets in Islam',
    companions: 'Companions of the Prophet ﷺ',
    scholars: 'Islamic Scholars'
  };

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              to="/figures"
              className="inline-flex items-center text-kaaba-gold hover:text-kaaba-gold/80 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Categories
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-kaaba-gold mb-4">
              {categoryTitles[category || '']}
            </h1>
            <div className="w-16 h-[1px] bg-kaaba-gold mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {figures.map((figure) => (
              <FigureCard key={figure.id} figure={figure} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}