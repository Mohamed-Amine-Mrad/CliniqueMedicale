package tn.spring.clinique.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import tn.spring.clinique.entites.Facture;
import tn.spring.clinique.entites.RendezVous;
import tn.spring.clinique.service.FactureService;
import tn.spring.clinique.service.MedecinService;
import tn.spring.clinique.service.PatientService;
import tn.spring.clinique.service.RendezVousService;

@Controller
public class HomeController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedecinService medecinService;

    @Autowired
    private RendezVousService rendezVousService;

    @Autowired
    private FactureService factureService;

    @GetMapping("/")
    public String home(Model model) {

        List<RendezVous> rendezvous = rendezVousService.getAllRendezVous();
        List<Facture> factures = factureService.getAllFactures();

        double totalRevenue = 0;

        for (Facture f : factures) {
            if (f.getMontant() != null) {
                totalRevenue = totalRevenue + f.getMontant();
            }
        }

        model.addAttribute("totalPatients", patientService.getAllPatients().size());
        model.addAttribute("totalDoctors", medecinService.getAllMedecins().size());
        model.addAttribute("totalAppointments", rendezvous.size());
        model.addAttribute("totalRevenue", totalRevenue);
        model.addAttribute("rendezvous", rendezvous);

        return "home";
    }
}