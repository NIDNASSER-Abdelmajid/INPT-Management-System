import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function AddStudent() {

    let nav = useNavigate()

    const [student, setStudent] = React.useState({
        name: '',
        branch: '',
        mail: ''
    })

    const {name, branch, mail} = student;

    const onChangerInput = (event) => {
        setStudent({...student, [event.target.name]: event.target.value});
    };

    const onSubmitClick = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:8080/student', student)
        nav('/')
    }

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
                    <button type='submit' className='btn btn-outline-primary'>submit</button>
                    <Link to="/" className='btn btn-outline-danger mx-2'>Cancel</Link>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}
