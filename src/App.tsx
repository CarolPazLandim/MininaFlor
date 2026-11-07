import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OccasionsSection } from './components/OccasionsSection';
import { CategoriesSection } from './components/CategoriesSection';
import { BestSellersSection } from './components/BestSellersSection';
import { PromoBannerSection } from './components/PromoBannerSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CustomKitModal } from './components/CustomKitModal';
import { Sparkles, MessageCircle } from 'lucide-react';

const FloriculturaContent: React.FC = () => {
  const {
    isQuickViewOpen,
    quickViewProduct,
    closeQuickView,
    toastMessage,
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomKitOpen, setIsCustomKitOpen] = useState(false);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectOccasion = (occasionId: string) => {
    setSelectedOccasion(occasionId);
    scrollToCatalog();
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2E23] flex flex-col font-sans selection:bg-[#7E9F7C]/20">
      
      {/* 1. Header */}
      <Header />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* 2. Hero Principal */}
        <Hero
          onExploreClick={scrollToCatalog}
          onCustomKitClick={() => setIsCustomKitOpen(true)}
        />

        {/* 3. Ocasiões Especiais */}
        <OccasionsSection
          onSelectOccasion={handleSelectOccasion}
          selectedOccasion={selectedOccasion}
        />

        {/* 4. Categorias */}
        <CategoriesSection
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />

        {/* 5. Mais Vendidos & Catálogo */}
        <BestSellersSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedOccasion={selectedOccasion}
          onClearOccasion={() => setSelectedOccasion(null)}
        />

        {/* 6. Seção Especial / Banner Promocional de Entrega Rápida */}
        <PromoBannerSection onOrderNow={scrollToCatalog} />

        {/* 7. Nossos Diferenciais */}
        <DifferentialsSection />

        {/* 8. Depoimentos & Avaliações */}
        <TestimonialsSection />

      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Floating Concierge Action on Mobile/Desktop */}
      <div className="fixed bottom-6 right-6 z-30">
        <a
          href="https://wa.me/5511999998888?text=Olá!%20Gostaria%20de%20ajuda%20para%20escolher%20um%20presente%20floral%20especial."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#1C3524] text-white rounded-full shadow-2xl hover:bg-[#264731] transition-all hover:scale-105 border border-[#FAF8F5]/20 cursor-pointer"
          title="Fale no WhatsApp"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#A7C1A5] animate-ping" />
          <MessageCircle className="w-5 h-5 text-[#A7C1A5]" />
          <span className="text-xs font-semibold tracking-wide pr-1 hidden sm:inline">
            Plantão Florista WhatsApp
          </span>
        </a>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#15271B] text-[#FAF8F5] text-xs font-medium px-5 py-3 rounded-full shadow-2xl border border-[#264731] flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#C49B5B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />

      {/* Cart Drawer */}
      <CartDrawer
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer />

      {/* Live Search Modal */}
      <SearchModal />

      {/* Custom Kit Builder Modal */}
      <CustomKitModal
        isOpen={isCustomKitOpen}
        onClose={() => setIsCustomKitOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <FloriculturaContent />
    </ShopProvider>
  );
}
