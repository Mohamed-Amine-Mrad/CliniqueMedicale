package tn.spring.clinique.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.spring.clinique.entites.RendezVous;
import tn.spring.clinique.repositories.RendezVousRepository;

@Service
public class RendezVousService {

    @Autowired
    private RendezVousRepository rendezVousRepository;

    // Save appointment
    public boolean saveRendezVous(RendezVous rendezVous) {

        boolean exists = rendezVousRepository
                .existsByMedecinIdAndDateRendezVous(
                        rendezVous.getMedecin().getId(),
                        rendezVous.getDateRendezVous());

        if (exists) {
            return false;
        }

        rendezVousRepository.save(rendezVous);

        return true;
    }

    // Get all appointments
    public List<RendezVous> getAllRendezVous() {
        return rendezVousRepository.findAll();
    }

}