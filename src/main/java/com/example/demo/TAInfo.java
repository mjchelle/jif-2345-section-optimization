package com.example.demo;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@Getter

@Entity
public class TAInfo {

    @Id
    private int gtID;
    private String firstName;
    private String lastName;
    private int yearsExperience;
    private boolean hasCar;



    public TAInfo(int gtID, String firstName, String lastName, int yearsExperience, boolean hasCar) {
        this.gtID = gtID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearsExperience = yearsExperience;
        this.hasCar = hasCar;

    }
}
