package com.uniter.hospital_SpringBoot.model;

import org.springframework.security.core.GrantedAuthority;

public enum UsuarioRoles implements GrantedAuthority{

    ADMIN("admin"),
    USER("user");

    private String role;

    UsuarioRoles(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
    @Override
    public String getAuthority() {
        return role;
    }
}
