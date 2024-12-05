import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Figure } from '../../types/figures';

interface FigureCardProps {
  figure: Figure;
}

export function FigureCard({ figure }: FigureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-kaaba-gold/20 
                 hover:border-kaaba-gold/40 transition-all duration-500
                 bg-gradient-card backdrop-blur-sm"
    >
      <button
        onClick={toggleExpand}
        className="w-full text-left"
      >
        <div className="relative">
          {figure.image && (
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={figure.image}
                alt={figure.name}
                className="object-cover w-full h-48 opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-kaaba-gold">
                  {figure.name}
                </h3>
                <p className="text-xl font-amiri text-kaaba-gold/90 mb-1">
                  {figure.arabicName}
                </p>
                <p className="text-sm text-kaaba-gold/60">
                  {figure.title}
                </p>
              </div>
              <div className="text-kaaba-gold">
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>

            <p className="text-kaaba-gold/80 text-sm mb-4">
              {figure.description}
            </p>

            <div className="text-sm text-kaaba-gold/60">
              {figure.period}
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 pt-0 space-y-4 border-t border-kaaba-gold/10">
            <div>
              <h4 className="text-lg font-semibold text-kaaba-gold mb-2">Significance</h4>
              <p className="text-kaaba-gold/80">{figure.significance}</p>
            </div>

            {figure.category === 'companion' && (
              <div>
                <h4 className="text-lg font-semibold text-kaaba-gold mb-2">
                  Relationship to Prophet ﷺ
                </h4>
                <p className="text-kaaba-gold/80">{figure.relationship}</p>
              </div>
            )}

            {figure.category === 'scholar' && (
              <div>
                <h4 className="text-lg font-semibold text-kaaba-gold mb-2">
                  School of Thought
                </h4>
                <p className="text-kaaba-gold/80">{figure.madhab} School</p>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}