package tn.spring.clinique.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.spring.clinique.entites.Notification;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

}