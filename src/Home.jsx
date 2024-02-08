
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import SwitchRight from '@material-ui/icons/ChevronRightRounded';
import SwitchLeft from '@material-ui/icons/ChevronLeftOutlined';


function Home(){
    const navigate = useNavigate()
    const [username, setUsername] = useState('undefined')
    const [noteInfo, setNoteInfo] = useState({noteTitle: '', noteText: ''})
    const [displayNav, setDisplayNav] = useState('none')
    const [view, setView] = useState('switch-left')
    const [width, setWidth] = useState(window.innerWidth);
    const inputTitle = useRef()
    const inputText = useRef()
    const notesContainerRef = useRef()

    const [notes, setNotes] = useState([
      {title: 'eg. title', text: 'eg. note title'},
      {title: 'eg. title', text: 'eg. note title'}
    ])

    useEffect(() => {
          fetchData()
      },[])

      useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

      const handleSubmit = (e) =>{
        e.preventDefault() // Prevent default form submission
        if(noteInfo.noteTitle !== '' && noteInfo.noteText !== ''){
          fetch('https://nerch26.pythonanywhere.com/api/add-note', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({noteInfo})
          })
          .then(response => {
            if (response.ok) {
              // console.log('Data sent successfully')
              
              // reset inputs
              inputTitle.current.value = ''
              inputText.current.value = ''
              fetchData()
              setNoteInfo({ noteTitle: '', noteText: '' }); // reseting state
              notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight
            } else {
              console.error('could not sent data')
            }
          })
          .catch(error => {
            console.error('Error sending data:', error)
          })
      }
      else{
        console.log('Do Not Leave Notes Note Info Empty !')
      }
    }

    const deleteNote = (noteId) =>{
      fetch('https://nerch26.pythonanywhere.com/api/delete-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'note-id':noteId})
      })
      .then(response => {
        if (response.ok) {
          // console.log('Data sent successfully')

          fetchData()
        } else {
          console.error('could not sent data')
        }
      })
      .catch(error => {
        console.error('Error sending data:', error)
      })
  }

    const fetchData = () =>{
      fetch('https://nerch26.pythonanywhere.com/api/home')
        .then(response => {
          if(response.ok){
            // added return keyword
            return response.json()
          }
          else{
            response.json().then(data => console.log(data.error))
            navigate('/login')
          }
        })
        .then(data => {
          setNotes(data.notes); // Update notes state with new data
          setUsername(data.username)
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    return(
        <>
            {/* <h1>Home Page</h1> */}
            {/* <h3>Welcome {username}</h3> */}
            <div className='home-page'>
            <div className="switch-view-container">
              <div className="changeView" style={ view === 'switch-left' ? {display:'block'} : {display:'none'}}
                onClick={()=>setView('switch-right')}> <SwitchRight/> </div>

              <div className="changeView" style={ view === 'switch-right' ? {display:'block'} : {display:'none'}}
                onClick={()=>setView('switch-left')}> <SwitchLeft/> </div>
            </div>

              
              <div className="add-note-container" style={ width < 500 ? (view === 'switch-left' ? {display:'flex'} : {display:'none'}) : {display: 'flex'}}>
              
              {/* <div className="add-note-container"> */}
                <div className="nav"
                 onClick={()=>displayNav==='none' ? setDisplayNav('block') : setDisplayNav('none')}>
                  <div className="nav-header" 
                  style={displayNav === 'none' ? {backgroundColor:''} : {backgroundColor:'hsl(0, 100%, 33%)'}}>
                    {displayNav === 'none' ? username : 'close'}</div>
                  <div className="item" style={{ display: displayNav }}><Link to='/login'>login</Link></div>
                  <div className="item" style={{ display: displayNav }}><Link to='/signup'>signup</Link></div>
                  <div className="item"style={{ display: displayNav }}><Link to='/logout'>logout</Link></div>
                  <div className="item" style={{ display: displayNav }}><Link to='/aboutus'>aboutus</Link></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='enter note title' ref={inputTitle}
                    onChange={e =>setNoteInfo({...noteInfo, noteTitle: e.target.value})}/>
                    <textarea cols="30" rows="10" placeholder='start typing note' ref={inputText}
                    onChange={e => setNoteInfo({...noteInfo, noteText: e.target.value})}></textarea>
                    { noteInfo.noteTitle ==='' || noteInfo.noteText === '' ? <input type="submit" value='Add Note' style={{cursor:'not-allowed'}} disabled /> :
                      <input type="submit" value='Add Note' />
                    }
                    
                </form>
              </div>
              <div className="notes-container" ref={notesContainerRef} style={ width < 500 ? (view === 'switch-right' ? {display:'flex'} : {display:'none'}) : {display:'block'}}>
              {/* <div className="notes-container"> */}
                <ol>
                  {notes.map((note, index) => (
                    <li key={index}>
                      <div className='note-title'>Title: {note.title}
                        <div className="note-delete-btn" onClick={() => deleteNote(note.id)}>
                          <DeleteIcon/>
                        </div>
                      </div>
                      <div className='note-text'>Text: {note.text}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
        </>
    )
}

export default Home 