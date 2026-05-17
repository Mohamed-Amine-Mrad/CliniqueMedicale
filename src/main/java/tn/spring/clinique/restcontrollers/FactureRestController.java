package tn.spring.clinique.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import tn.spring.clinique.entites.Facture;
import tn.spring.clinique.service.FactureService;
import tn.spring.clinique.dto.FactureResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import tn.spring.clinique.dto.ApiResponse;
import tn.spring.clinique.entites.Facture;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/api/factures")
@CrossOrigin("*")
public class FactureRestController {

    @Autowired
    private FactureService factureService;

    @GetMapping
    public List<FactureResponse> getAllFactures() {

        return factureService
                .getAllFactures()
                .stream()
                .map(f -> new FactureResponse(

                        f.getId(),

                        f.getDateFacture(),

                        f.getMontant(),

                        f.getStatutPaiement(),

                        f.getConsultation().getId(),

                        f.getConsultation()
                                .getRendezVous()
                                .getPatient()
                                .getNom(),

                        f.getConsultation()
                                .getRendezVous()
                                .getMedecin()
                                .getNom(),

                        f.getConsultation()
                                .getDiagnostic(),

                        f.getConsultation()
                                .getOrdonnance()
                ))
                .toList();
    }
    
    @PutMapping("/{id}/pay")
    public ApiResponse markAsPaid(@PathVariable Long id) {

        Facture facture = factureService.getFactureById(id).get();

        facture.setStatutPaiement("Payee");

        factureService.updateFacture(facture);

        return new ApiResponse(
                true,
                "Invoice marked as paid successfully."
        );
    }
    
    @GetMapping("/{id}")
    public FactureResponse getFactureById(@PathVariable Long id) {

        Facture f = factureService.getFactureById(id).get();

        return new FactureResponse(
                f.getId(),
                f.getDateFacture(),
                f.getMontant(),
                f.getStatutPaiement(),
                f.getConsultation().getId(),
                f.getConsultation().getRendezVous().getPatient().getNom(),
                f.getConsultation().getRendezVous().getMedecin().getNom(),
                f.getConsultation().getDiagnostic(),
                f.getConsultation().getOrdonnance()
        );
    }
    
    @PutMapping("/{id}")
    public ApiResponse updateFacture(
            @PathVariable Long id,
            @RequestBody FactureResponse request) {

        Facture facture = factureService.getFactureById(id).get();

        facture.setMontant(request.getMontant());
        facture.setStatutPaiement(request.getStatutPaiement());

        factureService.updateFacture(facture);

        return new ApiResponse(
                true,
                "Invoice updated successfully."
        );
    }
    
    @DeleteMapping("/{id}")
    public ApiResponse deleteFacture(@PathVariable Long id) {

        factureService.deleteFacture(id);

        return new ApiResponse(
                true,
                "Invoice deleted successfully."
        );
    }
}