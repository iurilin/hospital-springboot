package com.uniter.hospital_SpringBoot.service;

import com.uniter.hospital_SpringBoot.DTO.ProfissionalSaudeDTO;
import com.uniter.hospital_SpringBoot.model.ProfissionalSaude;
import com.uniter.hospital_SpringBoot.repositories.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfissionalSaudeService {

    @Autowired
    private ProfissionalSaudeRepository repository;

    public List<ProfissionalSaudeDTO> findAll() {
        return repository.findAll().stream().map(ProfissionalSaudeDTO::new).toList();
    }

    public ProfissionalSaudeDTO findById(Long id) {
        ProfissionalSaude obj = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));
        return new ProfissionalSaudeDTO(obj);
    }

    public ProfissionalSaudeDTO insert(ProfissionalSaude obj) {
        return new ProfissionalSaudeDTO(repository.save(obj));
    }

    public ProfissionalSaudeDTO update(Long id, ProfissionalSaude obj) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Profissional não encontrado");
        }
        obj.setId(id);
        return new ProfissionalSaudeDTO(repository.save(obj));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Profissional não encontrado");
        }
        repository.deleteById(id);
    }
}
