import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useShop();

  if (!isWishlistOpen) return null;

  const favoriteProducts = PRODUCTS_DATA.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DECC]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8DECC] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#38462F] fill-[#38462F]" />
            <h3 className="font-serif text-xl font-normal text-[#15271B]">
              Seus Favoritos ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EBF0E9] text-[#15271B] transition-colors cursor-pointer"
            aria-label="Fechar favoritos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F0] flex items-center justify-center mx-auto text-[#7E9F7C]">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl text-[#15271B]">Nenhum favorito salvo</h4>
              <p className="text-xs text-[#5D744F] max-w-xs mx-auto font-light">
                Clique no coração dos arranjos que você mais amou para salvá-los e consultar quando quiser.
              </p>
            </div>
          ) : (
            favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl border border-[#E8DECC] bg-white flex gap-3.5 relative items-center shadow-xs"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover bg-[#FAF7F0] shrink-0"
                />

                <div className="flex-1 min-w-0 pr-6">
                  <span className="text-[10px] uppercase tracking-wider text-[#7E9F7C] block">
                    {product.categoryLabel}
                  </span>
                  <h5 className="font-serif text-base font-normal text-[#15271B] truncate leading-tight mt-0.5">
                    {product.name}
                  </h5>
                  <p className="font-serif text-sm font-semibold text-[#15271B] mt-1 tabular-nums">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        setIsWishlistOpen(false);
                      }}
                      className="px-3 py-1.5 bg-[#1C3524] hover:bg-[#264731] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 text-[#CAD8C8] hover:text-red-500 transition-colors cursor-pointer"
                  title="Remover dos favoritos"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#E8DECC] bg-[#FAF8F5]">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-full py-3 bg-[#FAF8F5] border border-[#CAD8C8] text-[#15271B] text-xs font-semibold rounded-2xl hover:bg-[#EBF0E9] transition-colors cursor-pointer"
          >
            Continuar Explorando
          </button>
        </div>

      </div>
    </div>
  );
};
