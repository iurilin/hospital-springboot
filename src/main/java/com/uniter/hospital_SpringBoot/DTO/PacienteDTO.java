package com.uniter.hospital_SpringBoot.DTO;

import com.uniter.hospital_SpringBoot.model.Paciente;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;

public class PacienteDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeCompleto;
    private String telefone;
    private String endereco;

    public PacienteDTO() {}

    public PacienteDTO(Paciente obj){
        this.id = obj.getId();
        this.nomeCompleto = obj.getNomeCompleto();
        this.telefone = obj.getTelefone();
        this.endereco = obj.getEndereco();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}
