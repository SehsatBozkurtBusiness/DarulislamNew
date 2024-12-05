import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getFiguresByCategory } from '../../../data/figures';
import { Companion } from '../../../types/figures';
import { CompanionCard } from './CompanionCard';
import { ScrollToTop } from '../../../components/ScrollToTop';

export function CompanionsPage() {
  const companions = getFiguresByCategory('companion') as Companion[];

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
              Companions of the Prophet ﷺ
            </h1>
            <p className="text-lg text-kaaba-gold/80 max-w-2xl mx-auto">
              The blessed companions who supported and learned directly from Prophet Muhammad ﷺ
            </p>
            <div className="w-16 h-[1px] bg-kaaba-gold mx-auto mt-8" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companions.map((companion) => (
              <CompanionCard key={companion.id} companion={companion} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}