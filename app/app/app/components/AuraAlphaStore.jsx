'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==================== CONFIGURACIÓN ====================
const SECURE_CONFIG = {
  contact: {
    phone: '+34 603065001',
    email: 'asistenteauraalpha@gmail.com',
    storeName: 'Aura Alpha'
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SRwKZRN9lllpL6LNv1qGyveW5M7UcWGDi7LnCjjDSNXBTU5adZPZNJOmbDjtipxUBUj1XEAq7Hnm4YTNzLBsbHQ00FRtojE7t',
  }
};

// Iconos SVG profesionales
const PaymentIcons = {
  visa: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9.6 8.4H6.8V15.6H9.6V8.4Z" fill="#1A1F71"/>
      <path d="M6.8 8.4C5.8 8.4 5 9.2 5 10.2V13.8C5 14.8 5.8 15.6 6.8 15.6H9.6V8.4H6.8Z" fill="#1A1F71"/>
      <path d="M17.2 8.4H14.4V15.6H17.2C18.2 15.6 19 14.8 19 13.8V10.2C19 9.2 18.2 8.4 17.2 8.4Z" fill="#1A1F71"/>
      <path d="M12.5 12C12.5 10.9 13.2 10 14.1 9.7C13.7 9.3 13.1 9 12.4 9C10.9 9 9.7 10.2 9.7 11.7C9.7 13.2 10.9 14.4 12.4 14.4C13.1 14.4 13.7 14.1 14.1 13.7C13.2 13.4 12.5 12.5 12.5 12Z" fill="#FF5F00"/>
    </svg>
  ),
  paypal: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M19.5 7.5C19.2 9.1 18.3 10.5 16.9 11.4C15.5 12.3 13.7 12.8 11.8 12.8H10.5L9.5 18.5H7L8.5 10.5H9.8C11.4 10.5 12.8 10.1 13.9 9.4C15 8.7 15.8 7.7 16.1 6.5C16.3 5.7 16.3 5 16.2 4.3C16.8 4.6 17.3 5.1 17.7 5.7C18.1 6.3 18.4 7 18.5 7.7C18.6 8.1 18.6 8.5 18.5 8.9C18.5 9.1 19.5 7.5 19.5 7.5Z" fill="#003087"/>
      <path d="M7.5 4.5C7.8 3.9 8.3 3.4 8.9 3.1C9.5 2.8 10.2 2.7 10.9 2.8C11.6 2.9 12.2 3.2 12.7 3.7C13.2 4.2 13.5 4.8 13.6 5.5C13.7 6.2 13.6 6.9 13.3 7.5C13 8.1 12.5 8.6 11.9 8.9C11.3 9.2 10.6 9.3 9.9 9.2C9.2 9.1 8.6 8.8 8.1 8.3C7.6 7.8 7.3 7.2 7.2 6.5C7.1 5.8 7.2 5.1 7.5 4.5Z" fill="#003087"/>
    </svg>
  ),
  applepay: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18.7 12.1C18.6 9.5 20.8 8.2 20.9 8.1C19.7 6.4 17.9 6.2 17.3 6.1C15.6 5.9 13.9 7.1 13.1 7.1C12.3 7.1 10.9 6.2 9.5 6.2C7.1 6.2 5 8 5 11.2C5 12.6 5.3 14 5.9 15.5C6.7 17.3 7.9 19.4 9.5 19.3C10.8 19.2 11.4 18.4 13.1 18.4C14.8 18.4 15.3 19.3 16.7 19.3C18.3 19.2 19.3 17.4 20.1 15.6C20.5 14.7 20.7 13.9 20.7 13.8C20.7 13.8 20.6 13.7 20.5 13.7C20.4 13.7 19.9 14 18.7 12.1Z" fill="#000"/>
      <path d="M16.2 4.5C16.9 3.6 17.4 2.4 17.2 1.3C16.2 1.4 15 2.1 14.3 3C13.6 3.8 13 5 13.2 6.1C14.3 6.2 15.4 5.5 16.2 4.5Z" fill="#000"/>
    </svg>
  ),
  bizum: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2Z" fill="#00B3B0"/>
      <path d="M16.5 9.5H7.5C7.2 9.5 7 9.7 7 10V14C7 14.3 7.2 14.5 7.5 14.5H16.5C16.8 14.5 17 14.3 17 14V10C17 9.7 16.8 9.5 16.5 9.5Z" fill="white"/>
      <path d="M10.5 12.5H8.5V11.5H10.5V12.5Z" fill="#00B3B0"/>
      <path d="M15.5 12.5H13.5V11.5H15.5V12.5Z" fill="#00B3B0"/>
    </svg>
  ),
  transfer: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 15H19V17H5V15Z" fill="#1A1F71"/>
      <path d="M5 7H19V9H5V7Z" fill="#1A1F71"/>
      <path d="M19 13L5 13L5 11L19 11L19 13Z" fill="#1A1F71"/>
      <path d="M12 3L8 7H11V15H13V7H16L12 3Z" fill="#1A1F71"/>
      <path d="M12 21L16 17H13V9H11V17H8L12 21Z" fill="#1A1F71"/>
    </svg>
  )
};

