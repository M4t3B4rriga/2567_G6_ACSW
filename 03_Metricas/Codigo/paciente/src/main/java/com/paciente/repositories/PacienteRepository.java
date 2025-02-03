package com.paciente.repositories;


import org.springframework.data.repository.CrudRepository;

import com.paciente.models.entities.Paciente;
public interface PacienteRepository extends CrudRepository<Paciente, Long> {

    
}

