import React, { useEffect, useState, useRef } from 'react'

function AddNote(){

    const [username, setUsername] = useState('undefined')
    const [noteInfo, setNoteInfo] = useState({noteTitle: '', noteText: ''})
    const inputTitle = useRef()
    const inputText = useRef()

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/add-note')
          .then(response => response.json())
          .then(data => {
            setUsername(data.username)
            console.log(data.username)
          })
          .catch(error => console.error('Error fetching data:', error))
      }, [])

      const handleSubmit = (e) =>{
        e.preventDefault() // Prevent default form submission
        fetch('http://127.0.0.1:5000/api/add-note', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({noteInfo})
        })
        .then(response => {
          if (response.ok) {
            console.log('Data sent successfully',noteInfo)
            // reset inputs
            inputTitle.current.value = ''
            inputText.current.value = ''
          } else {
            console.error('could not sent data')
          }
        })
        .catch(error => {
          console.error('Error sending data:', error)
        })
    }
    return(
        <>
            {/* <h1>AddNote Page</h1> */}
            <h3>Welcome {username}</h3>

            <form onSubmit={handleSubmit}>
              <div className="notes-container">
                <input type="text" placeholder='enter note title' ref={inputTitle}
                onChange={e =>setNoteInfo({...noteInfo, noteTitle: e.target.value})}/>
                <textarea cols="30" rows="10" placeholder='start typing note' ref={inputText}
                onChange={e => setNoteInfo({...noteInfo, noteText: e.target.value})}></textarea>
                <input type="submit" value='Add Note' />
              </div>
            </form>
        </>
    )
}

export default AddNote 