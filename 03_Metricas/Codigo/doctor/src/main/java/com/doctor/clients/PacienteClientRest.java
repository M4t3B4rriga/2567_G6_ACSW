package com.doctor.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.doctor.models.Paciente;

@FeignClient(name = "microservicepacientes", url = "localhost:8002/api/pacientes")
public interface PacienteClientRest {
    @GetMapping("/{id}")
    Paciente findById(@PathVariable Long id);
}

