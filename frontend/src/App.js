import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import UserSelect from './pages/UserSelect'

function App() {
  const {user} = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/select" element={user ? <UserSelect/> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
