import React, { useState } from 'react';
import { ClientCatalogView } from './components/ClientCatalogView';
import { AdminCatalogView } from './components/AdminCatalogView';
import { CartSidebar } from './components/CartSidebar';
import { LoginModal } from './components/LoginModal';
import './App.css';

function App() {
  // Estado que guarda el usuario autenticado que retorna Java
  const [currentUser, setCurrentUser] = useState(null); 
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Recibe la respuesta del backend tras un login exitoso
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsCartOpen(false);
  };

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
    alert('¡Pedido enviado a procesar!');
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <a href="#" className="brand-logo">STORM<span>.</span></a>

        {/* Panel superior de usuario / inicio de sesión */}
        <div className="user-controls">
          {currentUser ? (
            <div className="session-info">
              <span>Hola, <strong>{currentUser.username}</strong> ({currentUser.rol})</span>
              <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
            </div>
          ) : (
            <button onClick={() => setIsLoginOpen(true)} className="btn-login">
              Iniciar Sesión
            </button>
          )}
        </div>

        {/* El carrito SOLO está disponible para usuarios CLIENTE o visitantes (no ADMIN) */}
        {currentUser?.rol !== 'ADMIN' && (
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            🛒 <span className="cart-badge">{cartItems.reduce((acc, i) => acc + i.cantidad, 0)}</span>
          </button>
        )}
      </header>

      <main>
        {/* CONMUTACIÓN SEGÚN EL ROL DEVUELTO POR JAVA */}
        {currentUser?.rol === 'ADMIN' ? (
          <AdminCatalogView />
        ) : (
          <ClientCatalogView onAddToCart={handleAddToCart} />
        )}
      </main>

      {/* CartSidebar sólo para vista Cliente */}
      {currentUser?.rol !== 'ADMIN' && (
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {/* Cartel flotante / Modal de Iniciar Sesión */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
    </div>
  );
}

export default App;