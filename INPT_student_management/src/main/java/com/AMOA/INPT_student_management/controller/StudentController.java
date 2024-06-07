package com.AMOA.INPT_student_management.controller;

import com.AMOA.INPT_student_management.model.Student;
import com.AMOA.INPT_student_management.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentRepo studentRepo;

    @PostMapping("/student")
    Student newStudent(@RequestBody Student newStudent){
        return studentRepo.save(newStudent);
    }

    @GetMapping("/students")
    List<Student> getAllStudents(){
        return studentRepo.findAll();
    }
}
