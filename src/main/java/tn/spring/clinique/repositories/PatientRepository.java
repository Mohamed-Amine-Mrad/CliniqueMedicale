package tn.spring.clinique.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.spring.clinique.entites.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

}