import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QuranBrowser } from './QuranBrowser';
import { SurahView } from './SurahView';
import { ScrollToTop } from '../components/ScrollToTop';

export function QuranPage() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<QuranBrowser />} />
        <Route path=":surahNumber" element={<SurahView />} />
      </Routes>
    </>
  );
}