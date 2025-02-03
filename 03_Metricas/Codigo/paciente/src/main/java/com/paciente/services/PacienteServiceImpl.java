package com.paciente.services;
import com.paciente.models.entities.Paciente;
import com.paciente.repositories.PacienteRepository;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PacienteServiceImpl implements com.paciente.services.PacienteService {

    @Autowired
    private PacienteRepository repository;

    @Override
    public List<Paciente> findAll() {
        return (List<Paciente>) repository.findAll();
    }
    @Override
    public Optional<Paciente> findById(Long id) {
        return repository.findById(id);
    }
    @Override
    public Paciente save(Paciente paciente) {
        return repository.save(paciente);
    }
    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    
}
