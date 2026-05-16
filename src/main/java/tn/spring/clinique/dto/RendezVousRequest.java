package tn.spring.clinique.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RendezVousRequest {

    @NotNull(message = "Patient id is required")
    private Long patientId;

    @NotNull(message = "Doctor id is required")
    private Long medecinId;

    @NotEmpty(message = "Appointment date is required")
    private String dateRendezVous;

    @NotEmpty(message = "Reason is required")
    private String motif;

}