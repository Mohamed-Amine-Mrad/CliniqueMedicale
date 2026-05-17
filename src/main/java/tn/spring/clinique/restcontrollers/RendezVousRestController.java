package tn.spring.clinique.restcontrollers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import tn.spring.clinique.dto.RendezVousRequest;
import tn.spring.clinique.entites.Medecin;
import tn.spring.clinique.entites.Patient;
import tn.spring.clinique.entites.RendezVous;
import tn.spring.clinique.service.MedecinService;
import tn.spring.clinique.service.NotificationService;
import tn.spring.clinique.service.PatientService;
import tn.spring.clinique.service.RendezVousService;

import tn.spring.clinique.dto.ApiResponse;
import tn.spring.clinique.dto.RendezVousResponse;
import tn.spring.clinique.repositories.ConsultationRepository;
import tn.spring.clinique.service.ConsultationService;

@RestController
@RequestMapping("/api/rendezvous")
@CrossOrigin("*")
public class RendezVousRestController {

    @Autowired
    private RendezVousService rendezVousService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedecinService medecinService;

    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private ConsultationRepository consultationRepository;
    
    @Autowired
    private ConsultationService consultationService;

    @GetMapping
    public List<RendezVousResponse> getAllRendezVous() {

        return rendezVousService.getAllRendezVous()
                .stream()
                .map(r -> new RendezVousResponse(
                        r.getId(),
                        r.getDateRendezVous(),
                        r.getMotif(),
                        r.getStatut(),
                        r.getPatient().getId(),
                        r.getPatient().getNom(),
                        r.getMedecin().getId(),
                        r.getMedecin().getNom(),
                        r.getMedecin().getSpecialite()
                ))
                .toList();
    }

    @PostMapping
    public ApiResponse addRendezVous(@Valid @RequestBody RendezVousRequest request) {

        Patient patient = patientService.getPatientById(request.getPatientId()).get();
        Medecin medecin = medecinService.getMedecinById(request.getMedecinId()).get();

        RendezVous rendezVous = new RendezVous();

        rendezVous.setPatient(patient);
        rendezVous.setMedecin(medecin);
        rendezVous.setDateRendezVous(LocalDateTime.parse(request.getDateRendezVous()));
        rendezVous.setMotif(request.getMotif());
        rendezVous.setStatut("Confirmé");

        boolean saved = rendezVousService.saveRendezVous(rendezVous);

        if (!saved) {
        	return new ApiResponse(false, "Doctor not available. Minimum interval between appointments is one hour.");
        }

        notificationService.createNotification(rendezVous);

        return new ApiResponse(true, "Appointment created successfully.");
    }
    @GetMapping("/{id}")
    public RendezVousResponse getRendezVousById(@PathVariable Long id) {

        RendezVous r = rendezVousService.getRendezVousById(id).get();

        return new RendezVousResponse(
                r.getId(),
                r.getDateRendezVous(),
                r.getMotif(),
                r.getStatut(),
                r.getPatient().getId(),
                r.getPatient().getNom(),
                r.getMedecin().getId(),
                r.getMedecin().getNom(),
                r.getMedecin().getSpecialite()
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse deleteRendezVous(@PathVariable Long id) {

        if (consultationRepository.existsByRendezVousId(id)) {
            return new ApiResponse(
                    false,
                    "Cannot delete appointment because it already has a consultation."
            );
        }

        rendezVousService.deleteRendezVous(id);

        return new ApiResponse(
                true,
                "Appointment deleted successfully."
        );
    }
    
    @PutMapping("/{id}")
    public ApiResponse updateRendezVous(
            @PathVariable Long id,
            @RequestBody RendezVousRequest request) {

        RendezVous existing =
                rendezVousService.getRendezVousById(id).get();

        Patient patient =
                patientService.getPatientById(request.getPatientId()).get();

        Medecin medecin =
                medecinService.getMedecinById(request.getMedecinId()).get();

        existing.setPatient(patient);
        existing.setMedecin(medecin);
        existing.setDateRendezVous(
                LocalDateTime.parse(request.getDateRendezVous()));
        existing.setMotif(request.getMotif());
        existing.setStatut("CONFIRMED");

        rendezVousService.updateRendezVous(existing);

        return new ApiResponse(
                true,
                "Appointment updated successfully."
        );
    }
    
    @GetMapping("/available-for-consultation")
    public List<RendezVousResponse> getAvailableRendezVousForConsultation() {

        return consultationService
                .getAvailableRendezVous()
                .stream()
                .map(r -> new RendezVousResponse(
                        r.getId(),
                        r.getDateRendezVous(),
                        r.getMotif(),
                        r.getStatut(),
                        r.getPatient().getId(),
                        r.getPatient().getNom(),
                        r.getMedecin().getId(),
                        r.getMedecin().getNom(),
                        r.getMedecin().getSpecialite()
                ))
                .toList();
    }
}