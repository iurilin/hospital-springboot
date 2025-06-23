package com.uniter.hospital_SpringBoot.repositories;

import com.uniter.hospital_SpringBoot.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);
}
