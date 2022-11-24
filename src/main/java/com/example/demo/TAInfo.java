package com.example.demo;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter

public class TAInfo {
    private String firstName;
    private String lastName;
    private int yearsExperience;
    private boolean hasCar;

    private int gtID;

    public TAInfo(String firstName, String lastName, int yearsExperience, boolean hasCar, int gtID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearsExperience = yearsExperience;
        this.hasCar = hasCar;
        this.gtID = gtID;
    }
}
