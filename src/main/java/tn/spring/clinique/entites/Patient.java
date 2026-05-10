package tn.spring.clinique.entites;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Le nom est obligatoire")
    private String nom;

    @NotEmpty(message = "Le dossier medical est obligatoire")
    private String dossierMedical;

    private LocalDate dateNaissance;

    @Size(min = 8, max = 8, message = "Le numero doit contenir 8 chiffres")
    private String tel;

}