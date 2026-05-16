package tn.spring.clinique.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ConsultationRequest {

    @NotNull(message = "Appointment id is required")
    private Long rendezVousId;

    @NotBlank(message = "Diagnostic is required")
    private String diagnostic;

    @NotBlank(message = "Ordonnance is required")
    private String ordonnance;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double prix;
}