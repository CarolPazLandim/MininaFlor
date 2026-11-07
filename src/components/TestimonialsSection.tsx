import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/products';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Top Banner Proof */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[#E8DECC]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#5D744F] font-semibold block mb-1">
            Depoimentos & Experiências Reais
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#15271B] font-normal tracking-tight">
            Histórias de amor que ajudamos a florescer
          </h2>
        </div>

        {/* Aggregate Score Card */}
        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-[#E8DECC] shadow-sm">
          <div className="text-center border-r border-[#E8DECC] pr-4">
            <span className="font-serif text-3xl font-bold text-[#15271B] block leading-none tabular-nums">
              4.9
            </span>
            <div className="flex items-center justify-center gap-0.5 mt-1 text-[#C49B5B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#C49B5B]" />
              ))}
            </div>
          </div>
          <div className="text-xs text-[#5D744F]">
            <p className="font-semibold text-[#15271B]">+3.200 Avaliações Verificadas</p>
            <p className="text-[11px] text-[#7E9F7C]">99,4% de entregas perfeitas no prazo</p>
          </div>
        </div>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-7 border border-[#E8DECC] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Stars & Quote */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#C49B5B]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C49B5B]" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-[#CAD8C8]" />
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#38462F] leading-relaxed font-light italic">
                "{t.text}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="mt-6 pt-4 border-t border-[#FAF7F0] flex items-center gap-3">
              <div
                style={{ backgroundColor: t.avatarBg }}
                className="w-10 h-10 rounded-full text-white font-serif text-sm font-semibold flex items-center justify-center shrink-0 shadow-inner"
              >
                {t.initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-[#15271B] truncate">{t.name}</h4>
                  <span title="Compra Verificada" className="inline-flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 text-[#5F805D] shrink-0" />
                  </span>
                </div>
                <p className="text-[11px] text-[#7E9F7C] truncate">
                  {t.occasion} · {t.city}
                </p>
              </div>

              <span className="text-[10px] text-[#A7C1A5] shrink-0 font-light">{t.date}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
