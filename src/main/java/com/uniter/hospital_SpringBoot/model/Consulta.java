package com.uniter.hospital_SpringBoot.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultas")
public class Consulta implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    private StatusConsulta status;

    @Enumerated(EnumType.STRING)
    private TipoConsulta tipo;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id", nullable = false)
    private ProfissionalSaude profissionalSaude;

    @OneToOne(mappedBy = "consulta", cascade = CascadeType.ALL)
    private Prontuario prontuario;

    public Consulta() {
    }

    public Consulta(Long id, LocalDateTime dataHora, StatusConsulta status, TipoConsulta tipo,
                    Paciente paciente, ProfissionalSaude profissionalSaude) {
        this.id = id;
        this.dataHora = dataHora;
        this.status = status;
        this.tipo = tipo;
        this.paciente = paciente;
        this.profissionalSaude = profissionalSaude;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public StatusConsulta getStatus() {
        return status;
    }

    public void setStatus(StatusConsulta status) {
        this.status = status;
    }

    public TipoConsulta getTipo() {
        return tipo;
    }

    public void setTipo(TipoConsulta tipo) {
        this.tipo = tipo;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public ProfissionalSaude getProfissionalSaude() {
        return profissionalSaude;
    }

    public void setProfissionalSaude(ProfissionalSaude profissionalSaude) {
        this.profissionalSaude = profissionalSaude;
    }

    public Prontuario getProntuario() {
        return prontuario;
    }

    public void setProntuario(Prontuario prontuario) {
        this.prontuario = prontuario;
    }
}