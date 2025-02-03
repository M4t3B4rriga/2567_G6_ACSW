package com.doctor.repositories;

import org.springframework.data.repository.CrudRepository;

import com.doctor.models.entities.Doctor;

public interface DoctorRepository extends CrudRepository<Doctor, Long> {

    
} 
