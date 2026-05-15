package tn.spring.clinique.repositories;

import java.time.LocalDateTime;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.spring.clinique.entites.RendezVous;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

	List<RendezVous> findByMedecinIdAndDateRendezVousBetween(
	        Long medecinId,
	        LocalDateTime start,
	        LocalDateTime end);

}