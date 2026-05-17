package tn.spring.clinique.restcontrollers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tn.spring.clinique.dto.ApiResponse;
import tn.spring.clinique.dto.LoginRequest;
import tn.spring.clinique.entites.Utilisateur;
import tn.spring.clinique.service.UtilisateurService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthRestController {

    @Autowired
    private UtilisateurService utilisateurService;

    

    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginRequest request) {

        Optional<Utilisateur> user =
                utilisateurService.findByEmail(request.getEmail());

        if (user.isEmpty()) {
            return new ApiResponse(false, "Email not found.");
        }

        if (!user.get().getMotDePasse().equals(request.getMotDePasse())) {
            return new ApiResponse(false, "Incorrect password.");
        }

        return new ApiResponse(true, "Login successful.");
    }
}