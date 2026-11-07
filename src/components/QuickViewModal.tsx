import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Heart, Sparkles, Check, Gift } from 'lucide-react';
import { Product, ADDONS_DATA, AddOnItem } from '../data/products';
import { useShop } from '../context/ShopContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart, toggleWishlist, isProductInWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnItem[]>([]);
  const [cardMessage, setCardMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');

  if (!isOpen || !product) return null;

  const isFav = isProductInWishlist(product.id);

  const toggleAddOn = (addon: AddOnItem) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const currentTotal = (product.price + addOnsTotal) * quantity;

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedAddOns,
      cardMessage,
      senderName,
      recipientName
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E8DECC] overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#15271B] flex items-center justify-center transition-all shadow-md cursor-pointer"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Big Product Image */}
          <div className="md:col-span-5 bg-[#FAF7F0] relative min-h-[320px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1C3524] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-sm">
                {product.tag}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute bottom-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#38462F] hover:bg-white shadow-md cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-[#38462F]' : ''}`} />
            </button>
          </div>

          {/* Right Column: Details & Customization Options */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#7E9F7C] uppercase tracking-wider font-medium mb-1.5">
                <span>{product.categoryLabel}</span>
                <span className="flex items-center gap-1 text-[#C49B5B]">
                  <Star className="w-3.5 h-3.5 fill-[#C49B5B]" />
                  <span className="text-[#15271B] font-mono tabular-nums font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-[#A7C1A5]">({product.reviewsCount} avaliações)</span>
                </span>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#15271B] leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#5D744F] mt-1 font-light">
                {product.subtitle}
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#15271B] tabular-nums">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A7C1A5] line-through tabular-nums">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-xs text-[#5D744F] ml-2">
                  ou 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-[#38462F] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Composition */}
              <div className="mt-4 pt-4 border-t border-[#FAF7F0]">
                <span className="text-[11px] uppercase tracking-wider text-[#7E9F7C] font-semibold block mb-2">
                  Flores & Elementos Selecionados:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.flowersIncluded.map((fl, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#FAF7F0] text-[#38462F] px-2.5 py-1 rounded-md border border-[#E8DECC]/50"
                    >
                      {fl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guarantee info */}
              <div className="mt-4 p-3 rounded-xl bg-[#EBF0E9]/80 border border-[#B5CBB1]/40 flex items-center gap-2.5 text-xs text-[#264731]">
                <ShieldCheck className="w-4 h-4 text-[#5F805D] shrink-0" />
                <span>{product.durability}</span>
              </div>

              {/* Personalization: Free Handwritten Gift Card */}
              <div className="mt-5 pt-4 border-t border-[#FAF7F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#15271B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C49B5B]" />
                    Cartão com Mensagem Caligrafada (Grátis)
                  </span>
                  <span className="text-[10px] text-[#5D744F]">Opcional</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Para quem é o presente?"
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E8DECC] rounded-lg text-[#15271B] placeholder-[#A7C1A5] focus:outline-none focus:border-[#5D744F]"
                  />
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="De quem é o presente?"
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E8DECC] rounded-lg text-[#15271B] placeholder-[#A7C1A5] focus:outline-none focus:border-[#5D744F]"
                  />
                </div>

                <textarea
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Escreva sua dedicatória sincera aqui. Nosso calígrafo escreverá à mão com tinta especial..."
                  rows={2}
                  maxLength={250}
                  className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-[#E8DECC] rounded-lg text-[#15271B] placeholder-[#A7C1A5] focus:outline-none focus:border-[#5D744F]"
                />
              </div>

              {/* Gift Add-ons */}
              <div className="mt-4 pt-3 border-t border-[#FAF7F0]">
                <span className="text-xs font-semibold text-[#15271B] block mb-2">
                  Deseja adicionar um mimo especial?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ADDONS_DATA.map((addon) => {
                    const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddOn(addon)}
                        className={`text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#EBF0E9] border-[#38462F] text-[#15271B]'
                            : 'bg-white border-[#E8DECC] text-[#38462F] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-medium truncate">{addon.name}</p>
                          <span className="text-[10px] text-[#7E9F7C] block tabular-nums">
                            + R$ {addon.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? 'bg-[#1C3524] border-[#1C3524] text-white'
                              : 'border-[#CAD8C8] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-6 pt-4 border-t border-[#FAF7F0] flex items-center justify-between gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#E8DECC] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs font-bold text-[#15271B] hover:bg-[#EBF0E9] transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold font-mono tabular-nums text-[#15271B]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs font-bold text-[#15271B] hover:bg-[#EBF0E9] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Total & Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-5 bg-[#1C3524] hover:bg-[#264731] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4 text-[#B5CBB1]" />
                <span>Adicionar · R$ {currentTotal.toFixed(2).replace('.', ',')}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
