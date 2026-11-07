import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      {bannerVisible && (
        <div className="bg-[#1C3524] text-[#E8DECC] text-xs py-2 px-4 text-center transition-all flex items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#C49B5B]" />
            Entrega expressa hoje para pedidos até 17h · Frete grátis acima de R$ 250
          </span>
          <button
            onClick={() => setBannerVisible(false)}
            className="ml-3 text-[#A7C1A5] hover:text-white text-xs opacity-70 hover:opacity-100 cursor-pointer"
            aria-label="Fechar anúncio"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Header conforming to 3-zone contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8DECC]/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="group text-left cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-full bg-[#1C3524] text-[#FAF8F5] flex items-center justify-center font-serif text-xl font-light shadow-sm transition-transform group-hover:scale-105">
                ❦
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#15271B] whitespace-nowrap block leading-none">
                  Bloom & Co.
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#5D744F] font-sans font-medium block mt-0.5">
                  Flores & Presentes
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#38462F]">
            <button
              onClick={() => scrollToSection('catalogo')}
              className="hover:text-[#15271B] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#5D744F]"
            >
              Catálogo
            </button>
            <button
              onClick={() => scrollToSection('ocasioes')}
              className="hover:text-[#15271B] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#5D744F]"
            >
              Ocasiões
            </button>
            <button
              onClick={() => scrollToSection('categorias')}
              className="hover:text-[#15271B] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#5D744F]"
            >
              Presentes & Mimos
            </button>
            <button
              onClick={() => scrollToSection('diferenciais')}
              className="hover:text-[#15271B] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#5D744F]"
            >
              Nossos Diferenciais
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className="hover:text-[#15271B] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#5D744F]"
            >
              Avaliações
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Cart, WhatsApp CTA) */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#38462F] hover:text-[#15271B] hover:bg-[#EBF0E9]/60 rounded-full transition-colors cursor-pointer"
              title="Buscar flores e presentes"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#38462F] hover:text-[#15271B] hover:bg-[#EBF0E9]/60 rounded-full transition-colors cursor-pointer"
              title="Meus favoritos"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#7E9F7C] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#38462F] hover:text-[#15271B] hover:bg-[#EBF0E9]/60 rounded-full transition-colors cursor-pointer"
              title="Sacola de presentes"
              aria-label="Sacola"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1C3524] text-[#FAF8F5] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button (WhatsApp Concierge) */}
            <a
              href="https://wa.me/5511999998888?text=Olá!%20Gostaria%20de%20ajuda%20para%20escolher%20um%20presente%20floral%20especial."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide text-[#FAF8F5] bg-[#1C3524] hover:bg-[#264731] rounded-full transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#A7C1A5]" />
              Falar com Florista
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#15271B] hover:bg-[#EBF0E9] rounded-lg transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8DECC] px-5 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('catalogo')}
              className="block w-full text-left py-2 text-base font-medium text-[#15271B] border-b border-[#E8DECC]/40"
            >
              Catálogo de Flores
            </button>
            <button
              onClick={() => scrollToSection('ocasioes')}
              className="block w-full text-left py-2 text-base font-medium text-[#15271B] border-b border-[#E8DECC]/40"
            >
              Ocasiões Especiais
            </button>
            <button
              onClick={() => scrollToSection('categorias')}
              className="block w-full text-left py-2 text-base font-medium text-[#15271B] border-b border-[#E8DECC]/40"
            >
              Presentes & Mimos
            </button>
            <button
              onClick={() => scrollToSection('diferenciais')}
              className="block w-full text-left py-2 text-base font-medium text-[#15271B] border-b border-[#E8DECC]/40"
            >
              Nossos Diferenciais
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className="block w-full text-left py-2 text-base font-medium text-[#15271B] border-b border-[#E8DECC]/40"
            >
              Depoimentos de Clientes
            </button>
            <div className="pt-2">
              <a
                href="https://wa.me/5511999998888?text=Olá!%20Gostaria%20de%20ajuda%20para%20escolher%20um%20presente%20floral%20especial."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[#FAF8F5] bg-[#1C3524] rounded-xl"
              >
                <MessageCircle className="w-4 h-4 text-[#A7C1A5]" />
                Atendimento no WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
