package tn.spring.clinique.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.spring.clinique.entites.Consultation;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
	boolean existsByRendezVousId(Long rendezVousId);

}