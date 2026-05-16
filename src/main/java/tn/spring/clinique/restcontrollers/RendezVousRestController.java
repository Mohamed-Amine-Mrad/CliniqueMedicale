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

    @GetMapping
    public List<RendezVous> getAllRendezVous() {
        return rendezVousService.getAllRendezVous();
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
}