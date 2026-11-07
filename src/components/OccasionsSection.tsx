import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS_DATA } from '../data/products';

interface OccasionsSectionProps {
  onSelectOccasion: (occasionId: string) => void;
  selectedOccasion: string | null;
}

export const OccasionsSection: React.FC<OccasionsSectionProps> = ({
  onSelectOccasion,
  selectedOccasion,
}) => {
  return (
    <section id="ocasioes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Heading & Description */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5D744F] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C49B5B]" />
            <span>Para Qualquer Ocasião</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#15271B] leading-tight font-normal text-balance">
            Flores que tornam o dia verdadeiramente inesquecível
          </h2>

          <p className="text-sm text-[#495C3D] leading-relaxed">
            Aniversários, bodas, agradecimentos sinceros ou simplesmente o desejo de surpreender quem mora no seu coração. Nossos floristas traduzem seus sentimentos em poesia botânica.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onSelectOccasion('todos')}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#5D744F]/40 text-[#15271B] text-xs font-semibold hover:bg-[#EBF0E9] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Ver todos os presentes</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Occasion Cards matching reference layout */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {OCCASIONS_DATA.slice(0, 4).map((occasion) => {
              const isSelected = selectedOccasion === occasion.id;
              return (
                <button
                  key={occasion.id}
                  onClick={() => onSelectOccasion(occasion.id)}
                  className={`group relative text-left rounded-2xl overflow-hidden aspect-[3/4.2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-4 border cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-[#38462F] border-[#38462F]'
                      : 'border-[#E8DECC] hover:-translate-y-1'
                  }`}
                >
                  {/* Photo with zoom on hover */}
                  <img
                    src={occasion.image}
                    alt={occasion.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Scrim for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15271B]/90 via-[#15271B]/35 to-transparent" />

                  {/* Content overlay */}
                  <div className="relative z-10 w-full">
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center mb-2 transition-transform duration-300 group-hover:bg-white group-hover:text-[#15271B] group-hover:translate-x-0.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="font-serif text-lg font-normal text-white leading-snug">
                      {occasion.name}
                    </h3>
                    <p className="text-[11px] text-[#D6E2D3] line-clamp-1 mt-0.5 font-light">
                      {occasion.headline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
