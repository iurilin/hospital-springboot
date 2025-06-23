package com.uniter.hospital_SpringBoot.repositories;

import com.uniter.hospital_SpringBoot.model.ProfissionalSaude;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfissionalSaudeRepository extends JpaRepository<ProfissionalSaude, Long> {

    Optional<ProfissionalSaude> findByCpf(String cpf);
    Optional<ProfissionalSaude> findByCrmCoren(String crmCoren);
    List<ProfissionalSaude> findByEspecialidadeContainingIgnoreCase(String especialidade);
}
