package tn.spring.clinique.entites;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La date consultation est obligatoire")
    private LocalDate dateConsultation;

    @NotBlank(message = "Le diagnostic est obligatoire")
    private String diagnostic;

    @NotBlank(message = "L'ordonnance est obligatoire")
    private String ordonnance;

    @Positive(message = "Le prix doit etre positif")
    private Double prix;
    
    @JsonIgnore
    @OneToOne
    private RendezVous rendezVous;

}