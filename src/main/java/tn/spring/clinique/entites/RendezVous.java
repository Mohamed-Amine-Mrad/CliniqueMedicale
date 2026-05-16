package tn.spring.clinique.entites;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Entity
@Data
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FutureOrPresent(
        message = "La date du rendez-vous doit etre aujourd'hui ou dans le futur"
    )
    private LocalDateTime dateRendezVous;

    @NotEmpty(message = "Le motif est obligatoire")
    private String motif;

    @NotEmpty(message = "Le statut est obligatoire")
    private String statut;

    @JsonIgnore
    @NotNull(message = "Le patient est obligatoire")
    @ManyToOne
    private Patient patient;

    @JsonIgnore
    @NotNull(message = "Le medecin est obligatoire")
    @ManyToOne
    private Medecin medecin;

}