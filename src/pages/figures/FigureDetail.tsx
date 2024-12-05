import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getFigureById } from '../../data/figures';

export function FigureDetail() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const figure = getFigureById(id || '');

  if (!figure) {
    return (
      <div className="min-h-screen pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-kaaba-gold">
            Figure not found
          </div>
        </div>
      </div>
    );
  }

  return (
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
          {figure.image && (
            <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden mb-8">
              <img
                src={figure.image}
                alt={figure.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-kaaba-gold mb-2">
              {figure.name}
            </h1>
            <p className="text-3xl font-amiri text-kaaba-gold/90 mb-2">
              {figure.arabicName}
            </p>
            <p className="text-xl text-kaaba-gold/80">
              {figure.title}
            </p>
          </div>

          <div className="space-y-6 text-kaaba-gold/80">
            <div>
              <h2 className="text-xl font-semibold text-kaaba-gold mb-2">Period</h2>
              <p>{figure.period}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-kaaba-gold mb-2">Description</h2>
              <p>{figure.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-kaaba-gold mb-2">Significance</h2>
              <p>{figure.significance}</p>
            </div>

            {figure.category === 'companion' && (
              <div>
                <h2 className="text-xl font-semibold text-kaaba-gold mb-2">Relationship to Prophet ﷺ</h2>
                <p>{figure.relationship}</p>
              </div>
            )}

            {figure.category === 'scholar' && (
              <div>
                <h2 className="text-xl font-semibold text-kaaba-gold mb-2">School of Thought</h2>
                <p>{figure.madhab} School</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}