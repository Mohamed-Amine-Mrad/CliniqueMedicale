package tn.spring.clinique.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.spring.clinique.entites.Patient;
import tn.spring.clinique.repositories.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Add patient
    public void savePatient(Patient patient) {
        patientRepository.save(patient);
    }

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by id
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    // Delete patient
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

}