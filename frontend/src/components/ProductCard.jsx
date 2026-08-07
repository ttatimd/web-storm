import React from 'react';

export function ProductCard({ product, onAddToCart, isAdmin, onEdit, onDelete }) {
  return (
    <article className="product-card" data-product-id={product.id}>
      <div className="card-image-container">
        <img src={product.imagenUrl} alt={product.titulo} className="product-img" />
        
        {!isAdmin && onAddToCart && (
          <button className="btn-quick-add" onClick={() => onAddToCart(product.id)}>
            + Agregar al Carrito
          </button>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.categoria?.nombre || 'General'}</span>
        <h3 className="product-title">{product.titulo}</h3>
        <p className="product-price">${product.precio?.toLocaleString('es-AR')}</p>
        
        {isAdmin && (
          <div className="admin-card-actions">
            <button className="btn-edit" onClick={() => onEdit(product)}>Editar</button>
            <button className="btn-delete" onClick={() => onDelete(product.id)}>Eliminar</button>
          </div>
        )}
      </div>
    </article>
  );
}