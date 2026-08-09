package com.storm.backend.dto;

import com.storm.backend.model.Rol;

public class LoginResponse {
    private Long id;
    private String username;
    private String email;
    private Rol rol;
    private String direccionEnvio;

    public LoginResponse(Long id, String username, String email, Rol rol, String direccionEnvio) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.rol = rol;
        this.direccionEnvio = direccionEnvio;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public Rol getRol() { return rol; }
    public String getDireccionEnvio() { return direccionEnvio; }
}