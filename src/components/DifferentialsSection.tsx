import React from 'react';
import { Sparkles, Shield, Package, PenTool, Truck } from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const differentials = [
    {
      icon: Shield,
      title: 'Frescor Selecionado na Madrugada',
      description: 'Nossos botânicos escolhem haste por haste diretamente nos produtores parceiros de Holambra e da Serra às 5h da manhã. Garantia inegociável de 7 dias de beleza viva.',
    },
    {
      icon: Package,
      title: 'Embalagens de Alta Perfumaria',
      description: 'Papéis kraft de fibra natural com alta gramatura, caixas estruturadas com acabamento acetinado e laços de seda pura tecidos para causar impacto visual ao primeiro olhar.',
    },
    {
      icon: PenTool,
      title: 'Cartão Caligrafado à Mão',
      description: 'Nenhum bilhete impresso sem alma: transcrevemos sua mensagem com caneta tinteiro em papel algodão com selo de cera botânica, sem qualquer custo adicional.',
    },
    {
      icon: Truck,
      title: 'Transporte com Cuidado Térmico',
      description: 'Veículos com climatização controlada e embalagens com reserva de hidratação na base para que as pétalas cheguem perfeitas e radiantes como recém-colhidas.',
    },
  ];

  return (
    <section id="diferenciais" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#5D744F] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C49B5B]" />
          <span>O Padrão Bloom & Co.</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#15271B] font-normal tracking-tight text-balance">
          Por que nossos presentes emocionam tanto?
        </h2>
        <p className="mt-3 text-sm text-[#495C3D] leading-relaxed">
          Cuidamos de cada etapa do presente com o carinho e a solenidade que o seu gesto de amor merece.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {differentials.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-[#E8DECC] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:border-[#B5CBB1]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF0E9] text-[#1C3524] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#3B5139]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#15271B] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5D744F] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#FAF7F0] flex items-center justify-between text-[11px] text-[#7E9F7C]">
                <span>Pilar 0{idx + 1}</span>
                <span className="font-medium text-[#1C3524]">Garantia Bloom</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
