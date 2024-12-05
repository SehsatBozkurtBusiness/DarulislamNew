import axios from 'axios';
import { Hadith, HadithResponse } from '../types/hadith';

const COLLECTIONS = {
  bukhari: '/bukhari.json',
  muslim: '/muslim.json',
  tirmidhi: '/tirmidhi.json',
  nasai: '/nasai.json',
  ibnmajah: '/ibnmajah.json',
  malik: '/malik.json',
  darimi: '/darimi.json'
};

const hadithCache: { [key: string]: Hadith[] } = {};

async function loadHadithCollection(collection: string): Promise<Hadith[]> {
  if (hadithCache[collection]) {
    return hadithCache[collection];
  }

  try {
    const response = await fetch(COLLECTIONS[collection as keyof typeof COLLECTIONS]);
    if (!response.ok) {
      throw new Error(`Failed to load ${collection} collection`);
    }
    const data = await response.json();
    hadithCache[collection] = data.hadiths.map((h: any) => ({
      id: `${collection}-${h.number}`,
      number: h.number,
      arab: h.arab,
      text: h.text,
      chapter: h.chapter || 'General',
      book: collection,
      grade: h.grade || 'Sahih'
    }));
    return hadithCache[collection];
  } catch (error) {
    console.error('Error loading hadith collection:', error);
    throw error;
  }
}

export async function fetchHadithsByCollection(
  collection: string,
  page: number = 1,
  limit: number = 20
): Promise<HadithResponse> {
  try {
    const hadiths = await loadHadithCollection(collection);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      hadiths: hadiths.slice(startIndex, endIndex),
      total: hadiths.length
    };
  } catch (error) {
    console.error('Error fetching hadiths:', error);
    throw error;
  }
}

export async function searchHadiths(
  collection: string,
  query: string
): Promise<HadithResponse> {
  try {
    const hadiths = await loadHadithCollection(collection);
    const searchResults = hadiths.filter(hadith => 
      hadith.text.toLowerCase().includes(query.toLowerCase()) ||
      hadith.arab.includes(query)
    );
    
    return {
      hadiths: searchResults.slice(0, 20),
      total: searchResults.length
    };
  } catch (error) {
    console.error('Error searching hadiths:', error);
    throw error;
  }
}