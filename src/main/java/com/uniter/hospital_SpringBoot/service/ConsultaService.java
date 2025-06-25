package com.uniter.hospital_SpringBoot.service;

import com.uniter.hospital_SpringBoot.DTO.ConsultaDTO;
import com.uniter.hospital_SpringBoot.model.*;
import com.uniter.hospital_SpringBoot.repositories.ConsultaRepository;
import com.uniter.hospital_SpringBoot.repositories.PacienteRepository;
import com.uniter.hospital_SpringBoot.repositories.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository repository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private ProfissionalSaudeRepository profissionalRepository;

    public Consulta findById(Long id) {
        Optional<Consulta> obj = repository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
    }

    public List<Consulta> findAll() {
        return repository.findAll();
    }

    public Consulta insert(ConsultaDTO dto) {
        Consulta consulta = new Consulta();
        consulta.setDataHora(dto.getDataHora());
        consulta.setStatus(dto.getStatus());
        consulta.setTipo(dto.getTipo());

        // Carrega os relacionamentos
        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        ProfissionalSaude profissional = profissionalRepository.findById(dto.getProfissionalSaudeId())
                .orElseThrow(() -> new RuntimeException("Profissional de saúde não encontrado"));

        consulta.setPaciente(paciente);
        consulta.setProfissionalSaude(profissional);

        return repository.save(consulta);
    }

    public Consulta update(Long id, ConsultaDTO dto) {
        Consulta consulta = findById(id);
        consulta.setDataHora(dto.getDataHora());
        consulta.setStatus(dto.getStatus());
        consulta.setTipo(dto.getTipo());

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        ProfissionalSaude profissional = profissionalRepository.findById(dto.getProfissionalSaudeId())
                .orElseThrow(() -> new RuntimeException("Profissional de saúde não encontrado"));

        consulta.setPaciente(paciente);
        consulta.setProfissionalSaude(profissional);

        return repository.save(consulta);
    }

    public void delete(Long id) {
        findById(id); // Garante que existe
        repository.deleteById(id);
    }
}