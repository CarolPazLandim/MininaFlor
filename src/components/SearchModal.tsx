import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openQuickView } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const quickTerms = ['Peônias', 'Rosas Colombianas', 'Flower Box', 'Cesta Gourmet', 'Tulipas', 'Romance'];

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return PRODUCTS_DATA.filter((p) => {
      const matchName = p.name.toLowerCase().includes(term);
      const matchSub = p.subtitle.toLowerCase().includes(term);
      const matchCat = p.categoryLabel.toLowerCase().includes(term);
      const matchFlowers = p.flowersIncluded.some((f) => f.toLowerCase().includes(term));
      const matchOccasion = p.occasion.toLowerCase().includes(term);
      return matchName || matchSub || matchCat || matchFlowers || matchOccasion;
    });
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8DECC] overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#E8DECC] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#5D744F] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por flores (peônias, rosas...), presentes, ocasiões..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#15271B] placeholder-[#7E9F7C] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#7E9F7C] hover:text-[#15271B] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EBF0E9] text-[#15271B] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-3 bg-white border-b border-[#FAF7F0] flex items-center gap-2 overflow-x-auto text-xs text-[#5D744F] scrollbar-none">
          <span className="shrink-0 text-[#7E9F7C]">Sugestões:</span>
          {quickTerms.map((term) => (
            <button
              key={term}
              onClick={() => setSearchTerm(term)}
              className="px-2.5 py-1 bg-[#FAF7F0] hover:bg-[#EBF0E9] text-[#2A3523] rounded-full transition-colors cursor-pointer shrink-0 border border-[#E8DECC]/50"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3">
          {searchTerm.trim() === '' ? (
            <div className="text-center py-10 text-xs text-[#7E9F7C]">
              Digite o nome de uma flor, ocasião ou tipo de presente para buscar em tempo real.
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="font-serif text-lg text-[#15271B]">
                Nenhum resultado para "{searchTerm}"
              </p>
              <p className="text-xs text-[#7E9F7C]">
                Tente buscar por termos como "rosas", "buquê", "cesta" ou "tulipas".
              </p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  openQuickView(product);
                }}
                className="p-3 rounded-2xl border border-[#E8DECC] hover:border-[#38462F] hover:bg-[#FAF8F5] transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover bg-[#FAF7F0] shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#7E9F7C]">
                      {product.categoryLabel}
                    </span>
                    <h5 className="font-serif text-base font-normal text-[#15271B] group-hover:text-[#38462F] truncate">
                      {product.name}
                    </h5>
                    <p className="text-[11px] text-[#5D744F] truncate font-light">
                      {product.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-serif text-base font-bold text-[#15271B] tabular-nums block">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-[#7E9F7C] flex items-center gap-1 justify-end">
                    <Star className="w-2.5 h-2.5 fill-[#C49B5B] text-[#C49B5B]" />
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
