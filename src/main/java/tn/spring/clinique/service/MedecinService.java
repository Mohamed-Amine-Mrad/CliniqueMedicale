package tn.spring.clinique.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.spring.clinique.entites.Medecin;
import tn.spring.clinique.repositories.MedecinRepository;

@Service
public class MedecinService {

    @Autowired
    private MedecinRepository medecinRepository;

    // Save doctor
    public void saveMedecin(Medecin medecin) {
        medecinRepository.save(medecin);
    }

    // Get all doctors
    public List<Medecin> getAllMedecins() {
        return medecinRepository.findAll();
    }

    // Get doctor by id
    public Optional<Medecin> getMedecinById(Long id) {
        return medecinRepository.findById(id);
    }

    // Delete doctor
    public void deleteMedecin(Long id) {
        medecinRepository.deleteById(id);
    }

}