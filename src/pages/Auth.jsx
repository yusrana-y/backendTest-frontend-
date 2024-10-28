import React, { useState } from 'react'
import image from '../assets/register.png'
import { Link, useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Form,Spinner} from 'react-bootstrap';
import { registerAPI,loginAPI } from '../services/allAPI';


const Auth = ({insideRegister}) => {
    const [userData,setUserData] = useState({
      username:"",email:"",password:"",fName:"",lName:"",mobile:""
    })
    console.log(userData);
    const navigate = useNavigate()

    const [isLoading,setIsLoading] = useState(false)

    const handleRegister = async(e)=>{
      e.preventDefault()
      const {username,email,password,fName,lName,mobile} = userData
      if(username && email && password && fName && lName && mobile)
      {
        //api call
        console.log("inside api call");
        try{
          const result = await registerAPI(userData)
          console.log(result);
          if(result.status==200)
          {
            alert(`Welcome ${result?.data.username} Continue to login`)
            setUserData({
              username:"",email:"",password:"",fName:"",lName:"",mobile:""
            })
            navigate('/')
          }
          else
          {
            if(result.response.status==406)
            {
              alert(result.response.data)
              setUserData({
                username:"",email:"",password:"",fName:"",lName:"",mobile:""
              })
            }
          }
        }
        catch(err)
        {
          console.log(err);
          
        }
        
      }
      else
      {
        alert("please fill the form completely!")
      }
    }

    const handleLogin = async(e)=>{
      e.preventDefault()
      console.log('inside Login API');
      if(userData.email && userData.password)
      {
        // alert("ure inside login")
        try
        {
          const result = await loginAPI(userData)
          console.log(result);
          if(result.status==200)
          {
            sessionStorage.setItem("user",JSON.stringify(result.data.user))
            sessionStorage.setItem("token",result.data.token)
            setIsLoading(true)
            setTimeout(()=>{
              setUserData({
                username:"",email:"",password:"",fName:"",lName:"",mobile:""
              })
              navigate('/home')
              setIsLoading(false)
            },2000)
       
          }
          else
          {
            if(result.response.status==404)
            {
              alert(result.response.data)
            }
          }
        }
        catch(err)
        {
          console.log(err);
          
        }

      }
      else
      {
        alert("please fill the form completely")
      }
      
    }
  return (
    <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
    <div className="cotainer w-75">
      <div className="card shadow p-2">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <img src={image} alt="" />
          </div>
          <div className="col-lg-6">
            <h1 className='fw-bolder mt-2'><i className="fa-solid fa-user"></i>UserHub</h1>
            <div className="fw-bolder my-2">
              Sign {insideRegister ? "Up" : "In"} to your Account
            </div>

            <form action="">
          { insideRegister &&  <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Username" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} />
            </FloatingLabel> }

            { insideRegister &&  <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="First Name" value={userData.fName} onChange={e=>setUserData({...userData,fName:e.target.value})} />
            </FloatingLabel> }

            { insideRegister &&  <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Last Name" value={userData.lName} onChange={e=>setUserData({...userData,lName:e.target.value})} />
            </FloatingLabel> }

            { insideRegister &&  <FloatingLabel
              controlId="floatingInput"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control type="number" placeholder="Phone Number" value={userData.mobile} onChange={e=>setUserData({...userData,mobile:e.target.value})} />
            </FloatingLabel> }

            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="Email address" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}  />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" >
              <Form.Control type="password" placeholder="Password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}  />
            </FloatingLabel>

{/* register or login button */}
            {
              insideRegister?
              <div className="mt-3">
                <button className="btn btn-danger mb-2" onClick={handleRegister}>Register</button>
                <p>Already have an account? <Link to='/'>Click here</Link></p>
              </div>
              :
                
              <div className="mt-3">
                 <button className="btn btn-primary mb-2" onClick={handleLogin}>Login
                { isLoading && <Spinner animation="border" variant="light" className='ms-1'/>}
                 </button>
                 <p>New User?  <Link to='/register'>Register here</Link></p>
              </div>
            }
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Auth
