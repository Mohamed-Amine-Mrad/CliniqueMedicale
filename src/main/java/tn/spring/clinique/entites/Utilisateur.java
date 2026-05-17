package tn.spring.clinique.entites;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Entity
@Data
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Le nom est obligatoire")
    private String nom;

    @Email(message = "Email invalide")
    @NotEmpty(message = "Email obligatoire")
    private String email;

    @NotEmpty(message = "Mot de passe obligatoire")
    private String motDePasse;

    private String role;
}