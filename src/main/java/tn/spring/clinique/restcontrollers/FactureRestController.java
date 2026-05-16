package tn.spring.clinique.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tn.spring.clinique.entites.Facture;
import tn.spring.clinique.service.FactureService;

@RestController
@RequestMapping("/api/factures")
@CrossOrigin("*")
public class FactureRestController {

    @Autowired
    private FactureService factureService;

    @GetMapping
    public List<Facture> getAllFactures() {
        return factureService.getAllFactures();
    }
}