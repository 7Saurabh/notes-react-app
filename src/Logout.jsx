import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'

function Logout(){

    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://nerch26.pythonanywhere.com/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'logout':true})
      })
      .then(response => {
        if (response.ok) {
            navigate('/login')
          console.log('DLog Out Successful !')
        } else {
          console.error('Log Out Failed !')
        }
      })
      .catch(error => {
        console.error('Error sending data:', error)
      })
      },[])
      
    return(
        <>
        
        </>
    )
}

export default Logout