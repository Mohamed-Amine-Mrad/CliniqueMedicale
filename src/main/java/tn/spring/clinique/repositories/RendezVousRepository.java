package tn.spring.clinique.repositories;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.spring.clinique.entites.RendezVous;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    boolean existsByMedecinIdAndDateRendezVous(Long medecinId, LocalDateTime dateRendezVous);

}