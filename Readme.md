# Student Management Application

## Overview

The Student Management Application is a full-stack web application designed to manage student information. The backend is built using Spring Boot, while the frontend is developed using React. This application allows users to perform CRUD (Create, Read, Update, Delete) operations on student records.

## Project Structure

### Backend

The backend of the application is built using Spring Boot and includes the following key components:

#### Entity

1. **`Student.java`**
   - Defines the `Student` entity with fields for `id`, `name`, `branch`, and `mail`.
   ```java
   @Entity
   @Table(name = "students")
   public class Student {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;
       private String name;
       private String branch;
       private String mail;

       // Getters and setters
   }
   ```

#### Repository

2. **`StudentRepo.java`**
   - Repository interface for performing CRUD operations on the `Student` entity.
   ```java
   @Repository
   public interface StudentRepo extends JpaRepository<Student, Long> {
   }
   ```

#### Controller

3. **`StudentController.java`**
   - Handles RESTful HTTP requests for student operations such as adding, retrieving, updating, and deleting students.
   - The controller uses `@RestController` and `@RequestMapping` to define the base URL for student operations.
   ```java
   @RestController
   @RequestMapping("/students")
   @CrossOrigin(origins = "http://localhost:3000")
   public class StudentController {
   ```
   - **Get All Students**
     - Fetches all students from the database.
     ```java
     @GetMapping
     public List<Student> getAllStudents() {
         return studentRepo.findAll();
     }
     ```
   - **Create Student**
     - Adds a new student to the database.
     ```java
     @PostMapping
     public Student createStudent(@RequestBody Student student) {
         return studentRepo.save(student);
     }
     ```
   - **Get Student by ID**
     - Fetches a student by their ID.
     ```java
     @GetMapping("/{id}")
     public Student getStudentById(@PathVariable Long id) {
         return studentRepo.findById(id)
             .orElseThrow(() -> new StudentNotFoundException(id));
     }
     ```
   - **Update Student**
     - Updates an existing student's information.
     ```java
     @PutMapping("/{id}")
     public Student updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
         Student student = studentRepo.findById(id)
             .orElseThrow(() -> new StudentNotFoundException(id));

         student.setName(studentDetails.getName());
         student.setBranch(studentDetails.getBranch());
         student.setMail(studentDetails.getMail());

         return studentRepo.save(student);
     }
     ```
   - **Delete Student**
     - Deletes a student from the database.
     ```java
     @DeleteMapping("/{id}")
     public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
         Student student = studentRepo.findById(id)
             .orElseThrow(() -> new StudentNotFoundException(id));

         studentRepo.delete(student);
         return ResponseEntity.ok().build();
     }
     ```

#### Exception Handling

4. **`StudentNotFoundException.java`**
   - Custom exception for handling student not found scenarios.
   ```java
   @ResponseStatus(HttpStatus.NOT_FOUND)
   public class StudentNotFoundException extends RuntimeException {
       public StudentNotFoundException(Long id) {
           super("Could not find student with id " + id);
       }
   }
   ```

5. **`StudentNotFoundHelp.java`**
   - Exception handler for `StudentNotFoundException`.
   ```java
   @ControllerAdvice
   public class StudentNotFoundHelp {
       @ResponseBody
       @ExceptionHandler(StudentNotFoundException.class)
       @ResponseStatus(HttpStatus.NOT_FOUND)
       String studentNotFoundHandler(StudentNotFoundException ex) {
           return ex.getMessage();
       }
   }
   ```

### Frontend

The frontend of the application is built using React and is structured as follows:

#### Components

1. **`layout/Navbar.js`**
   - A navigation bar with links to the home page and the add student form.
   ```JSX
   import React from 'react';
   import { Link } from 'react-router-dom';

   export default function Navbar() {
     return (
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container-fluid">
           <Link to="/" className="navbar-brand">INPT Student Manager</Link>
           <Link className="btn btn-outline-light" to="/addStudent">Add Student</Link>
         </div>
       </nav>
     );
   }
   ```

