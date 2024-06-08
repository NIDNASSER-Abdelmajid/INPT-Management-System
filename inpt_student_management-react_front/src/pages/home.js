import React from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Home() {

  const [students, setStudents] = React.useState([])
  const {id} = useParams()
  
  React.useEffect(() => {
    chargeStudentsInfo()
  }, [])

  const chargeStudentsInfo = async () => {
    const students = await axios.get('http://localhost:8080/students')
    setStudents(students.data)
  }

  const delStudent = async (id) => {
    await axios.delete(`http://localhost:8080/student/${id}`)
    chargeStudentsInfo()
  }

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
    { 
    students.map((student, index) => (
      <tr>
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
    )) 
    }
  </tbody>
</table>
        </div>
    </div>
  )
}
