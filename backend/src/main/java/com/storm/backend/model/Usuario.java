package com.storm.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(unique = true, nullable = false)
    protected String username;

    @Column(nullable = false)
    protected String email;

    @Column(nullable = false)
    protected String password; // Se guarda encriptada con BCrypt

    @Enumerated(EnumType.STRING)
    protected Rol rol;

    public Usuario() {}

    public Usuario(String username, String email, String password, Rol rol) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    public boolean autenticar(String passIngresada) {
        // En la implementación real con Spring Security, este control se hace en el Servicio
        return this.password != null && this.password.equals(passIngresada);
    }

    // Getters y Setters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public Rol getRol() { return rol; }
    public void setPassword(String password) { this.password = password; }
}