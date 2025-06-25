package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.model.Prontuario;
import com.uniter.hospital_SpringBoot.repositories.ProntuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/prontuarios")
public class ProntuarioController {

    @Autowired
    private ProntuarioRepository repository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Prontuario>> findAll() {
        List<Prontuario> list = repository.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Prontuario> findById(@PathVariable Long id) {
        Optional<Prontuario> obj = repository.findById(id);
        return obj.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = {"application/json", "application/json;charset=UTF-8"})
    public ResponseEntity<Prontuario> insert(@RequestBody Prontuario obj) {
        return ResponseEntity.ok().body(repository.save(obj));
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Prontuario> update(@PathVariable Long id, @RequestBody Prontuario obj) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        obj.setId(id);
        Prontuario updated = repository.save(obj);
        return ResponseEntity.ok().body(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}