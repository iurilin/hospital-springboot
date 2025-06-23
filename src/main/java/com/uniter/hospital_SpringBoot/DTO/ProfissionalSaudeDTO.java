package com.uniter.hospital_SpringBoot.DTO;

import com.uniter.hospital_SpringBoot.model.ProfissionalSaude;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;

public class ProfissionalSaudeDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String nomeCompleto;
    private String especialidade;

    public ProfissionalSaudeDTO() {}

    public ProfissionalSaudeDTO(ProfissionalSaude obj){
        this.id = obj.getId();
        this.nomeCompleto = obj.getNomeCompleto();
        this.especialidade = obj.getEspecialidade();
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

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}
