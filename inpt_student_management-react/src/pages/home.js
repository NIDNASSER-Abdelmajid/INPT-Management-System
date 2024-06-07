import React from 'react'
import axios from 'axios'

export default function Home() {

  const [users, setStudents] = React.useState([])

  React.useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    const students = await axios.get('http://localhost:8080/students')
    setStudents(students.data)
  }

  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Branch</th>
      <th scope="col">School mail</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    { 
    users.map((user, index) => (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.branch}</td>
        <td>{user.mail}</td>
        <td>
          <button className='btn btn-primary mx-2'>View</button>
          <button className='btn btn-outline-primary mx-2'>Edit</button>
          <button className='btn btn-danger mx-2'>Delete</button>
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
