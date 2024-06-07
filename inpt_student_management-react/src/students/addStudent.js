import React from 'react'

export default function addStudent() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
                <h2 className='text-center m-2'>Add Student to System</h2>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input type='text' className='form-control' placeholder='Enter student name' name='Student name'/>
                    <label htmlFor='branch' className='form-label'>Branch</label>
                    <input type='text' className='form-control' placeholder='Enter student branch' name='Student branch'/>
                    <label htmlFor='mail' className='form-label'>Mail</label>
                    <input type='text' className='form-control' placeholder='Enter student mail' name='Student mail'/>
                    <button type='submit' className='btn btn-outline-primary'>submit</button>
                    <button type='submit' className='btn btn-outline-danger mx-2'>Cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
}
