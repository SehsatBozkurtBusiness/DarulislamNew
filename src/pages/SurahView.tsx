import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { fetchVersesBySurah } from '../services/quran';
import { LanguageSlider } from '../components/quran/LanguageSlider';
import { VerseCard } from '../components/quran/VerseCard';
import { ScrollToTop } from '../components/ScrollToTop';
import type { Verse, Language } from '../types/quran';

export function SurahView() {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('ar');

  useEffect(() => {
    const loadVerses = async () => {
      try {
        setLoading(true);
        const data = await fetchVersesBySurah(parseInt(surahNumber!, 10), currentPage, selectedLanguage);
        setVerses(data.verses);
        setTotalPages(Math.ceil(data.total / 20));
      } catch (err) {
        setError('Failed to load verses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (surahNumber) {
      loadVerses();
    }
  }, [surahNumber, currentPage, selectedLanguage]);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              to="/quran"
              className="inline-flex items-center text-kaaba-gold hover:text-kaaba-gold/80 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Surahs
            </Link>
          </div>

          <LanguageSlider
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />

          {error && (
            <div className="text-red-500 text-center mb-8 p-4 border border-red-500/20 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-8 h-8 animate-spin text-kaaba-gold" />
            </div>
          ) : (
            <div className="space-y-6">
              {verses.map((verse) => (
                <VerseCard
                  key={verse.id}
                  verse={verse}
                  selectedLanguage={selectedLanguage}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}