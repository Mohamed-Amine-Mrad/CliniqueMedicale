package tn.spring.clinique.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FactureResponse {

    private Long id;

    private LocalDate dateFacture;

    private Double montant;

    private String statutPaiement;

    private Long consultationId;

    private String patientNom;

    private String medecinNom;

    private String diagnostic;

    private String ordonnance;
}