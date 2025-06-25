package com.uniter.hospital_SpringBoot.service;

import com.uniter.hospital_SpringBoot.DTO.UsuarioDTO;
import com.uniter.hospital_SpringBoot.model.Usuario;
import com.uniter.hospital_SpringBoot.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public List<UsuarioDTO> findAll() {
        return repository.findAll().stream().map(UsuarioDTO::new).toList();
    }

    public UsuarioDTO findById(Long id) {
        Usuario obj = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return new UsuarioDTO(obj);
    }

    public UsuarioDTO insert(Usuario obj) {
        return new UsuarioDTO(repository.save(obj));
    }

    public UsuarioDTO update(Long id, Usuario obj) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        obj.setId(id);
        return new UsuarioDTO(repository.save(obj));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        repository.deleteById(id);
    }
}
