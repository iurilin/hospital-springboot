package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.DTO.AuthenticationDTO;
import com.uniter.hospital_SpringBoot.DTO.RegistroDTO;
import com.uniter.hospital_SpringBoot.model.Usuario;
import com.uniter.hospital_SpringBoot.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository repository;


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated  AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);


        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Validated RegistroDTO data){
        if(this.repository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Usuario newUsuario = new Usuario(data.login(), encryptedPassword, data.role(), data.name(), data.email());

        this.repository.save(newUsuario);

        return ResponseEntity.ok().build();
    }
}
