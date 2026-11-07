import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Clock, Calendar, Check, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CartDrawerProps {
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    deliveryDate,
    setDeliveryDate,
    deliveryPeriod,
    setDeliveryPeriod,
  } = useShop();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 250.0;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const freeShippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD || cart.length === 0 ? 0 : 18.0;
  const pixDiscount = cartTotal * 0.05;
  const grandTotal = cartTotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      
      {/* Slide-over panel */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DECC]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8DECC] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1C3524]" />
            <h3 className="font-serif text-xl font-normal text-[#15271B]">
              Sacola de Presentes ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EBF0E9] text-[#15271B] transition-colors cursor-pointer"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#EBF0E9]/80 border-b border-[#CAD8C8]/60 text-xs text-[#2A3523]">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            {remainingForFreeShipping === 0 ? (
              <span className="flex items-center gap-1.5 text-[#38462F] font-semibold">
                <Check className="w-4 h-4 text-[#5F805D]" />
                Parabéns! Você ganhou Frete Grátis
              </span>
            ) : (
              <span>
                Faltam <strong className="tabular-nums">R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para Frete Grátis
              </span>
            )}
            <span className="font-mono tabular-nums">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div
              style={{ width: `${freeShippingProgress}%` }}
              className="h-full bg-[#5F805D] transition-all duration-500 rounded-full"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F0] flex items-center justify-center mx-auto text-[#7E9F7C]">
                <Gift className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl text-[#15271B]">Sua sacola está vazia</h4>
              <p className="text-xs text-[#5D744F] max-w-xs mx-auto font-light">
                Escolha um buquê ou arranjo especial para surpreender quem você ama hoje.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-[#1C3524] text-white text-xs font-semibold rounded-full hover:bg-[#264731]"
              >
                Ver Buquês
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemAddOnsTotal = item.selectedAddOns.reduce((s, a) => s + a.price, 0);
              const itemUnitPrice = item.product.price + itemAddOnsTotal;

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-[#E8DECC] bg-white flex gap-3.5 relative shadow-xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover bg-[#FAF7F0] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h5 className="font-serif text-base font-normal text-[#15271B] leading-snug truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-[#7E9F7C] font-mono tabular-nums">
                      R$ {itemUnitPrice.toFixed(2).replace('.', ',')} cada
                    </p>

                    {/* Add-ons list if any */}
                    {item.selectedAddOns.length > 0 && (
                      <div className="mt-1 space-y-0.5">
                        {item.selectedAddOns.map((addon) => (
                          <span
                            key={addon.id}
                            className="text-[10px] text-[#495C3D] block truncate font-light"
                          >
                            + {addon.name} (R$ {addon.price.toFixed(2).replace('.', ',')})
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Gift note indicator */}
                    {item.giftMessage && (
                      <span className="text-[10px] text-[#C49B5B] flex items-center gap-1 mt-1 font-medium">
                        <Sparkles className="w-2.5 h-2.5" />
                        Com cartão personalizado
                      </span>
                    )}

                    {/* Quantity control */}
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="flex items-center border border-[#E8DECC] rounded-lg overflow-hidden text-xs bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-[#EBF0E9] text-[#15271B] font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono tabular-nums font-semibold text-[#15271B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-[#EBF0E9] text-[#15271B] font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#15271B] font-mono tabular-nums ml-auto">
                        R$ {(itemUnitPrice * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-[#CAD8C8] hover:text-red-600 transition-colors cursor-pointer"
                    aria-label="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}

          {/* Delivery Scheduling Options */}
          {cart.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DECC] space-y-3">
              <span className="text-xs font-semibold text-[#15271B] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#5D744F]" />
                Agendar Data & Período de Entrega
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#7E9F7C] uppercase tracking-wider block mb-1">
                    Data da Entrega
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#CAD8C8] rounded-lg text-xs text-[#15271B] focus:outline-none focus:border-[#5D744F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#7E9F7C] uppercase tracking-wider block mb-1">
                    Horário Preferencial
                  </label>
                  <select
                    value={deliveryPeriod}
                    onChange={(e) => setDeliveryPeriod(e.target.value as any)}
                    className="w-full px-2 py-1.5 bg-white border border-[#CAD8C8] rounded-lg text-xs text-[#15271B] focus:outline-none focus:border-[#5D744F]"
                  >
                    <option value="manha">Manhã (08h às 12h)</option>
                    <option value="tarde">Tarde (13h às 18h)</option>
                    <option value="expressa">Expressa (Até 2 horas)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Subtotals & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E8DECC] bg-[#FAF8F5] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5D744F]">
              <div className="flex justify-between">
                <span>Subtotal dos Presentes</span>
                <span className="font-mono tabular-nums text-[#15271B]">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Frete Especial</span>
                <span className="font-mono tabular-nums text-[#15271B]">
                  {shippingCost === 0 ? (
                    <strong className="text-[#5F805D]">GRÁTIS</strong>
                  ) : (
                    `R$ ${shippingCost.toFixed(2).replace('.', ',')}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[#5F805D] text-[11px]">
                <span>Desconto no PIX (5% OFF)</span>
                <span className="font-mono tabular-nums">
                  - R$ {pixDiscount.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8DECC] flex justify-between text-base font-semibold text-[#15271B]">
                <span className="font-serif">Total Estimado</span>
                <span className="font-serif text-xl font-bold tabular-nums">
                  R$ {grandTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedCheckout();
              }}
              className="w-full py-3.5 bg-[#1C3524] hover:bg-[#264731] text-white text-xs sm:text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Concluir Pedido com Florista</span>
              <ArrowRight className="w-4 h-4 text-[#B5CBB1]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
