package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.DTO.UsuarioDTO;
import com.uniter.hospital_SpringBoot.model.Usuario;
import com.uniter.hospital_SpringBoot.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        List<UsuarioDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id) {
        UsuarioDTO obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<UsuarioDTO> insert(@RequestBody Usuario obj) {
        UsuarioDTO newObj = service.insert(obj);
        return ResponseEntity.status(HttpStatus.CREATED).body(newObj);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<UsuarioDTO> update(@PathVariable Long id, @RequestBody Usuario obj) {
        UsuarioDTO updated = service.update(id, obj);
        return ResponseEntity.ok().body(updated);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
