package com.uniter.hospital_SpringBoot.repositories;

import com.uniter.hospital_SpringBoot.model.Consulta;
import com.uniter.hospital_SpringBoot.model.Paciente;
import com.uniter.hospital_SpringBoot.model.ProfissionalSaude;
import com.uniter.hospital_SpringBoot.model.StatusConsulta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    List<Consulta> findByPaciente(Paciente paciente);
    List<Consulta> findByProfissionalSaude(ProfissionalSaude profissional);
    List<Consulta> findByStatus(StatusConsulta status);
    List<Consulta> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);
}
