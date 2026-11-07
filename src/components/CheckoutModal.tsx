import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, QrCode, Copy, Check, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartTotal, deliveryDate, deliveryPeriod, clearCart, showToast } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'pix'>('whatsapp');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressBairro, setAddressBairro] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');

  const [copiedPix, setCopiedPix] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 250.0;
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 18.0;
  const pixDiscount = paymentMethod === 'pix' ? cartTotal * 0.05 : 0;
  const finalTotal = cartTotal + shippingCost - pixDiscount;

  const pixCode = `00020126580014BR.GOV.BCB.PIX0136pix@bloomandco.com.br520400005303986540${finalTotal.toFixed(2)}5802BR5920BLOOM CO FLORICULTURA6009SAO PAULO62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiedPix(true);
    showToast('Código PIX copiado com sucesso!');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleConfirmOrder = () => {
    const randomId = `BL-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderId(randomId);

    if (paymentMethod === 'whatsapp') {
      // Build nicely formatted WhatsApp message
      const itemsList = cart
        .map((item) => `• ${item.quantity}x ${item.product.name} (R$ ${item.product.price.toFixed(2)})`)
        .join('%0A');

      const msg = `*NOVO PEDIDO FLORAL BLOOM %26 CO (${randomId})*%0A%0A` +
        `*Itens:*%0A${itemsList}%0A%0A` +
        `*Data da Entrega:* ${deliveryDate} (${deliveryPeriod})%0A` +
        `*Destinatário:* ${recipientName || 'A definir'}%0A` +
        `*Endereço:* ${addressStreet}, ${addressNumber} - ${addressBairro}%0A` +
        `*Observações:* ${deliveryNote || 'Nenhuma'}%0A` +
        `*Remetente:* ${senderName || 'Anônimo'} (${senderPhone})%0A` +
        `*Total Estimado:* R$ ${finalTotal.toFixed(2)}%0A%0A` +
        `_Olá! Gostaria de confirmar meu pedido e receber as fotos das flores antes do envio!_`;

      window.open(`https://wa.me/5511999998888?text=${msg}`, '_blank');
    }

    setOrderConfirmed(true);
    clearCart();
    showToast(`Pedido ${randomId} registrado com sucesso!`);
  };

  const handleReset = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8DECC] overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8DECC] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C49B5B]" />
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#15271B]">
              {orderConfirmed ? 'Pedido Registrado com Sucesso' : 'Finalizar Pedido com Carinho'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-[#EBF0E9] text-[#15271B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Order Confirmed View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#EBF0E9] text-[#264731] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10 text-[#5F805D]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#5D744F] font-semibold">
                Pedido {confirmedOrderId}
              </span>
              <h4 className="font-serif text-3xl font-normal text-[#15271B] mt-1">
                Flores em Preparação!
              </h4>
              <p className="text-xs sm:text-sm text-[#495C3D] mt-2 max-w-md mx-auto leading-relaxed font-light">
                Nossos floristas já receberam as especificações do seu presente. Enviaremos uma foto do arranjo real pelo WhatsApp antes de sair para o trajeto!
              </p>
            </div>

            {/* Simulated Live Timeline */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8DECC] text-left max-w-md mx-auto space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1C3524] text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#15271B]">Pedido Confirmado</p>
                  <p className="text-[10px] text-[#7E9F7C]">Hoje · Aguardando separação botânica</p>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-80">
                <div className="w-6 h-6 rounded-full bg-[#C49B5B] text-white flex items-center justify-center text-xs font-bold animate-pulse">
                  2
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#15271B]">Montagem & Caligrafia</p>
                  <p className="text-[10px] text-[#7E9F7C]">Florista preparando haste por haste</p>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <div className="w-6 h-6 rounded-full bg-[#E8DECC] text-[#7E9F7C] flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#15271B]">Transporte Climatizado</p>
                  <p className="text-[10px] text-[#7E9F7C]">Agendado para: {deliveryDate} ({deliveryPeriod})</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#1C3524] text-white text-xs font-semibold rounded-full hover:bg-[#264731] transition-all cursor-pointer shadow-md"
            >
              Voltar à Loja
            </button>
          </div>
        ) : (
          /* Form View */
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Recipient Information */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
                1. Quem vai receber este presente especial?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Nome do destinatário *"
                  className="px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
                />
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="WhatsApp do destinatário (para aviso discreto)"
                  className="px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
                2. Endereço da Entrega
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={addressStreet}
                  onChange={(e) => setAddressStreet(e.target.value)}
                  placeholder="Rua / Avenida *"
                  className="sm:col-span-2 px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
                />
                <input
                  type="text"
                  required
                  value={addressNumber}
                  onChange={(e) => setAddressNumber(e.target.value)}
                  placeholder="Número e Compl. *"
                  className="px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={addressBairro}
                  onChange={(e) => setAddressBairro(e.target.value)}
                  placeholder="Bairro (ex: Jardins / Moema / Centro)"
                  className="px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
                />
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Observação (ex: É surpresa, portaria 24h)"
                  className="px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
                />
              </div>
            </div>

            {/* Sender Information */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
                3. Seus Dados (Quem está enviando)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
                />
                <input
                  type="tel"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="Seu WhatsApp (para envio da foto do buquê)"
                  className="px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
                4. Escolha como prefere finalizar
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option A: WhatsApp Concierge */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'whatsapp'
                      ? 'bg-[#EBF0E9] border-[#1C3524] ring-1 ring-[#1C3524]'
                      : 'bg-white border-[#E8DECC] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 text-[#5F805D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#15271B] block">
                      Concluir no WhatsApp (Recomendado)
                    </span>
                    <span className="text-[11px] text-[#5D744F] block mt-0.5 leading-snug">
                      Fale com um florista, veja foto do arranjo antes do envio e pague via PIX ou link de cartão.
                    </span>
                  </div>
                </button>

                {/* Option B: Direct PIX */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'bg-[#EBF0E9] border-[#1C3524] ring-1 ring-[#1C3524]'
                      : 'bg-white border-[#E8DECC] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#C49B5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#15271B] flex items-center gap-1.5">
                      Pagar via PIX Direto
                      <span className="text-[10px] bg-[#5F805D] text-white px-1.5 py-0.2 rounded font-bold">
                        -5% OFF
                      </span>
                    </span>
                    <span className="text-[11px] text-[#5D744F] block mt-0.5 leading-snug">
                      Gere o código Copia e Cola instantâneo com aprovação imediata.
                    </span>
                  </div>
                </button>
              </div>

              {/* PIX Copy & Paste Box */}
              {paymentMethod === 'pix' && (
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#CAD8C8] space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#15271B]">
                    <span>Chave PIX Copia e Cola</span>
                    <span className="text-[#5F805D] font-mono tabular-nums">
                      R$ {finalTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixCode}
                      className="w-full text-[11px] font-mono bg-white border border-[#CAD8C8] px-3 py-2 rounded-xl text-[#5D744F] truncate"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-3 py-2 bg-[#1C3524] hover:bg-[#264731] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Summary strip and Submit */}
            <div className="pt-4 border-t border-[#E8DECC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#7E9F7C] block">Total do Pedido:</span>
                <span className="font-serif text-2xl font-bold text-[#15271B] tabular-nums">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
                {paymentMethod === 'pix' && (
                  <span className="text-[10px] text-[#5F805D] block font-medium">
                    (Já aplicado desconto de 5% no PIX)
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1C3524] hover:bg-[#264731] text-white text-xs sm:text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>
                  {paymentMethod === 'whatsapp' ? 'Enviar Pedido pelo WhatsApp' : 'Confirmar Pagamento PIX'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#B5CBB1]" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
