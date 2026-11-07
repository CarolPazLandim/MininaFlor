import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Heart, Flower2 } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomKitClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomKitClick }) => {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {/* Outer Luxury Forest Card matching reference visual architecture */}
      <div className="relative rounded-[32px] bg-[#172B1D] text-[#FAF8F5] overflow-hidden shadow-2xl border border-[#264731]">
        
        {/* Subtle decorative background glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#3B5139]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#5F805D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[580px]">
          
          {/* Left Column: Emotional Editorial Copy */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between z-10">
            <div>
              {/* Botanical kicker without pill box */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B5CBB1] font-medium mb-6">
                <Flower2 className="w-4 h-4 text-[#C49B5B]" />
                <span>Floricultura Boutique & Presentes Autorais</span>
                <span aria-hidden="true">·</span>
                <span>Desde 2018</span>
              </div>

              {/* Emotional Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#FAF8F5] tracking-tight text-balance max-w-xl">
                Surpreenda quem você ama com presentes que <span className="italic font-light text-[#E5DCCB]">florescem</span> sentimentos.
              </h1>

              {/* Refined Subtitle */}
              <p className="mt-6 text-base sm:text-lg text-[#D6E2D3] leading-relaxed max-w-lg font-light">
                Buquês exuberantes, rosas importadas e mimos especiais elaborados à mão para transformar qualquer momento em uma memória inesquecível.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreClick}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FAF8F5] text-[#172B1D] font-medium text-sm hover:bg-[#E8DECC] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Escolher meu presente</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#172B1D]" />
                </button>

                <button
                  onClick={onCustomKitClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] hover:bg-[#FAF8F5]/10 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-[#C49B5B]" />
                  <span>Monte um Kit Único</span>
                </button>
              </div>
            </div>

            {/* Micro proof line */}
            <div className="mt-8 pt-6 border-t border-[#FAF8F5]/10 flex items-center gap-4 text-xs text-[#B5CBB1]">
              <div className="flex -space-x-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3B5139] text-[#FAF8F5] text-[10px] font-bold border border-[#172B1D]">SP</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#5F805D] text-[#FAF8F5] text-[10px] font-bold border border-[#172B1D]">RJ</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#7E9F7C] text-[#FAF8F5] text-[10px] font-bold border border-[#172B1D]">PR</span>
              </div>
              <p className="leading-snug">
                <strong className="text-white font-medium">+15.000 sorrisos entregues</strong> com avaliação média 4.9 de 5 estrelas.
              </p>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Imagery */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full">
            <img
              src="/images/hero-bouquet.jpg"
              alt="Florista montando um exuberante buquê artesanal com peônias e rosas"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Scrim gradient to softly blend on left and bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#172B1D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#172B1D] lg:via-transparent lg:to-transparent opacity-80" />

            {/* Delicate Floating Accent Card */}
            <div className="absolute bottom-6 right-6 bg-[#172B1D]/85 backdrop-blur-md border border-[#FAF8F5]/15 rounded-2xl p-4 shadow-xl text-left max-w-[210px] hidden sm:block">
              <span className="text-[11px] uppercase tracking-wider text-[#C49B5B] font-semibold block">
                Edição Botânica
              </span>
              <p className="text-xs text-[#FAF8F5] font-serif italic text-base mt-0.5">
                Aurora & Peônias
              </p>
              <span className="text-[11px] text-[#B5CBB1] block mt-1">
                Colhido hoje pela manhã
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip with 4 Pillars (as in reference image) */}
        <div className="border-t border-[#FAF8F5]/15 bg-[#122317]/80 backdrop-blur-sm px-6 py-4 sm:py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center shrink-0 text-[#B5CBB1]">
                <Flower2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">Flores Frescas do Dia</p>
                <p className="text-[11px] text-[#A7C1A5]">Direto de produtores seletos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center shrink-0 text-[#B5CBB1]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">Entrega Expressa</p>
                <p className="text-[11px] text-[#A7C1A5]">Em até 2 horas na sua cidade</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center shrink-0 text-[#B5CBB1]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">Garantia de 7 Dias</p>
                <p className="text-[11px] text-[#A7C1A5]">Viço e durabilidade assegurados</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center shrink-0 text-[#B5CBB1]">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">Cartão Caligrafado</p>
                <p className="text-[11px] text-[#A7C1A5]">Sua mensagem escrita à mão</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
