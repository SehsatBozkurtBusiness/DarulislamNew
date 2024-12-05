import React from 'react';
import { X } from 'lucide-react';
import { NavLink } from './NavLink';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleLinkClick = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 z-50
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-end p-6">
        <button
          onClick={onClose}
          className="text-kaaba-gold hover:text-opacity-80 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex flex-col items-center justify-center h-[80vh] gap-8">
        <div className="w-16 h-[1px] bg-kaaba-gold mb-8" />
        <NavLink href="/" className="text-2xl" onClick={handleLinkClick}>Home</NavLink>
        <NavLink href="/quran" className="text-2xl" onClick={handleLinkClick}>Quran</NavLink>
        <NavLink href="/hadith" className="text-2xl" onClick={handleLinkClick}>Hadith</NavLink>
        <NavLink href="/prayer" className="text-2xl" onClick={handleLinkClick}>Prayer Times</NavLink>
        <NavLink href="/figures" className="text-2xl" onClick={handleLinkClick}>Important Figures</NavLink>
        <NavLink href="/fundamentals" className="text-2xl" onClick={handleLinkClick}>Fundamentals</NavLink>
        <NavLink href="#architecture" className="text-2xl" onClick={handleLinkClick}>Architecture</NavLink>
        <NavLink href="#history" className="text-2xl" onClick={handleLinkClick}>History</NavLink>
        <NavLink href="#gallery" className="text-2xl" onClick={handleLinkClick}>Gallery</NavLink>
        <NavLink href="#contact" className="text-2xl" onClick={handleLinkClick}>Contact</NavLink>
        <div className="w-16 h-[1px] bg-kaaba-gold mt-8" />
      </nav>
    </div>
  );
}