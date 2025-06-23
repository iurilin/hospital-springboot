package com.uniter.hospital_SpringBoot.DTO;

import com.uniter.hospital_SpringBoot.model.Usuario;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;

public class UsuarioLoginDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private String email;
    private String name;

    public UsuarioLoginDTO() {}

    public UsuarioLoginDTO(Usuario obj){

        email = obj.getEmail();
        name = obj.getName();

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
