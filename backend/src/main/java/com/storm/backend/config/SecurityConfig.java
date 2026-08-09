package com.storm.backend.config;
/*Encripta la contraseña (BCrypt) y restringe el acceso segun los roles */

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Configura BCrypt como el encriptador oficial del backend
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Deshabilitado para APIs REST
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/productos/**").permitAll() // Rutas públicas
                .requestMatchers("/api/admin/**").hasRole("ADMIN")               // Solo para Administradores
                .requestMatchers("/api/pedidos/**").hasRole("CLIENTE")           // Solo para Clientes
                .anyRequest().authenticated()
            );
        
        return http.build();
    }
}
