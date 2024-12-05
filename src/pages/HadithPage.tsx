import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { HadithCollection } from './HadithCollection';
import { ScrollToTop } from '../components/ScrollToTop';

const collections = [
  {
    id: 'bukhari',
    title: 'Sahih al-Bukhari',
    description: 'The most authentic collection of Hadith compiled by Imam Muhammad al-Bukhari',
    image: 'https://images.unsplash.com/photo-1584286595398-a59511e0649f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'muslim',
    title: 'Sahih Muslim',
    description: 'The second most authentic collection compiled by Imam Muslim ibn al-Hajjaj',
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tirmidhi',
    title: 'Jami at-Tirmidhi',
    description: 'A comprehensive collection focusing on legal and doctrinal traditions',
    image: 'https://images.unsplash.com/photo-1583482183021-daa0eda21b62?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nasai',
    title: 'Sunan an-Nasa\'i',
    description: 'Known for its strict criteria in accepting hadith narrations',
    image: 'https://images.unsplash.com/photo-1591456983933-0c126b90ffd2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ibnmajah',
    title: 'Sunan Ibn Majah',
    description: 'A comprehensive collection including unique traditions',
    image: 'https://images.unsplash.com/photo-1564769625392-651b89c75a77?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'malik',
    title: 'Muwatta Imam Malik',
    description: 'The earliest written collection of hadith and Islamic law',
    image: 'https://images.unsplash.com/photo-1584286595398-a59511e0649f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'darimi',
    title: 'Sunan al-Darimi',
    description: 'A valuable collection with unique chains of narration',
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?auto=format&fit=crop&q=80&w=800'
  }
];

export function HadithPage() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen pt-24 pb-12 relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="w-16 h-[1px] bg-kaaba-gold mx-auto mb-8" />
                  <h1 className="text-4xl sm:text-5xl font-bold text-kaaba-gold mb-4">
                    Hadith Collections
                  </h1>
                  <p className="text-lg text-kaaba-gold/80 max-w-2xl mx-auto">
                    Explore the authentic collections of Prophetic traditions
                  </p>
                  <div className="w-16 h-[1px] bg-kaaba-gold mx-auto mt-8" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {collections.map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/hadith/${collection.id}`}
                      className="group relative overflow-hidden rounded-lg border border-kaaba-gold/20 
                               hover:border-kaaba-gold/40 transition-all duration-500
                               bg-gradient-card backdrop-blur-sm hover:transform hover:-translate-y-1"
                    >
                      <div className="aspect-w-16 aspect-h-9 relative">
                        <img
                          src={collection.image}
                          alt={collection.title}
                          className="object-cover w-full h-64 opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                      </div>
                      <div className="p-6 relative">
                        <div className="flex items-center gap-3 mb-4">
                          <Book className="w-6 h-6 text-kaaba-gold" />
                          <h3 className="text-2xl font-bold text-kaaba-gold">
                            {collection.title}
                          </h3>
                        </div>
                        <p className="text-kaaba-gold/70">
                          {collection.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          }
        />
        <Route path=":collection" element={<HadithCollection />} />
      </Routes>
    </>
  );
}