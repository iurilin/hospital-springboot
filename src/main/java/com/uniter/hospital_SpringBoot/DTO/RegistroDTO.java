package com.uniter.hospital_SpringBoot.DTO;

import com.uniter.hospital_SpringBoot.model.UsuarioRoles;

public record RegistroDTO(String email, String login, String senha, UsuarioRoles role, String name) {
}
