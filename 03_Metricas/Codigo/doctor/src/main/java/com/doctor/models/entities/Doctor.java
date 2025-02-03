package com.doctor.models.entities;


import java.util.ArrayList;
import java.util.List;
import com.doctor.models.Paciente;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "Doctores")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(nullable = false)
    private String nombre;
    @NotEmpty
    @Column(nullable = false)
    private String especialidad;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "curso_id")
    private List<DoctorPacientes> doctorPacientes;

    @Transient
    private List<Paciente> pacientes;

    public Doctor() {
        doctorPacientes = new ArrayList<>();
        pacientes = new ArrayList<>();
    }

    public void addDoctorPacientes(DoctorPacientes doctorPaciente) {
        doctorPacientes.add(doctorPaciente);
    }

    public void removeDoctorPacientes(DoctorPacientes doctorPaciente) {
        doctorPacientes.remove(doctorPaciente);
    }

    public List<DoctorPacientes> getDoctorPacientes() {
        return doctorPacientes;
    }

    public void setDoctorPacientes(List<DoctorPacientes> doctorPacientes) {
        this.doctorPacientes = doctorPacientes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }


}
