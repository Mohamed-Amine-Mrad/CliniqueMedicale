package tn.spring.clinique.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import tn.spring.clinique.entites.Medecin;
import tn.spring.clinique.service.MedecinService;

@Controller
public class MedecinController {

    @Autowired
    private MedecinService medecinService;

    @GetMapping("/medecins")
    public String listMedecins(Model model) {
        model.addAttribute("medecins", medecinService.getAllMedecins());
        return "medecins";
    }

    @GetMapping("/medecin/add")
    public String addMedecinForm(Model model) {
        model.addAttribute("medecin", new Medecin());
        return "addMedecin";
    }

    @PostMapping("/medecin/save")
    public String saveMedecin(@ModelAttribute Medecin medecin) {
        medecinService.saveMedecin(medecin);
        return "redirect:/medecins";
    }
}