// Datos bancarios seguros
const getBankDetails = (orderId) => {
  return {
    transfer: {
      name: 'Álvaro Lázaro',
      iban: 'ES54 1586 0001 4378 4263 7911',
      bank: 'Trade Republic',
      bic: 'TRBKESM2XXX',
      reference: `AURA${orderId}`
    },
    bizum: {
      phone: '+34 603065001',
      note: `Pedido ${orderId}`
    },
    paypal: {
      email: 'asistenteauraalpha@gmail.com',
      note: `Pedido ${orderId}`
    }
  };
};

// ==================== PRODUCTOS (25) ====================
const PRODUCTS = [
  { id: 'p1', name: 'Aura Buds Pro', category: 'Audio', price: 129, blurb: 'Auriculares inalámbricos con cancelación activa de ruido.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop', features: ['Cancelación activa de ruido', '30h de batería', 'Carga inalámbrica'] },
  { id: 'p2', name: 'Alpha Sound Max', category: 'Audio', price: 89, blurb: 'Altavoz Bluetooth con sonido surround.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop', features: ['360° sonido', 'Bass boost', '20h batería'] },
  { id: 'p3', name: 'Studio Headphones', category: 'Audio', price: 199, blurb: 'Auriculares de estudio con calidad profesional.', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop', features: ['Sonido Hi-Fi', 'Almohadillas memory foam', 'Plegables'] },
  { id: 'p4', name: 'Aura Watch X', category: 'Wearables', price: 349, blurb: 'Reloj inteligente con seguimiento de salud 24/7.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop', features: ['Monitorización cardiaca', 'GPS integrado', '7 días batería'] },
  { id: 'p5', name: 'Fit Band Pro', category: 'Wearables', price: 79, blurb: 'Pulsera de actividad con monitorización avanzada.', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1000&auto=format&fit=crop', features: ['SpO2 monitor', 'Sueño profundo', '14 días batería'] },
  { id: 'p6', name: 'Aura Home Hub', category: 'Smart Home', price: 199, blurb: 'Control central para tu hogar conectado.', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=1000&auto=format&fit=crop', features: ['Control por voz', 'Compatibilidad universal', 'App móvil'] },
  { id: 'p7', name: 'Smart Light Kit', category: 'Smart Home', price: 129, blurb: 'Kit de luces inteligentes con 16M colores.', image: 'https://images.unsplash.com/photo-1558618666-fcd25856cd63?q=80&w=1000&auto=format&fit=crop', features: ['RGB completo', 'App control', 'Programable'] },
  { id: 'p8', name: 'Alpha Laptop Pro', category: 'Computación', price: 1299, blurb: 'Portátil ultradelgado con pantalla 4K.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop', features: ['Pantalla 4K 16"', '16GB RAM', '1TB SSD'] },
  { id: 'p9', name: 'Gaming Laptop', category: 'Computación', price: 1899, blurb: 'Portátil gaming con RTX 4070.', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop', features: ['RTX 4070', '240Hz display', '32GB RAM'] },
  { id: 'p10', name: 'Alpha Monitor 4K', category: 'Computación', price: 459, blurb: 'Monitor 4K HDR con diseño sin bordes.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop', features: ['32" 4K HDR', '99% sRGB', 'USB-C'] },
  { id: 'p11', name: 'Aura Phone Pro', category: 'Móviles', price: 899, blurb: 'Smartphone flagship con cámara triple.', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop', features: ['Cámara 108MP', 'Pantalla 120Hz', 'Carga rápida 65W'] },
  { id: 'p12', name: 'Alpha Fold', category: 'Móviles', price: 1599, blurb: 'Smartphone plegable con pantalla flexible.', image: 'https://images.unsplash.com/photo-1621330396173-e1b6d41b301b?q=80&w=1000&auto=format&fit=crop', features: ['Pantalla 7.8"', '512GB almacenamiento', 'Cámaras triples'] },
  { id: 'p13', name: 'Aura Pad Air', category: 'Tablets', price: 699, blurb: 'Tablet ultradelgada con lápiz digital.', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop', features: ['11" Retina', 'Apple Pencil', '256GB'] },
  { id: 'p14', name: 'Alpha Tab Pro', category: 'Tablets', price: 899, blurb: 'Tablet profesional para creativos.', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1000&auto=format&fit=crop', features: ['12.9" OLED', '120Hz', '1TB almacenamiento'] },
  { id: 'p15', name: 'Fast Charger 100W', category: 'Cargadores', price: 49, blurb: 'Cargador rápido con 4 puertos GaN.', image: 'https://images.unsplash.com/photo-1609592810794-1c0d49c81bb5?q=80&w=1000&auto=format&fit=crop', features: ['100W total', '4 puertos', 'Tecnología GaN'] },
  { id: 'p16', name: 'Wireless Charger Pad', category: 'Cargadores', price: 29, blurb: 'Base de carga inalámbrica universal.', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1000&auto=format&fit=crop', features: ['15W rápido', 'LED indicador', 'Anti-deslizante'] },
  { id: 'p17', name: 'Power Bank 20000mAh', category: 'Cargadores', price: 39, blurb: 'Batería externa de alta capacidad.', image: 'https://images.unsplash.com/photo-1609588349482-86f753974114?q=80&w=1000&auto=format&fit=crop', features: ['20000mAh', 'PD 45W', '2 USB-C'] },
  { id: 'p18', name: 'Laptop Stand Aluminum', category: 'Accesorios', price: 59, blurb: 'Soporte para portátil en aluminio.', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=1000&auto=format&fit=crop', features: ['Aluminio aeronáutico', 'Ajustable', 'Ventilación mejorada'] },
  { id: 'p19', name: 'Mechanical Keyboard', category: 'Accesorios', price: 129, blurb: 'Teclado mecánico RGB personalizable.', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=1000&auto=format&fit=crop', features: ['Switches Cherry MX', 'RGB personalizable', 'Teclas PBT'] },
  { id: 'p20', name: 'Gaming Mouse Pro', category: 'Accesorios', price: 79, blurb: 'Ratón gaming con sensor 26000 DPI.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop', features: ['26000 DPI', '11 botones', 'RGB Sync'] },
  { id: 'p21', name: 'Game Controller Pro', category: 'Gaming', price: 69, blurb: 'Mando inalámbrico para PC y consolas.', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop', features: ['Inalámbrico', '40h batería', 'Retroalimentación háptica'] },
  { id: 'p22', name: 'VR Headset Alpha', category: 'Gaming', price: 399, blurb: 'Gafas de realidad virtual con 6DOF.', image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop', features: ['6DOF', 'Resolución 4K', 'Controladores incluidos'] },
  { id: 'p23', name: '4K Action Camera', category: 'Fotografía', price: 199, blurb: 'Cámara deportiva 4K con estabilización.', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop', features: ['4K 60fps', 'Estabilización EIS', 'A prueba de agua'] },
  { id: 'p24', name: 'Drone Pro 4K', category: 'Fotografía', price: 799, blurb: 'Dron profesional con cámara 4K.', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format&fit=crop', features: ['Cámara 4K', 'Seguimiento automático', '30min vuelo'] },
  { id: 'p25', name: 'Streaming Kit Pro', category: 'Fotografía', price: 299, blurb: 'Kit completo para streaming profesional.', image: 'https://images.unsplash.com/photo-1599658880437-28d6ffd60bf6?q=80&w=1000&auto=format&fit=crop', features: ['Cámara 1080p', 'Micrófono condensador', 'Iluminación LED'] }
];

// Métodos de pago
const PAYMENT_METHODS = [
  { id: 'visa', name: 'Visa/Mastercard', icon: PaymentIcons.visa, description: 'Tarjeta de crédito/débito' },
  { id: 'paypal', name: 'PayPal', icon: PaymentIcons.paypal, description: 'Pago seguro a través de PayPal' },
  { id: 'applepay', name: 'Apple Pay', icon: PaymentIcons.applepay, description: 'Pago rápido con Apple Pay' },
  { id: 'bizum', name: 'Bizum', icon: PaymentIcons.bizum, description: 'Pago inmediato con Bizum' },
  { id: 'transfer', name: 'Transferencia', icon: PaymentIcons.transfer, description: 'Transferencia bancaria' },
];

// ==================== COMPONENTE PRINCIPAL ====================
export default function AuraAlphaStore() {
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(null);
  const [showCookies, setShowCookies] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filteredProducts = PRODUCTS.filter(p => 
    category === 'All' || p.category === category
  );

  // Funciones del carrito
  const addToCart = (product) => {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        return current.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(current => current.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(current => 
      current.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep(1);
    setShowCart(true);
  };

  const completeOrder = () => {
    alert('¡Pedido completado! Te contactaremos para confirmar el pago.');
    setCart([]);
    setCheckoutStep(0);
    setShowCart(false);
    setSelectedPayment('');
  };

  // Efectos
  useEffect(() => {
    if (modal || showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modal, showCart]);

  // Función auxiliar
  const formatPrice = (eur) => {
    return eur.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased font-sans">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div 
              className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Aura Alpha
            </motion.div>
            
            <nav className="hidden lg:flex gap-1">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    category === cat 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <motion.div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-transparent outline-none text-sm w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="text-gray-400">⌕</span>
            </motion.div>

            <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="w-6 flex flex-col gap-1">
                <div className={`h-0.5 bg-gray-600 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`h-0.5 bg-gray-600 transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`h-0.5 bg-gray-600 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>

            <motion.button className="p-2 rounded-full hover:bg-gray-100" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span className="text-lg">👤</span>
            </motion.button>
            
            <motion.button className="p-2 rounded-full hover:bg-gray-100" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span className="text-lg">💬</span>
            </motion.button>
            
            <motion.button className="relative p-2 rounded-full hover:bg-gray-100" onClick={() => setShowCart(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span className="text-lg">🛒</span>
              {cart.length > 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cart.length}
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setCategory(cat); setMenuOpen(false); }} className={`px-4 py-3 rounded-xl text-left font-medium ${category === cat ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <main className="pt-24">
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div className="space-y-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div>
                <motion.h1 className="text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  Tecnología <span className="block">Alpha</span>
                </motion.h1>
                <motion.p className="text-xl text-gray-600 mt-6 leading-relaxed" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  Descubre productos diseñados con pasión. Experiencia fluida, diseño minimalista y calidad excepcional.
                </motion.p>
              </div>
              
              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <motion.button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  Explorar Colección
                </motion.button>
                <motion.button className="px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  Ver Ofertas
                </motion.button>
              </motion.div>

              <motion.div className="flex gap-8 pt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <div><div className="text-2xl font-bold text-gray-900">25+</div><div className="text-gray-600">Productos premium</div></div>
                <div><div className="text-2xl font-bold text-gray-900">24/7</div><div className="text-gray-600">Soporte premium</div></div>
                <div><div className="text-2xl font-bold text-gray-900">2 años</div><div className="text-gray-600">Garantía extendida</div></div>
              </motion.div>
            </motion.div>

            <motion.div className="relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" alt="Premium Technology" className="w-full h-[600px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <div className="text-sm opacity-90">PRODUCTO DESTACADO</div>
                    <div className="text-2xl font-bold mt-2">Aura Watch X</div>
                    <div className="opacity-90 mt-2">Innovación en tu muñeca</div>
                  </div>
                </div>
              </div>
              
              <motion.div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <div className="text-2xl">🏆</div>
                <div className="text-xs font-semibold mt-1">Premio Diseño 2024</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Catálogo */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Nuestros Productos</h2>
              <p className="text-gray-600 mt-3">Selección curada de tecnología premium</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <motion.button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${category === cat ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border'}`} whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}>
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <motion.article key={product.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer group" whileHover={{ y: -8, transition: { duration: 0.2 } }} layout>
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                    {product.category}
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                    <div className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</div>
                  </div>
                  
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{product.blurb}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs">
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs">
                        +{product.features.length - 2} más
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <motion.button onClick={() => addToCart(product)} className="flex-1 rounded-xl px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:from-purple-700 hover:to-blue-700 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Añadir al Carrito
                  </motion.button>
                  <motion.button onClick={() => setModal(product)} className="rounded-xl px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold text-sm hover:border-gray-400 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Detalles
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900">No se encontraron productos</h3>
              <p className="text-gray-600 mt-2">Intenta con otros términos de búsqueda o categorías</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="text-2xl font-bold text-gray-900">Aura Alpha</div>
                <p className="text-gray-600 text-sm leading-relaxed">Líder en tecnología premium con diseño minimalista.</p>
                <div className="flex gap-4">
                  {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                    <motion.button key={index} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors" whileHover={{ scale: 1.1, y: -2 }}>
                      {icon}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Productos</h4>
                <div className="space-y-2 text-sm">
                  {categories.filter(cat => cat !== 'All').map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)} className="block text-gray-600 hover:text-gray-900 transition-colors">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Soporte</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📧 {SECURE_CONFIG.contact.email}</div>
                  <div>📞 {SECURE_CONFIG.contact.phone}</div>
                  <div>🕒 24/7 Soporte premium</div>
                  <div>🚚 Envío gratis en pedidos +50€</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Newsletter</h4>
                <p className="text-gray-600 text-sm mb-4">Suscríbete para ofertas exclusivas</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="tu@email.com" className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gray-400" />
                  <button className="bg-gray-900 text-white rounded-xl px-4 py-2 text-sm hover:bg-gray-800 transition-colors">→</button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">© 2024 Aura Alpha. Todos los derechos reservados.</div>
              <div className="flex gap-6 text-sm text-gray-600">
                <button className="hover:text-gray-900 transition-colors">Privacidad</button>
                <button className="hover:text-gray-900 transition-colors">Términos</button>
                <button className="hover:text-gray-900 transition-colors">Cookies</button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img src={modal.image} alt={modal.name} className="w-full h-96 lg:h-full object-cover" />
                  <button onClick={() => setModal(null)} className="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors">×</button>
                </div>

                <div className="p-8">
                  <div className="text-sm text-gray-500 uppercase tracking-wide">{modal.category}</div>
                  <h3 className="text-3xl font-bold mt-2 text-gray-900">{modal.name}</h3>
                  <div className="text-2xl font-bold text-gray-900 mt-4">{formatPrice(modal.price)}</div>
                  
                  <p className="mt-6 text-gray-600 leading-relaxed">{modal.blurb}</p>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Características principales</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {modal.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <motion.button onClick={() => { addToCart(modal); setModal(null); }} className="flex-1 rounded-xl px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      Añadir al Carrito
                    </motion.button>
                    <motion.button onClick={() => setModal(null)} className="px-6 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      Cerrar
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carrito */}
      <AnimatePresence>
        {showCart && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="w-full max-w-md bg-white h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
                  <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">×</button>
                </div>

                {checkoutStep === 0 ? (
                  <>
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Carrito vacío</h3>
                        <p className="text-gray-600">Añade algunos productos increíbles</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-2xl">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <div className="text-gray-600 text-sm">{formatPrice(item.price)}</div>
                              <div className="flex items-center gap-3 mt-2">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">-</button>
                                <span className="text-sm font-medium">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">+</button>
                              </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">🗑️</button>
                          </div>
                        ))}

                        <div className="border-t border-gray-200 pt-4 mt-6">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total:</span>
                            <span>{formatPrice(cartTotal)}</span>
                          </div>
                          
                          <motion.button onClick={handleCheckout} className="w-full mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            Proceder al Pago
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</div>
                      <span>Método de pago</span>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Selecciona método de pago</h3>
                      
                      {PAYMENT_METHODS.map(method => (
                        <motion.div key={method.id} className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPayment === method.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedPayment(method.id)} whileHover={{ scale: 1.02 }}>
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{method.icon()}</div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{method.name}</div>
                              <div className="text-sm text-gray-600">{method.description}</div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${selectedPayment === method.id ? 'bg-purple-500 border-purple-500' : 'border-gray-300'}`}></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <div className="flex justify-between items-center text-lg font-semibold mb-6">
                        <span>Total a pagar:</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <motion.button onClick={() => setCheckoutStep(0)} className="flex-1 rounded-xl border-2 border-gray-300 text-gray-700 py-4 font-semibold hover:border-gray-400 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          Atrás
                        </motion.button>
                        <motion.button onClick={completeOrder} disabled={!selectedPayment} className={`flex-1 rounded-xl py-4 font-semibold transition-colors ${selectedPayment ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} whileHover={selectedPayment ? { scale: 1.02 } : {}} whileTap={selectedPayment ? { scale: 0.98 } : {}}>
                          Completar Pedido
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookies */}
      <AnimatePresence>
        {showCookies && (
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:max-w-md z-40">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🍪</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Usamos cookies</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Utilizamos cookies esenciales para mejorar tu experiencia.</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <motion.button onClick={() => setShowCookies(false)} className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Aceptar
                </motion.button>
                <motion.button onClick={() => setShowCookies(false)} className="flex-1 rounded-xl border border-gray-300 text-gray-700 py-3 text-sm font-semibold hover:border-gray-400 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Preferencias
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
