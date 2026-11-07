import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, AddOnItem } from '../data/products';

export interface CartItem {
  id: string; // unique cart entry id
  product: Product;
  quantity: number;
  selectedAddOns: AddOnItem[];
  giftMessage?: string;
  senderName?: string;
  recipientName?: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  deliveryDate: string;
  deliveryPeriod: 'manha' | 'tarde' | 'expressa';
  deliveryCep: string;
  toastMessage: string | null;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    addOns?: AddOnItem[],
    message?: string,
    sender?: string,
    recipient?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isProductInWishlist: (productId: string) => boolean;
  setDeliveryDate: (date: string) => void;
  setDeliveryPeriod: (period: 'manha' | 'tarde' | 'expressa') => void;
  setDeliveryCep: (cep: string) => void;
  showToast: (msg: string) => void;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bloomco_cart_v1';
const WISHLIST_STORAGE_KEY = 'bloomco_wishlist_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  // Delivery defaults: today's date formatted yyyy-mm-dd
  const todayStr = new Date().toISOString().split('T')[0];
  const [deliveryDate, setDeliveryDate] = useState(todayStr);
  const [deliveryPeriod, setDeliveryPeriod] = useState<'manha' | 'tarde' | 'expressa'>('tarde');
  const [deliveryCep, setDeliveryCep] = useState('01419-001');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    addOns: AddOnItem[] = [],
    giftMessage?: string,
    senderName?: string,
    recipientName?: string
  ) => {
    const cartItemId = `${product.id}-${Date.now()}`;
    const newItem: CartItem = {
      id: cartItemId,
      product,
      quantity,
      selectedAddOns: addOns,
      giftMessage,
      senderName,
      recipientName,
    };

    setCart(prev => [newItem, ...prev]);
    showToast(`"${product.name}" adicionado à sacola.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removido dos favoritos.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Adicionado aos favoritos!');
        return [...prev, productId];
      }
    });
  };

  const isProductInWishlist = (productId: string) => wishlist.includes(productId);

  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart total
  const cartTotal = cart.reduce((acc, item) => {
    const addOnsCost = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    return acc + (item.product.price + addOnsCost) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isQuickViewOpen,
        quickViewProduct,
        deliveryDate,
        deliveryPeriod,
        deliveryCep,
        toastMessage,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        openQuickView,
        closeQuickView,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isProductInWishlist,
        setDeliveryDate,
        setDeliveryPeriod,
        setDeliveryCep,
        showToast,
        cartTotal,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
