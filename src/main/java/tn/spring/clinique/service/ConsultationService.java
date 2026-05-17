package tn.spring.clinique.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.spring.clinique.entites.Consultation;
import tn.spring.clinique.repositories.ConsultationRepository;

import java.util.stream.Collectors;

import tn.spring.clinique.entites.RendezVous;
import tn.spring.clinique.service.RendezVousService;
import java.util.Optional;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRepository consultationRepository;
    
    @Autowired
    private RendezVousService rendezVousService;

    // Save consultation
    public void saveConsultation(Consultation consultation) {
        consultationRepository.save(consultation);
    }
    
    public void deleteConsultation(Long id) {
        consultationRepository.deleteById(id);
    }

    // Get all consultations
    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }
    
    public List<RendezVous> getAvailableRendezVous() {

        return rendezVousService.getAllRendezVous()
                .stream()
                .filter(r ->
                    !consultationRepository.existsByRendezVousId(r.getId()))
                .collect(Collectors.toList());
    }
    
    public Optional<Consultation> getConsultationById(Long id) {
        return consultationRepository.findById(id);
    }
    
    public Consultation updateConsultation(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

}