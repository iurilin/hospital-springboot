package com.uniter.hospital_SpringBoot.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "profissionais")
public class ProfissionalSaude implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCompleto;

    @Column(unique = true, nullable = false)
    private String cpf;

    private String especialidade;

    private String crmCoren;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    public ProfissionalSaude() {
    }

    public ProfissionalSaude(Long id, String nomeCompleto, String cpf, String especialidade, String crmCoren, Usuario usuario) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.especialidade = especialidade;
        this.crmCoren = crmCoren;
        this.usuario = usuario;
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getCrmCoren() {
        return crmCoren;
    }

    public void setCrmCoren(String crmCoren) {
        this.crmCoren = crmCoren;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }


}