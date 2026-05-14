package tn.spring.clinique.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.spring.clinique.entites.Notification;
import tn.spring.clinique.entites.RendezVous;
import tn.spring.clinique.repositories.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // Create notification from appointment
    public void createNotification(RendezVous rendezVous) {

        Notification notification = new Notification();

        String message =
                "Reminder : Patient "
                + rendezVous.getPatient().getNom()
                + " has an appointment with Dr. "
                + rendezVous.getMedecin().getNom();

        notification.setMessage(message);

        notification.setDateEnvoi(LocalDateTime.now());

        notificationRepository.save(notification);
    }

    // Get all notifications
    public List<Notification> getAllNotifications() {

        return notificationRepository.findAll();
    }

}