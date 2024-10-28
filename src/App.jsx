import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element= {<Auth/>}></Route>
        <Route path='/register' element= {<Auth insideRegister = {true}/>}></Route>
        <Route path='/home' element= {<Home/>}></Route>
      </Routes>
   
     
    </>
  )
}

export default App
