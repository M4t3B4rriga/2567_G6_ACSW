package com.doctor.controllers;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doctor.models.Paciente;
import com.doctor.models.entities.Doctor;
import com.doctor.services.DoctorService;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import feign.FeignException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctores")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Doctor doctor, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();

            result.getFieldErrors().forEach(
                    err -> errores.put(
                            err.getField(), err.getDefaultMessage()));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.save(doctor));
    }

    @GetMapping
    public List<Doctor> listar() {
        return doctorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> buscarPorId(@PathVariable Long id) {
        Optional<Doctor> doctor = doctorService.findById(id);
        if (doctor.isPresent()) {
            return ResponseEntity.ok(doctor.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@RequestBody Doctor doctor, @PathVariable Long id) {
        Optional<Doctor> doctorExistente = doctorService.findById(id);
        if (doctorExistente.isPresent()) {
            Doctor doctorAtual = doctorExistente.get();
            doctorAtual.setNombre(doctor.getNombre());
            doctorAtual.setEspecialidad(doctor.getEspecialidad());
            
            return ResponseEntity.ok(doctorService.save(doctorAtual));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        doctorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

        @PostMapping("/{id}")
    public ResponseEntity<?> agregarPaciente(@RequestBody Paciente paciente, @PathVariable Long id) {
        Optional<Paciente> optional;

        try {
            optional = doctorService.addUser(paciente, id);
        } catch (FeignException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("Error", "Usuario o doctor no encontrado"));
        }

        if (optional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(optional.get());
        }

        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{doctorId}/pacientes")
    public ResponseEntity<?> eliminarPaciente(@RequestBody Paciente paciente, @PathVariable Long doctorId) {
        Optional<Paciente> optional;

        try {
            optional = doctorService.removeUser(paciente, doctorId);
        } catch (FeignException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "Usuario o doctor no encontrado"));
    }

        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }

        return ResponseEntity.notFound().build();
    }

}
