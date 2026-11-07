import React, { useState, useMemo } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Filter, X } from 'lucide-react';
import { PRODUCTS_DATA, CATEGORIES_LIST, Product } from '../data/products';
import { useShop } from '../context/ShopContext';

interface BestSellersProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  selectedOccasion: string | null;
  onClearOccasion: () => void;
}

export const BestSellersSection: React.FC<BestSellersProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedOccasion,
  onClearOccasion,
}) => {
  const { addToCart, toggleWishlist, isProductInWishlist, openQuickView } = useShop();
  const [sortBy, setSortBy] = useState<'populares' | 'menor' | 'maior'>('populares');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS_DATA];

    // Filter by occasion if set
    if (selectedOccasion && selectedOccasion !== 'todos') {
      list = list.filter((p) => p.occasion === selectedOccasion);
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'todos') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'menor') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'maior') {
      list.sort((a, b) => b.price - a.price);
    } else {
      // Populares (bestseller first)
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [selectedCategory, selectedOccasion, sortBy]);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#5D744F] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C49B5B]" />
          <span>Coleção Exclusiva & Mais Vendidos</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#15271B] font-normal tracking-tight text-balance">
          Presentes que tocam o coração
        </h2>
        <p className="mt-3 text-sm text-[#495C3D] leading-relaxed">
          Cada arranjo é preparado individualmente no dia da entrega com flores nobres, folhagens aromáticas e embalagens de alta sofisticação.
        </p>
      </div>

      {/* Occasion Filter Badge Banner if filtered */}
      {selectedOccasion && selectedOccasion !== 'todos' && (
        <div className="mb-6 max-w-md mx-auto bg-[#EBF0E9] border border-[#B5CBB1] rounded-full px-4 py-1.5 flex items-center justify-between text-xs text-[#2A3523]">
          <span>
            Filtrando por ocasião: <strong className="capitalize">{selectedOccasion}</strong>
          </span>
          <button
            onClick={onClearOccasion}
            className="flex items-center gap-1 text-[#5D744F] hover:text-[#15271B] font-semibold cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>
      )}

      {/* Interactive Controls Bar: Segmented Category Buttons + Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#E8DECC]">
        
        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#1C3524] text-[#FAF8F5] shadow-sm'
                    : 'bg-white text-[#38462F] hover:bg-[#EBF0E9] border border-[#E8DECC]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs text-[#495C3D] self-end md:self-auto shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#5D744F]" />
          <span>Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-[#E8DECC] rounded-lg px-2.5 py-1.5 text-xs text-[#15271B] focus:outline-none focus:border-[#5D744F] cursor-pointer"
          >
            <option value="populares">Mais Desejados</option>
            <option value="menor">Menor Preço</option>
            <option value="maior">Maior Preço</option>
          </select>
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DECC] p-8">
          <p className="font-serif text-2xl text-[#15271B]">Nenhum arranjo encontrado</p>
          <p className="text-xs text-[#5D744F] mt-2">
            Tente selecionar outra categoria ou limpar os filtros de ocasião.
          </p>
          <button
            onClick={() => {
              onSelectCategory('todos');
              onClearOccasion();
            }}
            className="mt-4 px-5 py-2 text-xs font-semibold bg-[#1C3524] text-white rounded-full hover:bg-[#264731]"
          >
            Ver todos os presentes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => {
            const isFav = isProductInWishlist(product.id);
            const installmentPrice = (product.price / 3).toFixed(2).replace('.', ',');

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#E8DECC]/90 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#B5CBB1] hover:-translate-y-1"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[4/4.2] overflow-hidden bg-[#FAF7F0]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge Tag if available */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-[#FAF8F5]/95 backdrop-blur-sm text-[#1C3524] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isFav
                        ? 'bg-[#EAF0E8] text-[#38462F] shadow-sm'
                        : 'bg-white/80 backdrop-blur-sm text-[#5D744F] hover:bg-white hover:text-[#15271B]'
                    }`}
                    aria-label="Adicionar aos favoritos"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-[#38462F]' : ''}`} />
                  </button>

                  {/* Quick View Overlay Button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => openQuickView(product)}
                      className="w-full py-2 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#15271B] text-xs font-semibold rounded-xl backdrop-blur-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Espiar Detalhes
                    </button>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Quiet Metadata with typographic separator */}
                    <div className="flex items-center justify-between text-[11px] text-[#7E9F7C] font-medium uppercase tracking-wider mb-1">
                      <span>{product.categoryLabel}</span>
                      <span className="flex items-center gap-1 text-[#C49B5B] font-semibold">
                        <Star className="w-3 h-3 fill-[#C49B5B]" />
                        <span className="text-[#38462F] font-mono tabular-nums">{product.rating.toFixed(1)}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => openQuickView(product)}
                      className="font-serif text-xl font-normal text-[#15271B] hover:text-[#38462F] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Subtitle / Florist Note */}
                    <p className="text-xs text-[#5D744F] font-light mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-4 pt-3 border-t border-[#FAF7F0] flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-xl font-bold text-[#15271B] tabular-nums">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#A7C1A5] line-through tabular-nums">
                            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#7E9F7C] block tabular-nums">
                        ou 3x de R$ {installmentPrice} sem juros
                      </span>
                    </div>

                    {/* Buy / Add Button */}
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-2.5 sm:px-3.5 sm:py-2 bg-[#1C3524] hover:bg-[#264731] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-95"
                      title="Adicionar à Sacola"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#B5CBB1]" />
                      <span className="hidden sm:inline">Comprar</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
