package com.AMOA.INPT_student_management.exception;

public class StudentNotFoundException extends RuntimeException{
    public StudentNotFoundException(Long id){
        super("Student with id " + id +" wasn't found");
    }
}
