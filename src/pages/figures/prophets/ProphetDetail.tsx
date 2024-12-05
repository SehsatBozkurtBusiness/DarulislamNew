import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getFigureById } from '../../../data/figures';
import { Prophet } from '../../../types/figures';
import { ScrollToTop } from '../../../components/ScrollToTop';

export function ProphetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const prophet = getFigureById(id || '') as Prophet | undefined;

  if (!prophet || prophet.category !== 'prophet') {
    return (
      <div className="min-h-screen pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-kaaba-gold">
            Prophet not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-kaaba-gold hover:text-kaaba-gold/80 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            {prophet.image && (
              <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden mb-8">
                <img
                  src={prophet.image}
                  alt={prophet.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              </div>
            )}

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-kaaba-gold mb-2">
                {prophet.name}
              </h1>
              <p className="text-3xl font-amiri text-kaaba-gold/90 mb-2">
                {prophet.arabicName}
              </p>
              <p className="text-xl text-kaaba-gold/80">
                {prophet.title}
              </p>
            </div>

            <div className="space-y-6 text-kaaba-gold/80">
              <div>
                <h2 className="text-xl font-semibold text-kaaba-gold mb-2">Period</h2>
                <p>{prophet.period}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-kaaba-gold mb-2">Description</h2>
                <p>{prophet.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-kaaba-gold mb-2">Significance</h2>
                <p>{prophet.significance}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}