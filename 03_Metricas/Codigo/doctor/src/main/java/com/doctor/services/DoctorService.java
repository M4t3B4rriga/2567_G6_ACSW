package com.doctor.services;

import java.util.List;
import java.util.Optional;

import com.doctor.models.Paciente;
import com.doctor.models.entities.Doctor;

public interface DoctorService {

    List<Doctor> findAll();

    Optional<Doctor> findById(Long id);

    Doctor save(Doctor doctor);

    void deleteById(Long id);

    Optional<Paciente> addUser(Paciente paciente, Long id);
    Optional<Paciente> removeUser(Paciente paciente, Long idDoctor);
} 
