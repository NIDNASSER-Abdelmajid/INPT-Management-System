package com.AMOA.INPT_student_management.controller;

import com.AMOA.INPT_student_management.exception.StudentNotFoundException;
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

    @GetMapping("/student/{id}")
    Student getStudentById(@PathVariable Long id){
        return studentRepo.findById(id)
                .orElseThrow(()->new StudentNotFoundException(id));
    }

    @PutMapping("/student/{id}")
    Student editStudent(@RequestBody Student newStudent, @PathVariable Long id){
        return studentRepo.findById(id)
                .map(student -> {
                    student.setName(newStudent.getName());
                    student.setBranch(newStudent.getBranch());
                    student.setMail(newStudent.getMail());
                    return studentRepo.save(student);
                }).orElseThrow(()->new StudentNotFoundException(id));

    }

    @DeleteMapping("/student/{id}")
    String delStudent(@PathVariable Long id){
        if (!studentRepo.existsById((id))) {
            throw new StudentNotFoundException(id);
        }
        studentRepo.deleteById(id);
        return "Student has been deleted!";
    }
}
