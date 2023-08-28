package com.CGMspringboot.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "patient")
public class Patient extends AppUser {

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private int age;
    private float heightCm;
    private float weightKg;

    @Enumerated(EnumType.STRING)
    private Diagnostic diagnostic;

    public enum Gender {
        MALE, FEMALE
    }

    public enum Diagnostic {
        HEALTHY, DIABETES_I, DIABETES_II, GESTATIONAL
    }

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

}
