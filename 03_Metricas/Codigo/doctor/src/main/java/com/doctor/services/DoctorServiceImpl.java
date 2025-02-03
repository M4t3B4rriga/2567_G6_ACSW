package com.doctor.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.models.entities.DoctorPacientes;
import com.doctor.models.entities.Doctor;
import com.doctor.models.Paciente;
import com.doctor.repositories.DoctorRepository;
import com.doctor.clients.PacienteClientRest;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService{
    @Autowired
    private DoctorRepository repository;

    @Autowired
    private PacienteClientRest clientRest;

    @Override
    public List<Doctor> findAll() {
        return (List<Doctor>) repository.findAll();
    }

    @Override
    public Optional<Doctor> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Doctor save(Doctor doctor) {
        return repository.save(doctor);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Paciente> addUser(Paciente paciente, Long id) {
        Optional<Doctor> optional = repository.findById(id);

        if (optional.isPresent()) {
            Paciente pacienteTemp = clientRest.findById(paciente.getId());

            Doctor doctor = optional.get();
            DoctorPacientes doctorPacientes = new DoctorPacientes();

            doctorPacientes.setPacienteId(pacienteTemp.getId());
            doctor.addDoctorPacientes(doctorPacientes);
            repository.save(doctor);
            return Optional.of(pacienteTemp);
        }

        return Optional.empty();
    }
    @Override
    public Optional<Paciente> removeUser(Paciente paciente, Long idDoctor) {
        Optional<Doctor> optional = repository.findById(idDoctor);

        if (optional.isPresent()) {
            Doctor doctor = optional.get();
    
            // Verificar si el estudiante ya existe en el curso
            Optional<DoctorPacientes> doctorPacienteOptional = doctor.getDoctorPacientes().stream()
                .filter(ce -> ce.getPacienteId().equals(paciente.getId()))
                .findFirst();
    
            if (doctorPacienteOptional.isPresent()) {
                DoctorPacientes doctorPacientes = doctorPacienteOptional.get();
                doctor.removeDoctorPacientes(doctorPacientes);
                repository.save(doctor);
                return Optional.of(paciente);
            }
        }
    
        return Optional.empty();
    }
    
}
