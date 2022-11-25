import React, { useState } from 'react'
import { Auth } from 'aws-amplify'


function SignUp({ SignUp, error }) {
    const [user, setUser] = useState({
        username: '',
        password: '',
        attributes: {
            email: '',
            phone_number: '',
        }
    })

    const submitHandler = async function (e) {
        e.preventDefault();
        try {
            let response = await Auth.signUp(user)
            console.log(response)
        } catch (error) {
            console.log("Cannot sign up")
            console.log(error)
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h1>SignUp</h1>
                <div className='form-group'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' name='username' id='username' onChange={e => setUser({ ...user, username: e.target.value })}></input>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name='password' id='password' onChange={e => setUser({ ...user, password: e.target.value })}></input>
                    <label htmlFor='conf_password'>Confirm password: </label>
                    <input type='password' name='conf_pass' id='conf_pass'></input>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' name='email' id='email' onChange={e => setUser({ ...user, email: e.target.value })}></input>
                    <label htmlFor='phoneNumber'>Phone Number: </label>
                    <input type='number' name='phoneNumber' id='phoneNumber' onChange={e => setUser({ ...user, phone_number: e.target.value })}></input>
                    <label htmlFor='code'>Code: </label>
                    <input type='text' name='code' id='code' onChange={e => setUser({ ...user, code: e.target.value })}></input>
                    <input type='submit' value='Sign Up'></input>
                </div>
            </div>
        </form>
    )
}


export default SignUp