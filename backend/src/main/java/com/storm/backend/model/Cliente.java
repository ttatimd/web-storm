package com.storm.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "clientes")
public class Cliente extends Usuario {

    private String direccionEnvio;
    private String telefono;

    public Cliente() {
        this.rol = Rol.CLIENTE;
    }

    public Cliente(String username, String email, String password, String direccionEnvio, String telefono) {
        super(username, email, password, Rol.CLIENTE);
        this.direccionEnvio = direccionEnvio;
        this.telefono = telefono;
    }

    // Getters y Setters
    public String getDireccionEnvio() { return direccionEnvio; }
    public void setDireccionEnvio(String direccionEnvio) { this.direccionEnvio = direccionEnvio; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
}
