package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.DTO.ProfissionalSaudeDTO;
import com.uniter.hospital_SpringBoot.model.ProfissionalSaude;
import com.uniter.hospital_SpringBoot.repositories.ProfissionalSaudeRepository;
import com.uniter.hospital_SpringBoot.service.ProfissionalSaudeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/profissionaissaude")
public class ProfissionalSaudeController {

    @Autowired
    private ProfissionalSaudeService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ProfissionalSaudeDTO>> findAll() {
        List<ProfissionalSaudeDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ProfissionalSaudeDTO> findById(@PathVariable Long id) {
        ProfissionalSaudeDTO obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ProfissionalSaudeDTO> insert(@RequestBody ProfissionalSaude obj) {
        ProfissionalSaudeDTO newObj = service.insert(obj);
        return ResponseEntity.status(HttpStatus.CREATED).body(newObj);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<ProfissionalSaudeDTO> update(@PathVariable Long id, @RequestBody ProfissionalSaude obj) {
        ProfissionalSaudeDTO updated = service.update(id, obj);
        return ResponseEntity.ok().body(updated);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
