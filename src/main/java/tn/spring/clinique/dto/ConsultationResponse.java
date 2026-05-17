package tn.spring.clinique.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationResponse {

    private Long id;

    private LocalDate dateConsultation;

    private String diagnostic;

    private String ordonnance;

    private Double prix;

    private Long rendezVousId;

    private String patientNom;

    private String medecinNom;

    private String dateRendezVous;
}