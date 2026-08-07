import React from 'react';

export function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  );

  return (
    <>
      <aside className={`cart-sidebar ${isOpen ? 'cart-open' : ''}`}>
        <div className="cart-header">
          <h3>Tu Carrito</h3>
          <button className="close-cart-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart-msg">El carrito está vacío.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id || item.producto.id}>
                <img src={item.producto.imagenUrl} alt={item.producto.titulo} />
                <div className="cart-item-details">
                  <h4>{item.producto.titulo}</h4>
                  <span className="cart-item-price">${item.producto.precio?.toLocaleString('es-AR')}</span>
                  <div className="qty-selector">Cant: {item.cantidad}</div>
                </div>
                <button className="btn-remove-item" onClick={() => onRemoveItem(item.producto.id)}>&times;</button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="summary-line">
            <span>Subtotal:</span>
            <span className="total-price">${total.toLocaleString('es-AR')}</span>
          </div>
          <button className="btn-checkout" onClick={onCheckout} disabled={cartItems.length === 0}>
            Finalizar Compra
          </button>
        </div>
      </aside>

      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
    </>
  );
}