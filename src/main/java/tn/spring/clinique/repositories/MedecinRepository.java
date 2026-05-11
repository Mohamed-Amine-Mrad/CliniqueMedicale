package tn.spring.clinique.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.spring.clinique.entites.Medecin;

@Repository
public interface MedecinRepository extends JpaRepository<Medecin, Long> {

}