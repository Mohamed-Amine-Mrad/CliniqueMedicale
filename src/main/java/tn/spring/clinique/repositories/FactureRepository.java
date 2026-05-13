package tn.spring.clinique.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.spring.clinique.entites.Facture;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {

}