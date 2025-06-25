package com.uniter.hospital_SpringBoot.service;

import com.uniter.hospital_SpringBoot.DTO.ProntuarioDTO;
import com.uniter.hospital_SpringBoot.model.Consulta;
import com.uniter.hospital_SpringBoot.model.Prontuario;
import com.uniter.hospital_SpringBoot.repositories.ConsultaRepository;
import com.uniter.hospital_SpringBoot.repositories.ProntuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProntuarioService {

    @Autowired
    private ProntuarioRepository repository;

    @Autowired
    private ConsultaRepository consultaRepository;

    public List<Prontuario> findAll() {
        return repository.findAll();
    }

    public Prontuario findById(Long id) {
        Optional<Prontuario> obj = repository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Prontuário não encontrado"));
    }

    public Prontuario insert(ProntuarioDTO dto) {
        Consulta consulta = consultaRepository.findById(dto.getConsultaId())
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        Prontuario prontuario = new Prontuario(
                null,
                dto.getDataHoraAtendimento(),
                dto.getDescricao(),
                dto.getPrescricao(),
                consulta
        );
        return repository.save(prontuario);
    }

    public Prontuario update(Long id, ProntuarioDTO dto) {
        Prontuario prontuario = findById(id);
        prontuario.setDataHoraAtendimento(dto.getDataHoraAtendimento());
        prontuario.setDescricao(dto.getDescricao());
        prontuario.setPrescricao(dto.getPrescricao());

        if (dto.getConsultaId() != null) {
            Consulta consulta = consultaRepository.findById(dto.getConsultaId())
                    .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
            prontuario.setConsulta(consulta);
        }

        return repository.save(prontuario);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
