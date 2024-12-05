import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Scholar } from '../../../types/figures';

interface ScholarCardProps {
  scholar: Scholar;
}

export function ScholarCard({ scholar }: ScholarCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-kaaba-gold/20 
                 hover:border-kaaba-gold/40 transition-all duration-500
                 bg-gradient-card backdrop-blur-sm"
    >
      <div className="relative">
        {scholar.image && (
          <div className="aspect-w-16 aspect-h-9 relative">
            <img
              src={scholar.image}
              alt={scholar.name}
              className="object-cover w-full h-48 opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          </div>
        )}
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-kaaba-gold">
                {scholar.name}
              </h3>
              <p className="text-xl font-amiri text-kaaba-gold/90 mb-1">
                {scholar.arabicName}
              </p>
              <p className="text-sm text-kaaba-gold/60">
                {scholar.title}
              </p>
            </div>
            <div className="text-kaaba-gold">
              {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
          </div>

          <p className="text-kaaba-gold/80 text-sm mb-4">
            {scholar.description}
          </p>

          <div className="text-sm text-kaaba-gold/60">
            {scholar.period}
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 pt-0 border-t border-kaaba-gold/10 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-kaaba-gold mb-2">
                Significance
              </h4>
              <p className="text-kaaba-gold/80">
                {scholar.significance}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-kaaba-gold mb-2">
                School of Thought
              </h4>
              <p className="text-kaaba-gold/80">
                {scholar.madhab} School
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}