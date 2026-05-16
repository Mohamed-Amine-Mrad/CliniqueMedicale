package tn.spring.clinique.restcontrollers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tn.spring.clinique.entites.Medecin;
import tn.spring.clinique.service.MedecinService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medecins")
@CrossOrigin("*")
public class MedecinRestController {

    @Autowired
    private MedecinService medecinService;

    @GetMapping
    public List<Medecin> getAllMedecins() {
        return medecinService.getAllMedecins();
    }

    @GetMapping("/{id}")
    public Optional<Medecin> getMedecinById(@PathVariable Long id) {
        return medecinService.getMedecinById(id);
    }

    @PostMapping
    public Medecin addMedecin(@Valid @RequestBody Medecin medecin) {
        medecinService.saveMedecin(medecin);
        return medecin;
    }

    @PutMapping("/{id}")
    public Medecin updateMedecin(@PathVariable Long id,
            @Valid @RequestBody Medecin medecin) {
        medecin.setId(id);
        medecinService.saveMedecin(medecin);
        return medecin;
    }

    @DeleteMapping("/{id}")
    public void deleteMedecin(@PathVariable Long id) {
        medecinService.deleteMedecin(id);
    }
}