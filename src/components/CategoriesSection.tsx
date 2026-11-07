import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const categories = [
    {
      id: 'rosas',
      title: 'Rosas Nobres',
      subtitle: 'O clássico atemporal que emociona sempre',
      image: '/images/category-roses.jpg',
      tag: 'Importadas',
    },
    {
      id: 'buques',
      title: 'Buquês Autorais',
      subtitle: 'Harmonia e frescor botânico em cada detalhe',
      image: '/images/hero-bouquet.jpg',
      tag: 'Exclusivos',
    },
    {
      id: 'tulipas',
      title: 'Tulipas & Estação',
      subtitle: 'Delicadeza, cor e energia primaveril',
      image: '/images/category-tulips.jpg',
      tag: 'Da Holanda',
    },
    {
      id: 'cestas',
      title: 'Cestas & Presentes',
      subtitle: 'Chocolates finos, velas botânicas e mimos',
      image: '/images/category-gift-basket.jpg',
      tag: 'Gourmet',
    },
  ];

  return (
    <section id="categorias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header with Title and "Ver todas as categorias" */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8DECC]/70">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#5D744F] font-semibold block mb-1">
            Categorias em Destaque
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#15271B] font-normal tracking-tight">
            Encontre a forma perfeita de presentear
          </h2>
        </div>

        <button
          onClick={() => onSelectCategory('todos')}
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#38462F] hover:text-[#15271B] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>Ver todo o catálogo</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* 4 Cards matching reference screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group bg-white rounded-2xl p-3 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'border-[#38462F] ring-2 ring-[#38462F]/30 shadow-md'
                  : 'border-[#E8DECC]/80 hover:border-[#B5CBB1] hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3.8] rounded-xl overflow-hidden bg-[#FAF7F0] mb-4">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-[#38462F] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                  {cat.tag}
                </span>
              </div>

              {/* Text Info */}
              <div className="px-1.5 pb-2">
                <h3 className="font-serif text-xl font-normal text-[#15271B] group-hover:text-[#38462F] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#5D744F] font-light mt-1 line-clamp-2">
                  {cat.subtitle}
                </p>

                <div className="mt-4 pt-2 border-t border-[#FAF7F0] flex items-center justify-between text-xs font-medium text-[#15271B]">
                  <span className="text-[11px] text-[#7E9F7C] uppercase tracking-wider">Explorar</span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F0] group-hover:bg-[#15271B] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
