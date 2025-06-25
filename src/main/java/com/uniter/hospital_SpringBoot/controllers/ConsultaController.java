package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.DTO.ConsultaDTO;
import com.uniter.hospital_SpringBoot.model.Consulta;
import com.uniter.hospital_SpringBoot.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Consulta>> findAll() {
        List<Consulta> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Consulta> findById(@PathVariable Long id) {
        Consulta obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Consulta> insert(@RequestBody ConsultaDTO dto) {
        Consulta newObj = service.insert(dto);
        return ResponseEntity.ok().body(newObj);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Consulta> update(@PathVariable Long id, @RequestBody ConsultaDTO dto) {
        Consulta updatedObj = service.update(id, dto);
        return ResponseEntity.ok().body(updatedObj);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
