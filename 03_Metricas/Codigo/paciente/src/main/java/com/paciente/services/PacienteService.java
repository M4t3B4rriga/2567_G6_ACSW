package com.paciente.services;

import java.util.List;
import java.util.Optional;

import com.paciente.models.entities.Paciente;

public interface PacienteService {
    List<Paciente> findAll();
    
    Optional<Paciente> findById(Long id);

    Paciente save(Paciente paciente);

    void deleteById(Long id);
    
}