2. **`pages/Home.js`**
   - Displays a list of students and provides options to view, edit, or delete each student.

   - **State Management and Data Fetching**
     - The component uses React's `useState` to manage the list of students and `useEffect` to fetch the student data from the backend API.
     ```JSX
     import React from 'react';
     import axios from 'axios';
     import { Link, useParams } from 'react-router-dom';

     export default function Home() {
       const [students, setStudents] = React.useState([]);
       const {id} = useParams();
       
       React.useEffect(() => {
         chargeStudentsInfo();
       }, []);

       const chargeStudentsInfo = async () => {
         const students = await axios.get('http://localhost:8080/students');
         setStudents(students.data);
       };
     ```

   - **Delete Student Functionality**
     - The `delStudent` function sends a DELETE request to the backend to remove a student and refreshes the student list.
     ```JSX
       const delStudent = async (id) => {
         await axios.delete(`http://localhost:8080/student/${id}`);
         chargeStudentsInfo();
       };
     ```

   - **Rendering the Student List**
     - The student list is rendered in a table with options to view, edit, or delete each student.
     ```JSX
       return (
         <div className='container'>
           <div className='py-4'>
             <table className="table border shadow">
               <thead>
                 <tr>
                   <th scope="col">ID</th>
                   <th scope="col">Name</th>
                   <th scope="col">Branch</th>
                   <th scope="col">School mail</th>
                   <th scope="col">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {students.map((student, index) => (
                   <tr key={index}>
                     <th scope="row">{index + 1}</th>
                     <td>{student.name}</td>
                     <td>{student.branch}</td>
                     <td>{student.mail}</td>
                     <td>
                       <Link to={`/viewstudent/${student.id}`} className='btn btn-primary mx-2'>View</Link>
                       <Link to={`/editstudent/${student.id}`} className='btn btn-outline-primary mx-2'>Edit</Link>
                       <button className='btn btn-danger mx-2' onClick={() => delStudent(student.id)}>Delete</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       );
     }
     ```

3. **`students/AddStudent.js`**
   - Form to add a new student.

   - **State Management and Input Handling**
     - The component uses `useState` to manage the form inputs and `onChangerInput` to handle input changes.
     ```JSX
     import React from 'react';
     import axios from 'axios';
     import { Link, useNavigate } from 'react-router-dom';

     export default function AddStudent() {
       let nav = useNavigate();

       const [student, setStudent] = React.useState({
         name: '',
         branch: '',
         mail: ''
       });

       const {name, branch, mail} = student;

       const onChangerInput = (event) => {
         setStudent({...student, [event.target.name]: event.target.value});
       };
     ```

   - **Form Submission**
     - The `onSubmitClick` function sends a POST request to the backend to add a new student and navigates back to the home page.
     ```JSX
       const onSubmitClick = async (event) => {
         event.preventDefault();
         await axios.post('http://localhost:8080/student', student);
         nav('/');
       };
     ```

   - **Rendering the Form**
     - The form is rendered with fields for `name`, `branch`, and `mail`, and includes submit and cancel buttons.
    ```JSX
      return (
         <div className='container'>
           <div className='row'>
             <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
               <h2 className='text-center m-2'>Add Student to System</h2>
               <form onSubmit={event => onSubmitClick(event)}>
                 <div className='mb-3'>
                   <label htmlFor='name' className='form-label'>Name</label>
                   <input type='text' className='form-control' placeholder='Enter student name' name='name' value={name} onChange={(event)=>onChangerInput(event)}/>
                   <label htmlFor='branch' className='form-label'>Branch</label>
                   <input type='text' className='form-control' placeholder='Enter student branch' name='branch' value={branch} onChange={(event)=>onChangerInput(event)}/>
                   <label htmlFor='mail' className='form-label'>Mail</label>
                   <input type='text' className='form-control' placeholder='Enter student mail' name='mail' value={mail} onChange={(event)=>onChangerInput(event)}/>
                   <button type='submit' className='btn btn-outline-primary'>Submit</button>
                   <Link to="/" className='btn btn-outline-danger mx-2'>Cancel</Link>
                 </div>
               </form>
             </div>
           </div>
         </div>
       );
     }
    ```

4. **`students/EditStudent.js`**
   - Form to edit an existing student.

   - **State Management and Input Handling**
     - The component uses `useState` to manage the form inputs, and `useEffect` to fetch the current student data from the backend when the component mounts.
     ```JSX
     import React, { useEffect } from 'react';
     import axios from 'axios';
     import { Link, useNavigate, useParams } from 'react-router-dom';

     export default function EditStudent() {
       let nav = useNavigate();
       const { id } = useParams();

       const [student, setStudent] = React.useState({
         name: '',
         branch: '',
         mail: ''
       });

       const { name, branch, mail } = student;

       useEffect(() => {
         const loadStudent = async () => {
           const result = await axios.get(`http://localhost:8080/student/${id}`);
           setStudent(result.data);
         };
         loadStudent();
       }, [id]);

       const onChangerInput = (event) => {
         setStudent({ ...student, [event.target.name]: event.target.value });
       };
     ```

   - **Form Submission**
     - The `onSubmitClick` function sends a PUT request to the backend to update the student data and navigates back to the home page.
     ```JSX
       const onSubmitClick = async (event) => {
         event.preventDefault();
         await axios.put(`http://localhost:8080/student/${id}`, student);
         nav('/');
       };
     ```

   - **Rendering the Form**
     - The form is rendered with fields for `name`, `branch`, and `mail`, pre-filled with the current student data, and includes submit and cancel buttons.
    ```JSX
    return (
         <div className='container'>
           <div className='row'>
             <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
               <h2 className='text-center m-2'>Edit Student</h2>
               <form onSubmit={event => onSubmitClick(event)}>
                 <div className='mb-3'>
                   <label htmlFor='name' className='form-label'>Name</label>
                   <input type='text' className='form-control' placeholder='Enter student name' name='name' value={name} onChange={(event)=>onChangerInput(event)}/>
                   <label htmlFor='branch' className='form-label'>Branch</label>
                   <input type='text' className='form-control' placeholder='Enter student branch' name='branch' value={branch} onChange={(event)=>onChangerInput(event)}/>
                   <label htmlFor='mail' className='form-label'>Mail</label>
                   <input type='text' className='form-control' placeholder='Enter student mail' name='mail' value={mail} onChange={(event)=>onChangerInput(event)}/>
                   <button type='submit' className='btn btn-outline-primary'>Submit</button>
                   <Link to="/" className='btn btn-outline-danger mx-2'>Cancel</Link>
                 </div>
               </form>
             </div>
           </div>
         </div>
       );
    ```

5. **`students/ViewStudent.js`**
   - Component to view details of a single student.

   - **State Management and Data Fetching**
     - The component uses `useState` to manage the student data and `useEffect` to fetch the student details from the backend API when the component mounts.
    ```JSX
     import React, { useEffect } from 'react';
     import axios from 'axios';
     import { Link, useParams } from 'react-router-dom';

     export default function ViewStudent() {
       const { id } = useParams();

       const [student, setStudent] = React.useState({
         name: '',
         branch: '',
         mail: ''
       });

       useEffect(() => {
         const loadStudent = async () => {
           const result = await axios.get(`http://localhost:8080/student/${id}`);
           setStudent(result.data);
         };
         loadStudent();
       }, [id]);
     ```

   - **Rendering Student Details**
     - The student details are displayed in a card layout.
     ```JSX
       return (
         <div className='container'>
           <div className='row'>
             <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
               <h2 className='text-center m-2'>Student Details</h2>
               <div className='card'>
                 <div className='card-header'>
                   Details of student id: {student.id}
                   <ul className='list-group list-group-flush'>
                     <li className='list-group-item'>
                       <b>Name: </b>
                       {student.name}
                     </li>
                     <li className='list-group-item'>
                       <b>Branch: </b>
                       {student.branch}
                     </li>
                     <li className='list-group-item'>
                       <b>Mail: </b>
                       {student.mail}
                     </li>
                   </ul>
                 </div>
               </div>
               <Link className='btn btn-primary my-2' to='/'>Back to Home</Link>
             </div>
           </div>
         </div>
       );
      ```

### Routing

The application uses React Router for navigation between different pages. The routes are defined in the `App.js` file.

```JSX
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import AddStudent from './components/students/AddStudent';
import EditStudent from './components/students/EditStudent';
import ViewStudent from './components/students/ViewStudent';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/addStudent' element={<AddStudent />} />
          <Route exact path='/editstudent/:id' element={<EditStudent />} />
          <Route exact path='/viewstudent/:id' element={<ViewStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```