package tn.spring.clinique.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import tn.spring.clinique.entites.Utilisateur;
import tn.spring.clinique.repositories.UtilisateurRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(UtilisateurRepository repository) {

        return args -> {

            if (repository.findByEmail("admin@medicare.tn").isEmpty()) {

                Utilisateur admin = new Utilisateur();

                admin.setNom("Admin");

                admin.setEmail("admin@medicare.tn");

                admin.setMotDePasse("admin123");

                admin.setRole("ADMIN");

                repository.save(admin);

                System.out.println("Admin account created.");
            }
        };
    }
}