package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.DTO.ProntuarioDTO;
import com.uniter.hospital_SpringBoot.model.Prontuario;
import com.uniter.hospital_SpringBoot.service.ProntuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/prontuarios")
public class ProntuarioController {

    @Autowired
    private ProntuarioService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ProntuarioDTO>> findAll() {
        List<Prontuario> list = service.findAll();
        List<ProntuarioDTO> listDto = list.stream().map(ProntuarioDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ProntuarioDTO> findById(@PathVariable Long id) {
        Prontuario obj = service.findById(id);
        return ResponseEntity.ok().body(new ProntuarioDTO(obj));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ProntuarioDTO> insert(@RequestBody ProntuarioDTO dto) {
        Prontuario novo = service.insert(dto);
        return ResponseEntity.ok().body(new ProntuarioDTO(novo));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<ProntuarioDTO> update(@PathVariable Long id, @RequestBody ProntuarioDTO dto) {
        Prontuario atualizado = service.update(id, dto);
        return ResponseEntity.ok().body(new ProntuarioDTO(atualizado));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}