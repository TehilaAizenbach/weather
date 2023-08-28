
import React, { useContext, useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { usernameValidation } from '../validation/userValidation'
import { apiMethod } from '../general/request'
import './style.css';
import ContexProvider from '../contex';
import UserContex from '../contex';
import Alert from './alert';


export default function Login() {

  const [validationuserName,setVlidatationUsername]=useState(true)
  const navigate=useNavigate();
  const [loding,setLoding]=useState(false)

  const [error,setError]=useState({
    titel:"",
    message:""
  })
  const [formData,setFormData]=useState({
    user_name:"",user_mispar_ishi:"",
  })

  useEffect(()=>{
const f=async ()=>{
   await onLoade()
}
   f()
 console.log(formData);
  },[])


  const onLoade=async()=>{
    if (localStorage["user"])
    {
      console.log(localStorage["user"]);
    await setFormData(
       prevFormData=>{
       return {...prevFormData,
         ["user_mispar_ishi"]:localStorage["user"]["user_mispar_ishi"],["user_name"]:localStorage["user"]["user_name"]}
     })

     console.log(formData); 
     login(JSON.parse(localStorage.getItem("user")))
   }
     

  }
  const {user,setUser,setCities,cities,setCity}=useContext(UserContex)

 


  
  const handleChange=async(event)=>{
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          [event.target.name]: event.target.value
      }  
  })
  }

  const onSubmit=(event)=>{
      event.preventDefault();
      login(formData)
      
  }

  const login=async (user)=>{
    console.log(formData);
    setVlidatationUsername(usernameValidation(user.user_name)) 
    if (validationuserName) {
       setLoding(true)
    try {
       
        let resp= await apiMethod('http://localhost:3001/login','post',{ },user)
        if ( resp.status==200) {
          
          localStorage.setItem("user",JSON.stringify(user))
          setUser(resp.data);

        
          navigate("/home")
        } else {
        setLoding(false) 
        setError(prevAlert=>{
          return{
            ...prevAlert,["message"]:"אופס... שגיאה אנא נסה מאוחר יותר"
          }
        })
        }
       
    } catch (error) {
      await setLoding(false) 
      setError({titel:"שגיאת התחברות", message:"אחד מהנתונים שהוקשו שגוי"})
    }
    }else{
      setError({titel:"שגיאת התחברות", message:"אחד מהנתונים שהוקשו שגוי"})
    }
 
    
  }

  return (
  <React.Fragment>
   <div className='container login'>
    {(!loding &&error.message=="")&&
    <form className='container bg-light card ' onSubmit={onSubmit} >

      <div className='mb-3'>
        <label className='form-lable'>שם משתמש</label>
        <input className='form-control' name='user_name' onChange={(e)=>{handleChange(e);
         setVlidatationUsername(usernameValidation(e.target.value))} }></input>
        {(!validationuserName)? <span className='text-danger'>שם משתמש  חייב להיות באנגילית עם אות  גדולה אחת לפחות ומקסימום 3 ספרות</span>:""}
      </div>

      <div className='mb-3'>
        <label className='form-lable'>סיסמא</label>
        <input className='form-control' name='user_mispar_ishi' onChange={handleChange}></input>
      </div>

        <button className='btn btn-warning'>התחברות</button>
        
    </form>}
    
    {(loding)&&<div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
             <span className="visually-hidden">Loading...</span>
        </div>
        <span>loding...</span>
    </div>}

    {(error.message.length>0 &&(!loding))&&<Alert titel={error.titel} message={error.message} setError={setError}></Alert>}</div>
  </React.Fragment>
  )
}
