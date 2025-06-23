package com.uniter.hospital_SpringBoot.DTO;

import com.uniter.hospital_SpringBoot.model.Usuario;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;

public class UsuarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String email;
    private String name;

    public UsuarioDTO() {}

    public UsuarioDTO(Usuario obj){
        id = obj.getId();
        email = obj.getEmail();
        name = obj.getName();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
