package com.uniter.hospital_SpringBoot.controllers;


import com.uniter.hospital_SpringBoot.DTO.PacienteDTO;
import com.uniter.hospital_SpringBoot.model.Paciente;
import com.uniter.hospital_SpringBoot.repositories.PacienteRepository;
import com.uniter.hospital_SpringBoot.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository repository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<PacienteDTO>> findAll() {
        List<Paciente> list = repository.findAll();
        List<PacienteDTO> listDto = list.stream().map(PacienteDTO::new).toList();
        return ResponseEntity.ok().body(listDto);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<PacienteDTO> findById(@PathVariable Long id) {
        Optional<Paciente> obj = repository.findById(id);
        return obj.map(value -> ResponseEntity.ok().body(new PacienteDTO(value)))
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<PacienteDTO> insert(@RequestBody Paciente obj) {
        Paciente novo = repository.save(obj);
        return ResponseEntity.ok().body(new PacienteDTO(novo));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<PacienteDTO> update(@PathVariable Long id, @RequestBody Paciente obj) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        obj.setId(id);
        return ResponseEntity.ok().body(new PacienteDTO(repository.save(obj)));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
