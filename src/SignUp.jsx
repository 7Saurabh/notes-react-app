import React, { useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'

function SignUp(){
    const [signUpCreds, setSignUpCreds] = useState({ username: '', email: '', password1: '', password2: '' })
    const [error, setError] = useState('No Error')

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault() // Prevent default form submission
        fetch('http://127.0.0.1:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({signUpCreds})
        })
        .then(response => {
          if (response.ok) {
            console.log('Data sent successfully')
            // window.location.href = '/login'
            navigate('/login')
          } else {
            console.error('Failed to send data')
            response.json().then( data => {
              setError(data.error)
            })
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
        <form onSubmit={handleSubmit} name="signup">
          <div className="login-container" >
            <div className="bg-blur"></div>
            <h2 className='login-page-title'>Sign Up Page</h2>
            <input type="text" 
                onChange={(e) => setSignUpCreds({ ...signUpCreds, username: e.target.value })}
                placeholder='enter username' required/>
            <input type="text"
                onChange={(e) => setSignUpCreds({ ...signUpCreds, email: e.target.value })}
                placeholder='enter email' required/>
            <input type="password"
                onChange={(e) => setSignUpCreds({ ...signUpCreds, password1: e.target.value })}
                placeholder='enter password' required/>
            <input type="password"
                onChange={(e) => setSignUpCreds({ ...signUpCreds, password2: e.target.value })}
                placeholder='confirm password' required/>

            <p className='not-have-account-para'>Not Have A Account ? 
            <Link to='/login' className='link'> login here </Link></p>
            <input type="submit" value="submit" />
          </div>
        </form>
      </>
    )
}

export default SignUp