import React, { useState } from 'react';
import { Clock, ArrowRight, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface PromoBannerProps {
  onOrderNow: () => void;
}

export const PromoBannerSection: React.FC<PromoBannerProps> = ({ onOrderNow }) => {
  const { setDeliveryCep, showToast } = useShop();
  const [cepInput, setCepInput] = useState('');
  const [shippingResult, setShippingResult] = useState<{
    available: boolean;
    time: string;
    bairro: string;
    price: string;
  } | null>(null);

  const handleCheckCep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cepInput.trim()) return;

    // Simulate instant shipping query
    setDeliveryCep(cepInput);
    setShippingResult({
      available: true,
      time: 'Até 90 minutos',
      bairro: 'Região Metropolitana',
      price: 'Grátis para compras acima de R$ 250',
    });
    showToast('Entrega expressa disponível para sua região!');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Outer Sage Green Card matching the reference design visual structure */}
      <div className="relative rounded-3xl bg-[#E4ECE3] border border-[#CAD8C8] overflow-hidden p-8 sm:p-12 lg:p-14 shadow-lg">
        
        {/* Subtle decorative background organic shape */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6E4D4] rounded-full blur-2xl -z-0 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Headline and Express Delivery CTA */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#3B5139] font-bold">
              <Clock className="w-4 h-4 text-[#C49B5B]" />
              <span>Serviço Express Concierge</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#15271B] font-normal leading-tight text-balance">
              Buquês e presentes entregues em até <span className="italic font-light">2 horas</span>
            </h2>

            <p className="text-sm sm:text-base text-[#38462F] leading-relaxed max-w-xl font-light">
              Esqueceu uma data importante ou quer transformar uma tarde comum em algo inesquecível? Nossa equipe monta seu arranjo na hora e um mensageiro dedicado entrega com todo o cuidado térmico.
            </p>

            {/* Quick CEP simulator */}
            <div className="pt-2 max-w-md">
              <form onSubmit={handleCheckCep} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-[#7E9F7C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value)}
                    placeholder="Digite seu CEP (ex: 01419-001)"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CAD8C8] rounded-xl text-xs text-[#15271B] placeholder-[#7E9F7C] focus:outline-none focus:border-[#38462F] shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#264731] hover:bg-[#1C3524] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  Consultar Prazo
                </button>
              </form>

              {shippingResult && (
                <div className="mt-3 p-3 bg-white/80 rounded-xl border border-[#CAD8C8] flex items-start gap-2.5 text-xs text-[#1C3524]">
                  <CheckCircle className="w-4 h-4 text-[#5F805D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#15271B]">
                      Entrega Rápida Ativa: {shippingResult.time}
                    </span>
                    <span className="text-[11px] text-[#5D744F]">
                      {shippingResult.price} · Flores saem refrigeradas do atelier
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Direct CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOrderNow}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1C3524] text-[#FAF8F5] text-xs font-semibold tracking-wide hover:bg-[#264731] transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
              >
                <span>Escolher Buquê para Hoje</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <span className="text-xs text-[#495C3D] hidden sm:inline">
                ou ligue no plantão: <strong>(11) 3280-4490</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Heroic Bouquet Presentation matching reference doodle */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative max-w-sm w-full">
              
              {/* Product cutout card */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/4.5] bg-white">
                <img
                  src="/images/category-roses.jpg"
                  alt="Buquê com entrega rápida em papel kraft refinado"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Romantic handwritten note simulation (as shown in reference image!) */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-[#CAD8C8] max-w-[170px] text-right transform rotate-2">
                <Sparkles className="w-4 h-4 text-[#C49B5B] ml-auto mb-1" />
                <p className="font-serif italic text-sm text-[#1C3524] leading-tight">
                  "Flores frescas sempre trazem paz ao coração ♡"
                </p>
                <span className="text-[10px] text-[#7E9F7C] uppercase tracking-wider block mt-1 font-sans">
                  Cartão Incluso
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
