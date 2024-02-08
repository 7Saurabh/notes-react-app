import Home from "./Home.jsx"
import Login from "./Login.jsx"
import SignUp from "./SignUp.jsx"
import Logout from "./Logout.jsx"
import AddNote from "./AddNote.jsx"
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/add-notes' element={<AddNote />}/>
        

        {/* <Route path='/about' element={<About />}/> */}

        <Route path="*" element={<h1>Not Found Page</h1>}/>
      </Routes>
  )
}

export default App
