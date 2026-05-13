package tn.spring.clinique.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.spring.clinique.entites.Facture;
import tn.spring.clinique.repositories.FactureRepository;

@Service
public class FactureService {

    @Autowired
    private FactureRepository factureRepository;

    // Save invoice
    public void saveFacture(Facture facture) {
        factureRepository.save(facture);
    }

    // Get all invoices
    public List<Facture> getAllFactures() {
        return factureRepository.findAll();
    }

}