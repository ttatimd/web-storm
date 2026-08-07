import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';

export function AdminCatalogView() {
  // Lista de productos cargados dinámicamente desde el servidor
  const [products, setProducts] = useState([]);

  // Estado del formulario completamente en blanco para que el admin ingrese los datos
  const [formData, setFormData] = useState({
    titulo: '',
    precio: '',
    imagenUrl: '',
    stock: ''
  });

  // Consulta al backend en Java para traer los productos existentes
  const fetchProducts = () => {
    fetch('http://localhost:8080/api/productos')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error('El catálogo está vacío o el backend no responde:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Captura lo que escribe el admin en cada input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Permite subir las imagenes al catalogo de los productos
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagenUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    }
  };

  // Función que toma los datos del formulario y crea el producto vía API REST (POST)
  const handleCreateProduct = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: formData.titulo,
        precio: parseFloat(formData.precio),
        imagenUrl: formData.imagenUrl,
        stock: parseInt(formData.stock, 10)
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al guardar el producto');
        return res.json();
      })
      .then(() => {
        fetchProducts(); // Recarga el catálogo para mostrar el nuevo ítem
        setFormData({ titulo: '', precio: '', imagenUrl: '', stock: '' }); // Limpia el formulario
      })
      .catch((err) => alert('No se pudo guardar: ' + err.message));
  };

  // Función para eliminar un producto del catálogo vía API REST (DELETE)
  const handleDeleteProduct = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto del catálogo?')) return;

    fetch(`http://localhost:8080/api/productos/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) fetchProducts();
        else alert('No se pudo eliminar el producto');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración - Gestión de Catálogo</h2>

      {/* Formulario para que el Administrador agregue productos libremente */}
      <form className="admin-form" onSubmit={handleCreateProduct}>
        <h3>Agregar Nuevo Producto al Catálogo</h3>
        
        <input 
          type="text" 
          name="titulo" 
          placeholder="Nombre o modelo de la cartera" 
          value={formData.titulo} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="precio" 
          placeholder="Precio ($)" 
          value={formData.precio} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="file" 
          accept="image/png, image/jpeg" 
          onChange={handleImageUpload} 
          required 
        />
        <input 
          type="number" 
          name="stock" 
          placeholder="Cantidad de stock disponible" 
          value={formData.stock} 
          onChange={handleChange} 
          required 
        />

        <button type="submit" className="btn-primary">Guardar en Catálogo</button>
      </form>

      {/* Grilla con el catálogo actual cargado por el administrador */}
      <h3>Catálogo Publicado</h3>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No hay productos cargados en el catálogo aún.</p>
        ) : (
          products.map((prod) => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              isAdmin={true} 
              onDelete={handleDeleteProduct} 
            />
          ))
        )}
      </div>
    </div>
  );
}