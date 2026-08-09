package com.storm.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "administradores")
public class Administrador extends Usuario {

    public Administrador() {
        this.rol = Rol.ADMIN;
    }

    public Administrador(String username, String email, String password) {
        super(username, email, password, Rol.ADMIN);
    }
}