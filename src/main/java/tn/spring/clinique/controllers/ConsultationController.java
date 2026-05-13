package tn.spring.clinique.controllers;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tn.spring.clinique.entites.Consultation;
import tn.spring.clinique.entites.RendezVous;
import tn.spring.clinique.service.ConsultationService;
import tn.spring.clinique.service.RendezVousService;

import tn.spring.clinique.entites.Facture;
import tn.spring.clinique.service.FactureService;

@Controller
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    @Autowired
    private RendezVousService rendezVousService;
    
    @Autowired
    private FactureService factureService;

    @GetMapping("/consultations")
    public String listConsultations(Model model) {

        model.addAttribute(
                "consultations",
                consultationService.getAllConsultations());

        return "consultations";
    }

    @GetMapping("/consultation/add")
    public String addConsultationForm(Model model) {

        model.addAttribute(
                "rendezvous",
                consultationService.getAvailableRendezVous());

        return "addConsultation";
    }

    @PostMapping("/consultation/save")
    public String saveConsultation(
            @RequestParam Long rendezVousId,
            @RequestParam String diagnostic,
            @RequestParam String ordonnance,
            @RequestParam Double prix) {

        RendezVous rendezVous =
                rendezVousService.getAllRendezVous()
                .stream()
                .filter(r -> r.getId().equals(rendezVousId))
                .findFirst()
                .get();

        Consultation consultation = new Consultation();

        consultation.setDateConsultation(LocalDate.now());

        consultation.setDiagnostic(diagnostic);

        consultation.setOrdonnance(ordonnance);
        
        consultation.setPrix(prix);

        consultation.setRendezVous(rendezVous);

        consultationService.saveConsultation(consultation);
        
        Facture facture = new Facture();

        facture.setDateFacture(LocalDate.now());

        facture.setMontant(consultation.getPrix());

        facture.setStatutPaiement("Non Payee");

        facture.setConsultation(consultation);

        factureService.saveFacture(facture);

        return "redirect:/consultations";
    }

}