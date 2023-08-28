import React, { useEffect, useState } from 'react'
import { apiMethod } from '../general/request'
import Soliders from './soliders'
import Alert from './alert'

export default function Mador() {

    useEffect(()=>{
        onload()
    },[])
    const [soliders,setSoliders]=useState([])
    const [openPopup,setOpenPopup]=useState(false)
    const [error,setError]=useState({
      titel:"",
      message:""
    })

    const onload=async ()=>{
    const headers=JSON.parse(localStorage.getItem("user"))
    await getSoliders(headers)
   
    }

    const getSoliders=async (headers)=>{
      await apiMethod("http://localhost:3001/getAllSoldiers","get",{},headers).then(async resp=>{
       await setSoliders(resp.data)
    }).catch(err=>{
      console.log(err);
    })
    }


    return (
     
    <div className='mador--container container'>
      {(!openPopup)?<button className='mador--btn' onClick={()=>setOpenPopup(!openPopup)}>פתיחת חלון</button>:<Soliders setOpenPopup={setOpenPopup} error={error} setError={setError}></Soliders>}
      {
      (error.message.length>0)&&<Alert  titel={error.titel} message={error.message} setError={setError}></Alert>
    }
    </div>
  )
}
