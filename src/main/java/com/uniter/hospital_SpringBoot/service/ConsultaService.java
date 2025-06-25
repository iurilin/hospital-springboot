package com.uniter.hospital_SpringBoot.service;

import com.uniter.hospital_SpringBoot.model.Consulta;
import com.uniter.hospital_SpringBoot.repositories.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository repository;

    public List<Consulta> findAll() {
        return repository.findAll();
    }

    public Consulta findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
    }

    public Consulta insert(Consulta obj) {
        return repository.save(obj);
    }

    public Consulta update(Long id, Consulta obj) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Consulta não encontrada");
        }
        obj.setId(id);
        return repository.save(obj);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Consulta não encontrada");
        }
        repository.deleteById(id);
    }
}

