import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';

export function ClientCatalogView({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al conectar con la API, usando datos locales:', err);
        // Datos mock de prueba mientras no esté corriendo el backend en Java
        setProducts([
          { id: 1, titulo: 'Tote Milano Noir', precio: 120000, imagenUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80' },
          { id: 2, titulo: 'Bandolera Cognac Classic', precio: 85500, imagenUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80' },
          { id: 3, titulo: 'Clutch Roma Emerald', precio: 98000, imagenUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80' }
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Cargando colección...</div>;

  return (
    <section className="catalog-section" id="catalogo">
      <div className="section-header">
        <h2>Colección Destacada</h2>
        <p>Selecciona tu pieza favorita y agrégala al carrito</p>
      </div>

      <div className="product-grid">
        {products.map((prod) => (
          <ProductCard 
            key={prod.id} 
            product={prod} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </section>
  );
}