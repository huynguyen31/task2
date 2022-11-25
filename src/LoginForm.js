import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import SignUp from './SignUp'

function LoginForm({ Login, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async function (e) {
    e.preventDefault();
    try {
      let response = await Auth.signIn(email, password)
      console.log(response)
    } catch (error) {
      console.log("User not found")
    }
  }
  return (
    <div>
    <form onSubmit={submitHandler}>
      <div className='form-inner'>
        <h2>Login</h2>
        {/*ERROR!*/}
        <div className='form-group'>
          <label htmlFor='email'>Email: </label>
          <input type='email' name='email' id='email' onChange={e => setEmail(e.target.value)} value={email}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' id='password' onChange={e => setPassword(e.target.value)} value={password}></input>
        </div>
        <input type='submit' value='Login'></input>
      </div>
    </form>
    </div>

  )
}

export default LoginForm