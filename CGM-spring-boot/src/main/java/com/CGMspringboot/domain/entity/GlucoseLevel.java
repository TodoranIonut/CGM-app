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
@Table(name = "glucose_level")
public class GlucoseLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private long timeStamp;
    private float glucoseMgPerDl;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
