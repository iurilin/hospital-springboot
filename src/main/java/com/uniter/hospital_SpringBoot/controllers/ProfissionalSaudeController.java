package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.DTO.ProfissionalSaudeDTO;
import com.uniter.hospital_SpringBoot.model.ProfissionalSaude;
import com.uniter.hospital_SpringBoot.repositories.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/profissionaissaude")
public class ProfissionalSaudeController {

    @Autowired
    private ProfissionalSaudeRepository repository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ProfissionalSaudeDTO>> findAll() {
        List<ProfissionalSaude> list = repository.findAll();
        List<ProfissionalSaudeDTO> listDto = list.stream().map(ProfissionalSaudeDTO::new).toList();
        return ResponseEntity.ok().body(listDto);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ProfissionalSaudeDTO> findById(@PathVariable Long id) {
        Optional<ProfissionalSaude> obj = repository.findById(id);
        return obj.map(value -> ResponseEntity.ok().body(new ProfissionalSaudeDTO(value)))
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ProfissionalSaudeDTO> insert(@RequestBody ProfissionalSaude obj) {
        ProfissionalSaude novo = repository.save(obj);
        return ResponseEntity.ok().body(new ProfissionalSaudeDTO(novo));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<ProfissionalSaudeDTO> update(@PathVariable Long id, @RequestBody ProfissionalSaude obj) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        obj.setId(id);
        return ResponseEntity.ok().body(new ProfissionalSaudeDTO(repository.save(obj)));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
