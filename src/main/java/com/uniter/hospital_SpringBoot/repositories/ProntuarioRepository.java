package com.uniter.hospital_SpringBoot.repositories;

import com.uniter.hospital_SpringBoot.model.Consulta;
import com.uniter.hospital_SpringBoot.model.Prontuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProntuarioRepository extends JpaRepository<Prontuario, Long> {

    Optional<Prontuario> findByConsulta(Consulta consulta);
}
