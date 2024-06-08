import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
// import ReactDOM from 'react-dom/client'

export default function ViewStudent() {

    const [student, setStudent] = React.useState({
        name: '',
        branch: '',
        mail: ''
    })

    const {id}=useParams()

    const chargeStudentInfo = async () => {
        const student = await axios.get(`http://localhost:8080/student/${id}`)
        setStudent(student.data)
    }

    useEffect(() => {
        chargeStudentInfo();
    }, [])

  return (
    <div>
        <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
                <h2 className='text-center m-4'>Student Infos</h2>
                <div className='card'>
                    <div className='card-header'>
                        <h3>Student {student.id} details:</h3>
                        <div className='text-center'>
                            {/* <img src={student.profilePicture} alt="Profile" className='img-fluid rounded-circle' style={{ width: '150px', height: '150px' }} /> */}
                        </div>
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'><b>Name:</b> {student.name}</li>
                            <li className='list-group-item'><b>Branch:</b> {student.branch}</li>
                            <li className='list-group-item'><b>Mail:</b> {student.mail}</li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={'/'}>Back</Link>
            </div>
        </div>
    </div>
    </div>
  )
}
