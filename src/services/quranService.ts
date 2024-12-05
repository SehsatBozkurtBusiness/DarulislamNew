import { Verse, Surah, QuranResponse } from '../types/quran';

const TRANSLATIONS = {
  en: '/English.json',
  de: '/German.json',
  fr: '/French.json',
  tr: '/Turkish.json',
  es: '/Spanish.json',
  ru: '/Russian.json',
  hi: '/Hindi.json',
  zh: '/Chinese.json'
};

const cache: {
  surahs: Surah[];
  verses: { [key: string]: Verse[] };
  translations: { [key: string]: any };
} = {
  surahs: [],
  verses: {},
  translations: {}
};

async function loadTranslation(language: string) {
  if (cache.translations[language]) {
    return cache.translations[language];
  }

  try {
    const response = await fetch(TRANSLATIONS[language as keyof typeof TRANSLATIONS]);
    if (!response.ok) {
      throw new Error(`Failed to load ${language} translation`);
    }
    const data = await response.json();
    cache.translations[language] = data;
    return data;
  } catch (error) {
    console.error(`Error loading ${language} translation:`, error);
    throw error;
  }
}

export async function fetchSurahs(): Promise<Surah[]> {
  if (cache.surahs.length > 0) {
    return cache.surahs;
  }

  try {
    const data = await loadTranslation('en');
    cache.surahs = data.surahs.map((surah: any) => ({
      number: surah.number,
      name: surah.englishName,
      arabicName: surah.arabicName,
      versesCount: surah.ayahs.length,
      revelationType: surah.revelationType
    }));
    return cache.surahs;
  } catch (error) {
    console.error('Error loading surahs:', error);
    throw error;
  }
}

export async function fetchVersesBySurah(
  surahNumber: number,
  page: number = 1,
  language: string = 'en'
): Promise<QuranResponse> {
  const cacheKey = `${surahNumber}-${language}`;

  try {
    if (!cache.verses[cacheKey]) {
      const translation = await loadTranslation(language);
      const surah = translation.surahs.find((s: any) => s.number === surahNumber);
      
      if (!surah) {
        throw new Error(`Surah ${surahNumber} not found`);
      }

      const verses = await Promise.all(surah.ayahs.map(async (ayah: any) => {
        const translations = await Promise.all(['en', 'de'].map(async lang => {
          const trans = await loadTranslation(lang);
          const surahTrans = trans.surahs.find((s: any) => s.number === surahNumber);
          return surahTrans.ayahs[ayah.numberInSurah - 1].text;
        }));

        return {
          id: `${surahNumber}-${ayah.numberInSurah}`,
          surahNumber,
          verseNumber: ayah.numberInSurah,
          arabic: ayah.text,
          english: translations[0],
          german: translations[1]
        };
      }));

      cache.verses[cacheKey] = verses;
    }

    const verses = cache.verses[cacheKey];
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      verses: verses.slice(startIndex, endIndex),
      total: verses.length
    };
  } catch (error) {
    console.error('Error fetching verses:', error);
    throw error;
  }
}