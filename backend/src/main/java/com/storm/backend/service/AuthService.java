/*Compara las contraseñas con BCrypt*/
package com.storm.backend.service;

import com.storm.backend.dto.LoginRequest;
import com.storm.backend.dto.LoginResponse;
import com.storm.backend.model.Cliente;
import com.storm.backend.model.Usuario;
import com.storm.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse autenticar(LoginRequest request) {
        Optional<Usuario> userOpt = usuarioRepository.findByUsername(request.getUsername());

        if (userOpt.isPresent()) {
            Usuario usuario = userOpt.get();

            // passwordEncoder.matches desencripta lógicamente y compara las contraseñas
            if (passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
                String direccionEnvio = null;
                if (usuario instanceof Cliente) {
                    direccionEnvio = ((Cliente) usuario).getDireccionEnvio();
                }

                return new LoginResponse(
                    usuario.getId(),
                    usuario.getUsername(),
                    usuario.getEmail(),
                    usuario.getRol(),
                    direccionEnvio
                );
            }
        }
        
        throw new RuntimeException("Credenciales inválidas.");
    }
}