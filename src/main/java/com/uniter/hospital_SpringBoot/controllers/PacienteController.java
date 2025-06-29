package com.uniter.hospital_SpringBoot.controllers;


import com.uniter.hospital_SpringBoot.DTO.PacienteDTO;
import com.uniter.hospital_SpringBoot.model.Paciente;
import com.uniter.hospital_SpringBoot.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<PacienteDTO>> findAll() {
        return ResponseEntity.ok().body(service.findAll());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<PacienteDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<PacienteDTO> insert(@RequestBody Paciente obj) {
        return ResponseEntity.ok().body(service.insert(obj));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<PacienteDTO> update(@PathVariable Long id, @RequestBody Paciente obj) {
        return ResponseEntity.ok().body(service.update(id, obj));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}