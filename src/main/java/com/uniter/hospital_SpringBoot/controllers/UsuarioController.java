package com.uniter.hospital_SpringBoot.controllers;

import com.uniter.hospital_SpringBoot.DTO.UsuarioDTO;
import com.uniter.hospital_SpringBoot.model.Usuario;
import com.uniter.hospital_SpringBoot.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        List<Usuario> list = repository.findAll();
        List<UsuarioDTO> listDto = list.stream().map(UsuarioDTO::new).toList();
        return ResponseEntity.ok().body(listDto);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id) {
        Optional<Usuario> obj = repository.findById(id);
        return obj.map(value -> ResponseEntity.ok().body(new UsuarioDTO(value)))
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<UsuarioDTO> insert(@RequestBody Usuario obj) {
        Usuario novo = repository.save(obj);
        return ResponseEntity.ok().body(new UsuarioDTO(novo));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<UsuarioDTO> update(@PathVariable Long id, @RequestBody Usuario obj) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        obj.setId(id);
        return ResponseEntity.ok().body(new UsuarioDTO(repository.save(obj)));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
