package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.model.Consulta;
import com.uniter.hospital_SpringBoot.repositories.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaRepository repository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Consulta>> findAll() {
        List<Consulta> list = repository.findAll();
        return ResponseEntity.ok().body(list);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Consulta> findById(@PathVariable Long id) {
        Optional<Consulta> obj = repository.findById(id);
        return obj.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Consulta> insert(@RequestBody Consulta obj) {
        return ResponseEntity.ok().body(repository.save(obj));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Consulta> update(@PathVariable Long id, @RequestBody Consulta obj) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        obj.setId(id);
        return ResponseEntity.ok().body(repository.save(obj));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
