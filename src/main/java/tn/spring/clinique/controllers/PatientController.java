package tn.spring.clinique.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import tn.spring.clinique.entites.Patient;
import tn.spring.clinique.service.PatientService;

@Controller
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/patients")
    public String listPatients(Model model) {
        model.addAttribute("patients", patientService.getAllPatients());
        return "patients";
    }

    @GetMapping("/patient/add")
    public String addPatientForm(Model model) {
        model.addAttribute("patient", new Patient());
        return "addPatient";
    }
}