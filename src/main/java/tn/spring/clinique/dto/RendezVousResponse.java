package tn.spring.clinique.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RendezVousResponse {

    private Long id;

    private LocalDateTime dateRendezVous;

    private String motif;

    private String statut;

    private Long patientId;

    private String patientNom;

    private Long medecinId;

    private String medecinNom;

    private String medecinSpecialite;
}