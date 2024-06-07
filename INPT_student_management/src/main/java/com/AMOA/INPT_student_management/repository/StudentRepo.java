package com.AMOA.INPT_student_management.repository;

import com.AMOA.INPT_student_management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Long> {
}
