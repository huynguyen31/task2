/* src/App.js */
import React, { useEffect, useState } from 'react'
import { Amplify, Auth } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './App.css'

Amplify.configure(awsExports);

const initialFormState = {
  username: '', password: '', email: '', authCode: '', formType: 'signUp'
}
const App = () => {
  function onChange(e) {
    e.persist()
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }))
  }
  const [formState, updateFormState] = useState(initialFormState)
  const { formType } = formState
  const [user, updateUser] = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser(){
    try {
      const user = await Auth.currentAuthenticatedUser()
      updateUser(user)
      console.log('User: ' ,user)
      updateFormState(() => ({ ...formState, formType: 'Authenticated' }))
    } catch (error) {
      console.log(error)
    }
  }

  async function signUp() {
    try {
      const { username, password, email } = formState
      const signUp = await Auth.signUp({ username, password, attributes: { email } })
      updateFormState(() => ({ ...formState, formType: 'confirmSignUp' }))
      alert('Sign up successful')
      console.log('Sign Up: ' ,signUp)
    } catch (error) {
      console.log(error)
    }
  }

  async function confirmSignUp() {
    try {
      const { username, authCode } = formState
      const confirmSignUp = await Auth.confirmSignUp(username, authCode)
      updateFormState(() => ({ ...formState, formType: 'signIn' }))
      console.log('Confirm: ' ,confirmSignUp)
    } catch (error) {
      console.log(error)
    }
  }

  async function signIn() {
    try {
      const { username, password } = formState
      const signIn = await Auth.signIn(username, password)
      updateFormState(() => ({ ...formState, formType: 'Authenticated' }))
      alert('Sign in successful')
    } catch (error) {
      alert('User does not exist or wrong username/password');
      console.log(error)
    }
  }

  async function signOut() {
    try {
      const signOut = await Auth.signOut()
      updateFormState(() => ({ ...formState, formType: 'signUp' }))
      console.log('Sign Out: ' ,signOut)
    } catch (error) {
      console.log(error)
    }
  }

  async function moveToSignIn() {
    try {
      updateFormState(() => ({ ...formState, formType: 'signIn' }))
    } catch (error) {
      console.log(error)
    }
  }

  async function moveToSignUp() {
    try {
      updateFormState(() => ({ ...formState, formType: 'signUp' }))
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='App'>
      {
        formType === 'signUp' && (
          <div>
            <Form className='signup-form'>
              <h1>Register</h1>
              <FormGroup>
                <Label>Username</Label>
                <Input name="username" type='text' onChange={onChange} placeholder='username'></Input>
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input name="password" type='password' onChange={onChange} placeholder='password'></Input>
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input name="email" type='email' onChange={onChange} placeholder='email' ></Input>
              </FormGroup>
              <div className='text-center'>
                <Button color='primary' onClick={signUp}>Sign Up</Button>
              </div>
              <br></br>
              <div className='text-center'>
                <p>You already have an account?</p>
                <Button color='success' onClick={moveToSignIn}>Sign In</Button>
              </div>
            </Form>
          </div>
        )
      }

      {
        formType === 'signIn' && (
          <div>
            <Form className='login-form'>
              <h1>Login</h1>
              <FormGroup>
                <Label>Username</Label>
                <Input name="username" onChange={onChange} placeholder='username'></Input>
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input name="password" type='password' onChange={onChange} placeholder='password'></Input>
              </FormGroup>
              <div className='text-center'>
                <Button color='primary' onClick={signIn}>Sign In</Button>
              </div>
              <br></br>
              <div className='text-center'>
                <p>Create account</p>
                <Button color='secondary' onClick={moveToSignUp}>Sign Up</Button>
              </div>
            </Form>
          </div>
        )
      }

      {
        formType === 'confirmSignUp' && (
          <div className='text-center'>
            <Form className='code-form'>
              <h1>Code</h1>
              <FormGroup>
                <Input name="authCode" type='number' onChange={onChange} placeholder='Authentication code'></Input>
              </FormGroup>
              <FormGroup>
                <Button onClick={confirmSignUp}>Confirm Sign Up</Button>
              </FormGroup>
            </Form>
          </div>
        )
      }

      {
        formType === 'Authenticated' && (
          <div className='text-center'>
            <h1>Welcome user</h1>
            <Button color='danger' onClick={signOut}>Sign Out</Button>
          </div>
        )
      }
    </div>
  )

}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App; 