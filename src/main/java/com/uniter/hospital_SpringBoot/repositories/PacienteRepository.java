package com.uniter.hospital_SpringBoot.repositories;

import com.uniter.hospital_SpringBoot.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Optional<Paciente> findByCpf(String cpf);
    List<Paciente> findByNomeCompletoContainingIgnoreCase(String nome);
}