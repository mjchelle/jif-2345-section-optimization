package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class Controller {

@Autowired
TARepository taRepository;
    @GetMapping("/tas/all")
    public List<TAInfo> getTAs(){
        return taRepository.findAll();
    }

    @PostMapping("/new")
    public TAInfo addTA(@RequestBody Map<String, String> json) {
        int gtid = Integer.parseInt(json.get("gtid"));
        String firstName = json.get("firstName");
        return taRepository.save(new TAInfo(gtid, firstName, "lastName", 10, false));



    }





}
