package tn.spring.clinique.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import tn.spring.clinique.entites.Patient;
import tn.spring.clinique.service.PatientService;

import org.springframework.web.bind.annotation.PathVariable;

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

    @PostMapping("/patient/save")
    public String savePatient(@ModelAttribute Patient patient) {

        patientService.savePatient(patient);

        return "redirect:/patients";
    }
    
    @GetMapping("/patient/delete/{id}")
    public String deletePatient(@PathVariable Long id) {

        patientService.deletePatient(id);

        return "redirect:/patients";
    }

}