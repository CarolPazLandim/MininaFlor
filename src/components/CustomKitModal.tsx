import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, Gift, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../data/products';

interface CustomKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomKitModal: React.FC<CustomKitModalProps> = ({ isOpen, onClose }) => {
  const { addToCart } = useShop();

  const bases = [
    { id: 'caixa', name: 'Flower Box Redonda de Luxo', price: 140.0, desc: 'Caixa cartonada aveludada com fita de cetim' },
    { id: 'buque', name: 'Embrulho Artesanal em Papel Kraft', price: 90.0, desc: 'Camadas de papel ecológico de alta gramatura' },
    { id: 'cesta', name: 'Cesta Rústica de Madeira Nobre', price: 160.0, desc: 'Caixa de madeira com palha natural e alça' },
  ];

  const flowers = [
    { id: 'peonias', name: 'Peônias Holandesas & Rosas Spray', price: 120.0 },
    { id: 'rosas', name: 'Rosas Colombianas Selecionadas', price: 90.0 },
    { id: 'tulipas', name: 'Tulipas Rosa & Pêssego', price: 80.0 },
    { id: 'silvestres', name: 'Mix Silvestre Campo Europeu', price: 70.0 },
  ];

  const ribbons = [
    { id: 'salvia', name: 'Verde Sálvia Acetinado', color: '#7C8E77' },
    { id: 'blush', name: 'Rosé Blush Sedoso', color: '#E8C4BE' },
    { id: 'champagne', name: 'Champagne Dourado', color: '#D8B273' },
    { id: 'oliva', name: 'Verde Oliva Profundo', color: '#435038' },
  ];

  const treats = [
    { id: 'bombons', name: 'Caixa de Trufas Suíças Lindt (120g)', price: 49.90 },
    { id: 'vela', name: 'Vela Botânica de Soja Lavanda & Baunilha', price: 39.90 },
    { id: 'espumante', name: 'Espumante Baby Chandon Brut (187ml)', price: 59.90 },
    { id: 'mel', name: 'Pote de Mel Puro com Favos & Dosador', price: 35.00 },
  ];

