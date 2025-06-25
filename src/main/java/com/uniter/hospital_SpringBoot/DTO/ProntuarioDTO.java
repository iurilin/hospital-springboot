package com.uniter.hospital_SpringBoot.DTO;

import com.uniter.hospital_SpringBoot.model.Consulta;
import com.uniter.hospital_SpringBoot.model.Prontuario;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.time.LocalDateTime;

public class ProntuarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private LocalDateTime dataHoraAtendimento;
    private String descricao;
    private String prescricao;
    private Long consultaId; // Apenas o ID da consulta

    public ProntuarioDTO() {
    }

    public ProntuarioDTO(Prontuario obj) {
        this.id = obj.getId();
        this.dataHoraAtendimento = obj.getDataHoraAtendimento();
        this.descricao = obj.getDescricao();
        this.prescricao = obj.getPrescricao();
        if (obj.getConsulta() != null) {
            this.consultaId = obj.getConsulta().getId();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataHoraAtendimento() {
        return dataHoraAtendimento;
    }

    public void setDataHoraAtendimento(LocalDateTime dataHoraAtendimento) {
        this.dataHoraAtendimento = dataHoraAtendimento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getPrescricao() {
        return prescricao;
    }

    public void setPrescricao(String prescricao) {
        this.prescricao = prescricao;
    }

    public Long getConsultaId() {
        return consultaId;
    }

    public void setConsultaId(Long consultaId) {
        this.consultaId = consultaId;
    }
}


