package tn.spring.clinique.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import tn.spring.clinique.service.FactureService;

@Controller
public class FactureController {

    @Autowired
    private FactureService factureService;

    @GetMapping("/factures")
    public String listFactures(Model model) {

        model.addAttribute(
                "factures",
                factureService.getAllFactures());

        return "factures";
    }

}