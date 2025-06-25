package com.uniter.hospital_SpringBoot.service;

import com.uniter.hospital_SpringBoot.DTO.PacienteDTO;
import com.uniter.hospital_SpringBoot.model.Paciente;
import com.uniter.hospital_SpringBoot.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository repository;

    public List<PacienteDTO> findAll() {
        return repository.findAll().stream().map(PacienteDTO::new).toList();
    }

    public PacienteDTO findById(Long id) {
        Paciente obj = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        return new PacienteDTO(obj);
    }

    public PacienteDTO insert(Paciente obj) {
        return new PacienteDTO(repository.save(obj));
    }

    public PacienteDTO update(Long id, Paciente obj) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Paciente não encontrado");
        }
        obj.setId(id);
        return new PacienteDTO(repository.save(obj));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Paciente não encontrado");
        }
        repository.deleteById(id);
    }
}
