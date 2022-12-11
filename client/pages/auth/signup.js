import React, { useState } from 'react';
// import { useAuth } from '../../context/auth';

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label >Email address</label>
        <input className='form-control' />
      </div>
      <div className='form-group'>
        <label >Password</label>
        <input className='form-control' />
      </div>
      <button className='btn btn-primary'>Sign Up</button>
    </div>
  );
}

export default SignUp;
