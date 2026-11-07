import React, { useState } from 'react';
import { ArrowRight, MessageCircle, MapPin, Phone, Mail, Instagram, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    showToast('Cupom BEMVINDO10 enviado com sucesso para o seu e-mail!');
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="mt-20">
      
      {/* Pre-Footer Action Banner (Directly from reference design bottom section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-3xl bg-[#172B1D] text-white p-8 sm:p-12 border border-[#264731] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center font-serif text-2xl text-[#E8DECC] shrink-0">
              ❦
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
                Floresça o dia de alguém hoje mesmo
              </h3>
              <p className="text-xs sm:text-sm text-[#B5CBB1] mt-1 font-light">
                Faça seu pedido online em menos de 2 minutos ou fale diretamente com nossos floristas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => scrollToSection('catalogo')}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FAF8F5] text-[#172B1D] text-xs font-semibold hover:bg-[#E8DECC] transition-all cursor-pointer whitespace-nowrap shadow-sm hover:shadow"
            >
              <span>Explorar o Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://wa.me/5511999998888?text=Olá!%20Gostaria%20de%20montar%20um%20arranjo%20personalizado."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-[#FAF8F5] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap border border-[#FAF8F5]/20"
            >
              <MessageCircle className="w-4 h-4 text-[#A7C1A5]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="bg-[#15271B] text-[#FAF8F5] pt-16 pb-12 border-t border-[#264731]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Newsletter & Brand Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF8F5]/10">
            
            {/* Brand Intro */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-serif text-[#C49B5B]">❦</span>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Bloom & Co.
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#D6E2D3] leading-relaxed max-w-sm font-light">
                Floricultura boutique de arte floral e presentes afetivos. Criamos memórias olfativas e visuais inesquecíveis através da pureza das flores nobres.
              </p>
              <div className="flex items-center gap-3 text-xs text-[#B5CBB1]">
                <Clock className="w-4 h-4 text-[#C49B5B]" />
                <span>Atendimento: Seg à Sáb das 8h às 20h · Dom 9h às 15h</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="lg:col-span-7 bg-[#1C3524] p-6 sm:p-7 rounded-2xl border border-[#FAF8F5]/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C49B5B] font-semibold block mb-1">
                  Clube de Boas-Vindas
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-normal text-white">
                  Receba 10% OFF no seu primeiro presente
                </h4>
                <p className="text-xs text-[#B5CBB1] mt-1 font-light">
                  Cadastre seu e-mail para receber sugestões de presentes para datas comemorativas e descontos exclusivos.
                </p>
              </div>

              {subscribed ? (
                <div className="mt-4 p-3 rounded-xl bg-[#264731] border border-[#7E9F7C] text-xs text-[#FAF8F5]">
                  ✨ Obrigado! Use o cupom <strong>BEMVINDO10</strong> no checkout para 10% de desconto.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Seu melhor e-mail..."
                    required
                    className="flex-1 px-4 py-2.5 bg-[#15271B] border border-[#FAF8F5]/20 rounded-xl text-xs text-white placeholder-[#7E9F7C] focus:outline-none focus:border-[#C49B5B]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#FAF8F5] text-[#15271B] font-semibold text-xs rounded-xl hover:bg-[#E8DECC] transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    Resgatar 10% OFF
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Links & Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#FAF8F5]/10 text-xs">
            
            {/* Column 1: Navegação */}
            <div className="space-y-3">
              <p className="font-semibold text-sm text-white tracking-wide uppercase font-sans">
                Navegação
              </p>
              <ul className="space-y-2 text-[#B5CBB1]">
                <li>
                  <button onClick={() => scrollToSection('catalogo')} className="hover:text-white transition-colors cursor-pointer">
                    Buquês de Flores
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('categorias')} className="hover:text-white transition-colors cursor-pointer">
                    Flower Boxes & Luxo
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('categorias')} className="hover:text-white transition-colors cursor-pointer">
                    Cestas & Kits Gourmet
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('ocasioes')} className="hover:text-white transition-colors cursor-pointer">
                    Presentes de Aniversário
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('ocasioes')} className="hover:text-white transition-colors cursor-pointer">
                    Flores para Romantismo
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Atendimento e Dúvidas */}
            <div className="space-y-3">
              <p className="font-semibold text-sm text-white tracking-wide uppercase font-sans">
                Atendimento
              </p>
              <ul className="space-y-2 text-[#B5CBB1]">
                <li>
                  <a href="#diferenciais" className="hover:text-white transition-colors">
                    Guia de Cuidados com as Flores
                  </a>
                </li>
                <li>
                  <a href="#diferenciais" className="hover:text-white transition-colors">
                    Política de Entrega no Mesmo Dia
                  </a>
                </li>
                <li>
                  <a href="#diferenciais" className="hover:text-white transition-colors">
                    Garantia de Frescor de 7 Dias
                  </a>
                </li>
                <li>
                  <a href="#depoimentos" className="hover:text-white transition-colors">
                    Perguntas Frequentes (FAQ)
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/5511999998888" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Central de Ajuda WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: O Atelier */}
            <div className="space-y-3">
              <p className="font-semibold text-sm text-white tracking-wide uppercase font-sans">
                Nosso Atelier
              </p>
              <div className="space-y-2.5 text-[#B5CBB1]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C49B5B] shrink-0 mt-0.5" />
                  <span>Alameda dos Aromas, 420 — Jardins, São Paulo - SP</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C49B5B] shrink-0" />
                  <span>(11) 3280-4490 · Concierge</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C49B5B] shrink-0" />
                  <span>contato@bloomandco.com.br</span>
                </p>
              </div>
            </div>

            {/* Column 4: Redes & Pagamento */}
            <div className="space-y-3">
              <p className="font-semibold text-sm text-white tracking-wide uppercase font-sans">
                Conecte-se
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#1C3524] hover:bg-[#264731] border border-[#FAF8F5]/10 flex items-center justify-center text-[#B5CBB1] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/5511999998888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#1C3524] hover:bg-[#264731] border border-[#FAF8F5]/10 flex items-center justify-center text-[#B5CBB1] hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-2">
                <p className="text-[11px] text-[#A7C1A5] uppercase tracking-wider mb-2 font-medium">
                  Pagamento Seguro
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] text-[#D6E2D3]">
                  <span className="px-2 py-1 bg-[#1C3524] rounded border border-[#FAF8F5]/10">PIX (-5%)</span>
                  <span className="px-2 py-1 bg-[#1C3524] rounded border border-[#FAF8F5]/10">Visa</span>
                  <span className="px-2 py-1 bg-[#1C3524] rounded border border-[#FAF8F5]/10">Mastercard</span>
                  <span className="px-2 py-1 bg-[#1C3524] rounded border border-[#FAF8F5]/10">Até 6x</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Security Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E9F7C]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5F805D]" />
              <span>Bloom & Co. Comércio de Flores e Presentes Ltda. · CNPJ 38.291.402/0001-88</span>
            </div>

            <div className="flex items-center gap-4">
              <span>Feito com carinho para presentear quem você ama</span>
              <button
                onClick={scrollToTop}
                className="text-[#D6E2D3] hover:text-white transition-colors cursor-pointer underline"
              >
                Voltar ao topo ↑
              </button>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};
