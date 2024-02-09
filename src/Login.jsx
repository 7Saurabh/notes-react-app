import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function Login(){
    const navigate = useNavigate()
    const [loginCreds, setLoginCreds] = useState({ username: '', password: '' })
    const [error, setError] = useState('No Error')

    const handleSubmit = (e) =>{
        e.preventDefault() // Prevent default form submission
        fetch('https://nerch26.pythonanywhere.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({loginCreds})
        })
        .then(response => {
          if (response.ok) {
            console.log('Data sent successfully')
            // Cookies.set('session',loginCreds.username)
            console.log('username: ',loginCreds.username)
            response.json().then(data=> {
                    // username taken from backend
                    Cookies.set('session',data.username)
                    console.log(`username = ${data.username}`)
                })
                .then(navigate('/'))
                .catch(console.log('Login Error !'))
          } else {
            // console.log(response)
            // console.error('Failed to send data')

            response.json().then(data => {
              setError(data.error)
              console.error('Failed to send data:', data.error); // Log the error message
            });
          }
        })
        .catch(error => {
          console.error('Error sending data:', error)
        })
    }
    return(
        <>
          <div className="error-auth" 
            // style={{ display: (error !== 'No Error' ? 'flex' : 'none')}}>{error}
            style={{ top: (error !== 'No Error' ? '2%' : '-10%')}}>{error}
            <div className="cancel-error" onClick={()=> setError('No Error') }>X</div>
          </div>
          <form method='post' onSubmit={handleSubmit} name='login'>
            <div className="login-container">
                <div className="bg-blur"></div>
                <h2 className='login-page-title'>Login Page</h2>
                <input type="text" 
                    onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                    placeholder='enter username' required/>
                <input type="password"
                    onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                    placeholder='enter password' required/>

                <p className='not-have-account-para'>Not Have A Account ? 
                <Link to='/signup' className='link'> signup here </Link></p>
                <input type="submit" value="submit" />
            </div>
          </form>
        </>
    )
}

export default Login