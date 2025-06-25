package com.uniter.hospital_SpringBoot.DTO;

import com.uniter.hospital_SpringBoot.model.Consulta;
import com.uniter.hospital_SpringBoot.model.StatusConsulta;
import com.uniter.hospital_SpringBoot.model.TipoConsulta;

import java.io.Serializable;
import java.time.LocalDateTime;

public class ConsultaDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private LocalDateTime dataHora;
    private StatusConsulta status;
    private TipoConsulta tipo;
    private Long pacienteId;
    private Long profissionalSaudeId;

    public ConsultaDTO() {
    }

    public ConsultaDTO(Consulta obj) {
        this.id = obj.getId();
        this.dataHora = obj.getDataHora();
        this.status = obj.getStatus();
        this.tipo = obj.getTipo();
        this.pacienteId = obj.getPaciente().getId();
        this.profissionalSaudeId = obj.getProfissionalSaude().getId();
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

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Long getProfissionalSaudeId() {
        return profissionalSaudeId;
    }

    public void setProfissionalSaudeId(Long profissionalSaudeId) {
        this.profissionalSaudeId = profissionalSaudeId;
    }
}