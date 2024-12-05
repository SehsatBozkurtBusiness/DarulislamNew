import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiguresBrowser } from './figures/FiguresBrowser';
import { ProphetsPage } from './figures/prophets/ProphetsPage';
import { FamilyPage } from './figures/family/FamilyPage';
import { CompanionsPage } from './figures/companions/CompanionsPage';
import { ScholarsPage } from './figures/scholars/ScholarsPage';
import { RulersPage } from './figures/rulers/RulersPage';
import { ScrollToTop } from '../components/ScrollToTop';

export function FiguresPage() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<FiguresBrowser />} />
        <Route path="/prophets" element={<ProphetsPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/companions" element={<CompanionsPage />} />
        <Route path="/scholars" element={<ScholarsPage />} />
        <Route path="/rulers" element={<RulersPage />} />
      </Routes>
    </>
  );
}