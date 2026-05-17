package tn.spring.clinique.restcontrollers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import tn.spring.clinique.dto.ConsultationRequest;
import tn.spring.clinique.entites.Consultation;
import tn.spring.clinique.entites.Facture;
import tn.spring.clinique.entites.RendezVous;
import tn.spring.clinique.service.ConsultationService;
import tn.spring.clinique.service.FactureService;
import tn.spring.clinique.service.RendezVousService;

import tn.spring.clinique.dto.ApiResponse;
import tn.spring.clinique.dto.ConsultationResponse;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin("*")
public class ConsultationRestController {

    @Autowired
    private ConsultationService consultationService;

    @Autowired
    private RendezVousService rendezVousService;

    @Autowired
    private FactureService factureService;

    @GetMapping
    public List<ConsultationResponse> getAllConsultations() {

        return consultationService
                .getAllConsultations()
                .stream()
                .map(c -> new ConsultationResponse(

                        c.getId(),

                        c.getDateConsultation(),

                        c.getDiagnostic(),

                        c.getOrdonnance(),

                        c.getPrix(),

                        c.getRendezVous().getId(),

                        c.getRendezVous()
                                .getPatient()
                                .getNom(),

                        c.getRendezVous()
                                .getMedecin()
                                .getNom(),

                        c.getRendezVous()
                                .getDateRendezVous()
                                .toString()
                ))
                .toList();
    }

    @PostMapping
    public ApiResponse addConsultation(@Valid @RequestBody ConsultationRequest request) {

        if (consultationService
                .getAvailableRendezVous()
                .stream()
                .noneMatch(r -> r.getId().equals(request.getRendezVousId()))) {

        	return new ApiResponse(false, "This appointment already has a consultation.");
        }

        RendezVous rendezVous =
                rendezVousService.getAllRendezVous()
                .stream()
                .filter(r -> r.getId().equals(request.getRendezVousId()))
                .findFirst()
                .get();

        Consultation consultation = new Consultation();

        consultation.setDateConsultation(LocalDate.now());
        consultation.setDiagnostic(request.getDiagnostic());
        consultation.setOrdonnance(request.getOrdonnance());
        consultation.setPrix(request.getPrix());
        consultation.setRendezVous(rendezVous);

        consultationService.saveConsultation(consultation);

        Facture facture = new Facture();

        facture.setDateFacture(LocalDate.now());
        facture.setMontant(request.getPrix());
        facture.setStatutPaiement("Non Payee");
        facture.setConsultation(consultation);

        factureService.saveFacture(facture);

        return new ApiResponse(true, "Consultation and invoice created successfully.");
    }
    
    @GetMapping("/{id}")
    public ConsultationResponse getConsultationById(@PathVariable Long id) {

        Consultation c = consultationService
                .getConsultationById(id)
                .get();

        return new ConsultationResponse(
                c.getId(),
                c.getDateConsultation(),
                c.getDiagnostic(),
                c.getOrdonnance(),
                c.getPrix(),
                c.getRendezVous().getId(),
                c.getRendezVous().getPatient().getNom(),
                c.getRendezVous().getMedecin().getNom(),
                c.getRendezVous().getDateRendezVous().toString()
        );
    }
    
    @PutMapping("/{id}")
    public ApiResponse updateConsultation(
            @PathVariable Long id,
            @RequestBody ConsultationRequest request) {

        Consultation existing =
                consultationService.getConsultationById(id).get();

        existing.setDiagnostic(request.getDiagnostic());
        existing.setOrdonnance(request.getOrdonnance());
        existing.setPrix(request.getPrix());

        consultationService.updateConsultation(existing);

        return new ApiResponse(
                true,
                "Consultation updated successfully."
        );
    }
    
    @DeleteMapping("/{id}")
    public ApiResponse deleteConsultation(@PathVariable Long id) {

        consultationService.deleteConsultation(id);

        return new ApiResponse(
                true,
                "Consultation deleted successfully."
        );
    }
}