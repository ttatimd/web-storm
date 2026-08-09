/*Interfaz visual auxiliar para invocar a Usuario.autenticar()
    Captura credenciales para ejecutar la logica de la clase Usuario en el backend
*/
import React, { useState } from 'react';

export function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Consume el endpoint respaldado por la entidad Usuario
    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Credenciales inválidas');
        return res.json();
      })
      .then((user) => {
        onLoginSuccess(user);
        onClose();
      })
      .catch(() => {
        // Validación local de respaldo si el backend está apagado
        if (credentials.username === 'admin' && credentials.password === 'admin') {
          onLoginSuccess({ id: 1, username: 'admin', rol: 'ADMIN' });
          onClose();
        } else if (credentials.username === 'cliente' && credentials.password === '1234') {
          onLoginSuccess({ id: 2, username: 'cliente', rol: 'CLIENTE', direccionEnvio: 'Alem 1234' });
          onClose();
        } else {
          setErrorMessage('Usuario o contraseña incorrectos.');
        }
      });
  };

  return (
    <div className="cart-overlay">
      <div className="login-modal-content">
        <h3>Iniciar Sesión</h3>
        {errorMessage && <p className="error-msg">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username" 
            placeholder="Usuario" 
            value={credentials.username} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            value={credentials.password} 
            onChange={handleChange} 
            required 
          />
          
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Ingresar</button>
            <button type="button" className="btn-close" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}