import { z } from 'zod';

export const languageSchema = z.enum([
  'ar', 'en', 'de', 'fr', 'tr', 'es', 'ru', 'hi', 'zh'
]);

export type Language = z.infer<typeof languageSchema>;

export interface Verse {
  id: string;
  surahNumber: number;
  verseNumber: number;
  arabic: string;
  translation: string;
}

export interface Surah {
  number: number;
  name: string;
  arabicName: string;
  versesCount: number;
  revelationType: string;
}

export interface QuranResponse {
  verses: Verse[];
  total: number;
}