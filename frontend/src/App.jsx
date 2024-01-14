import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/home'
import NewTask from './pages/newtask'
import Login from './pages/login'
import Register from './pages/register'
import Manager from './pages/manager'

import Navbar from './components/navbar'
import { useUserContext } from './hooks/useUserContext'


function App() {

  const { user } = useUserContext()

  return (
    <>
      <BrowserRouter>

        <Navbar></Navbar>

        <Routes>
        <Route
            path='/'
            element={user ? (user.role.includes('manager') ? ( <Manager /> ) : (<Home />)) : ( <Navigate to='/login' />) } ></Route>

          

          <Route path='/newtask' element={user ? <NewTask></NewTask> : <Navigate to='/login'></Navigate>}></Route>

          <Route path='/login'
            element={!user ? <Login></Login> : <Navigate to='/'></Navigate>}></Route>

          <Route path='/register'
            element={!user ? <Register></Register> : <Navigate to='/'></Navigate>}></Route>

          <Route
            path='/manager'
            element={user && user.role.includes('manager') ? <Manager /> : <Navigate to='/' />}></Route>



        </Routes>



      </BrowserRouter>

    </>
  )
}

export default App
