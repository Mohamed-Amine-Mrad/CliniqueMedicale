package tn.spring.clinique.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import tn.spring.clinique.service.MedecinService;
import tn.spring.clinique.service.PatientService;
import tn.spring.clinique.service.RendezVousService;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tn.spring.clinique.entites.Medecin;
import tn.spring.clinique.entites.Patient;
import tn.spring.clinique.entites.RendezVous;

@Controller
public class RendezVousController {

    @Autowired
    private RendezVousService rendezVousService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedecinService medecinService;

    @GetMapping("/rendezvous")
    public String listRendezVous(Model model) {
        model.addAttribute("rendezvous", rendezVousService.getAllRendezVous());
        return "rendezvous";
    }

    @GetMapping("/rendezvous/add")
    public String addRendezVousForm(Model model) {
        model.addAttribute("patients", patientService.getAllPatients());
        model.addAttribute("medecins", medecinService.getAllMedecins());
        return "addRendezVous";
    }
    @PostMapping("/rendezvous/save")
    public String saveRendezVous(
            @RequestParam Long patientId,
            @RequestParam Long medecinId,
            @RequestParam String dateRendezVous,
            Model model) {

        Patient patient = patientService.getPatientById(patientId).get();
        Medecin medecin = medecinService.getMedecinById(medecinId).get();

        RendezVous rendezVous = new RendezVous();
        rendezVous.setPatient(patient);
        rendezVous.setMedecin(medecin);
        rendezVous.setDateRendezVous(LocalDateTime.parse(dateRendezVous));
        rendezVous.setStatut("Confirmé");

        boolean saved = rendezVousService.saveRendezVous(rendezVous);

        if (!saved) {
            model.addAttribute("error", "This doctor is not available at this date and time.");
            model.addAttribute("patients", patientService.getAllPatients());
            model.addAttribute("medecins", medecinService.getAllMedecins());
            return "addRendezVous";
        }

        return "redirect:/rendezvous";
    }
}