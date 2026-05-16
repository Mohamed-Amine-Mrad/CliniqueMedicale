package tn.spring.clinique.restcontrollers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tn.spring.clinique.entites.Patient;
import tn.spring.clinique.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin("*")
public class PatientRestController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public Optional<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PostMapping
    public Patient addPatient(@Valid @RequestBody Patient patient) {
        patientService.savePatient(patient);
        return patient;
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id,
            @Valid @RequestBody Patient patient) {
        patient.setId(id);
        patientService.savePatient(patient);
        return patient;
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }
}