  const [selectedBase, setSelectedBase] = useState(bases[0]);
  const [selectedFlower, setSelectedFlower] = useState(flowers[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(ribbons[0]);
  const [selectedTreats, setSelectedTreats] = useState<typeof treats>([]);
  const [cardMessage, setCardMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');

  if (!isOpen) return null;

  const treatsTotal = selectedTreats.reduce((acc, t) => acc + t.price, 0);
  const total = selectedBase.price + selectedFlower.price + treatsTotal;

  const toggleTreat = (treat: typeof treats[0]) => {
    if (selectedTreats.some((t) => t.id === treat.id)) {
      setSelectedTreats(selectedTreats.filter((t) => t.id !== treat.id));
    } else {
      setSelectedTreats([...selectedTreats, treat]);
    }
  };

  const handleAddCustomKit = () => {
    const customProduct: Product = {
      id: `kit-personalizado-${Date.now()}`,
      name: `Kit Exclusivo: ${selectedBase.name}`,
      subtitle: `${selectedFlower.name} · Fita ${selectedRibbon.name}`,
      category: 'caixas',
      categoryLabel: 'Kit Autoral Personalizado',
      occasion: 'surpresa',
      price: total,
      rating: 5.0,
      reviewsCount: 1,
      image: selectedBase.id === 'cesta'
        ? '/images/category-gift-basket.jpg'
        : selectedBase.id === 'buque'
        ? '/images/hero-bouquet.jpg'
        : '/images/category-flower-box.jpg',
      description: `Composição personalizada feita sob medida. Base: ${selectedBase.name}. Flores: ${selectedFlower.name}. Laço: ${selectedRibbon.name}.`,
      flowersIncluded: [selectedFlower.name, 'Eucalipto', 'Folhagens'],
      dimensions: 'Composição exclusiva artesanal',
      durability: 'Garantia de 7 dias de frescor',
    };

    addToCart(customProduct, 1, [], cardMessage, undefined, recipientName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8DECC] overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8DECC] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C49B5B]" />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#15271B]">
                Monte seu Presente Perfeito
              </h3>
              <p className="text-xs text-[#5D744F] font-light">
                Escolha a base, as flores e os mimos para um presente único e autoral.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EBF0E9] text-[#15271B] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Base */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
              1. Escolha a Base do Arranjo
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {bases.map((base) => {
                const isSelected = selectedBase.id === base.id;
                return (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => setSelectedBase(base)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBF0E9] border-[#1C3524] ring-1 ring-[#1C3524]'
                        : 'bg-white border-[#E8DECC] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#15271B]">{base.name}</p>
                      <p className="text-[10px] text-[#5D744F] mt-0.5">{base.desc}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#15271B] mt-2 block">
                      R$ {base.price.toFixed(2).replace('.', ',')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Flowers */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
              2. Escolha as Flores Nobres Principais
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {flowers.map((fl) => {
                const isSelected = selectedFlower.id === fl.id;
                return (
                  <button
                    key={fl.id}
                    type="button"
                    onClick={() => setSelectedFlower(fl)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBF0E9] border-[#1C3524] ring-1 ring-[#1C3524]'
                        : 'bg-white border-[#E8DECC] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#15271B]">{fl.name}</p>
                      <span className="text-[10px] text-[#7E9F7C] font-mono tabular-nums">
                        + R$ {fl.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#1C3524]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Ribbon */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
              3. Cor da Fita de Seda
            </span>
            <div className="flex flex-wrap gap-2.5">
              {ribbons.map((rib) => {
                const isSelected = selectedRibbon.id === rib.id;
                return (
                  <button
                    key={rib.id}
                    type="button"
                    onClick={() => setSelectedRibbon(rib)}
                    className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C3524] text-white border-[#1C3524]'
                        : 'bg-white text-[#15271B] border-[#E8DECC] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: rib.color }}
                      className="w-3.5 h-3.5 rounded-full border border-white/50 shrink-0"
                    />
                    <span>{rib.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Treats */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
              4. Mimos e Acompanhamentos Gourmet
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {treats.map((treat) => {
                const isSelected = selectedTreats.some((t) => t.id === treat.id);
                return (
                  <button
                    key={treat.id}
                    type="button"
                    onClick={() => toggleTreat(treat)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBF0E9] border-[#1C3524] text-[#15271B]'
                        : 'bg-white border-[#E8DECC] text-[#38462F] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-medium truncate">{treat.name}</p>
                      <span className="text-[10px] text-[#7E9F7C] font-mono tabular-nums">
                        + R$ {treat.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-[#1C3524] border-[#1C3524] text-white' : 'border-[#CAD8C8]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Card */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#5D744F] font-bold block">
              5. Cartão com Dedicatória Caligrafada (Grátis)
            </span>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Nome de quem vai receber..."
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F] mb-2"
            />
            <textarea
              rows={2}
              value={cardMessage}
              onChange={(e) => setCardMessage(e.target.value)}
              placeholder="Escreva sua dedicatória sincera..."
              className="w-full p-3 text-xs bg-[#FAF8F5] border border-[#CAD8C8] rounded-xl text-[#15271B] focus:outline-none focus:border-[#38462F]"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#E8DECC] bg-[#FAF8F5] flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#7E9F7C] block">Total do Kit:</span>
            <span className="font-serif text-2xl font-bold text-[#15271B] tabular-nums">
              R$ {total.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button
            onClick={handleAddCustomKit}
            className="px-6 py-3 bg-[#1C3524] hover:bg-[#264731] text-white text-xs sm:text-sm font-semibold rounded-2xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-[#B5CBB1]" />
            <span>Colocar na Sacola</span>
          </button>
        </div>

      </div>
    </div>
  );
};
