import React, { useState } from 'react';
import { ClientCatalogView } from './components/ClientCatalogView';
import { AdminCatalogView } from './components/AdminCatalogView';
import { CartSidebar } from './components/CartSidebar';
import './App.css';

function App() {
  const [view, setView] = useState('client');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (productId) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.producto.id === productId);
      if (existing) {
        return prevItems.map((item) =>
          item.producto.id === productId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: Date.now(),
          producto: { id: productId, titulo: 'Producto ' + productId, precio: 120000, imagenUrl: '' },
          cantidad: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.producto.id !== productId));
  };

  const handleCheckout = () => {
    alert('¡Pedido enviado!');
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <a href="#" className="brand-logo">STORM<span>.</span></a>

        <div className="mode-switcher">
          <button 
            className={view === 'client' ? 'active' : ''} 
            onClick={() => setView('client')}
          >
            Vista Tienda (Cliente)
          </button>
          <button 
            className={view === 'admin' ? 'active' : ''} 
            onClick={() => {
              setView('admin');
              setIsCartOpen(false); // Cierra el carrito si estaba abierto
            }}
          >
            Vista Panel (Admin)
          </button>
        </div>

        {/* Solo mostramos el botón del carrito al cliente */}
        {view === 'client' && (
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            🛒 <span className="cart-badge">{cartItems.reduce((acc, i) => acc + i.cantidad, 0)}</span>
          </button>
        )}
      </header>

      <main>
        {view === 'client' ? (
          <ClientCatalogView onAddToCart={handleAddToCart} />
        ) : (
          <AdminCatalogView />
        )}
      </main>

      {/* CartSidebar se renderiza únicamente cuando la vista es 'client' */}
      {view === 'client' && (
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}

export default App;