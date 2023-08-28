import React, { useEffect, useState ,useContext} from 'react'
import Solider from './solider'
import UserContex from '../contex'
export default function Group(props) {

  const [soliders,setSoliders]=useState([])
  const {selectedSoldiers,setselectedSoldiers}=useContext(UserContex)

  useEffect(()=>{
    console.log(selectedSoldiers);
    setSoliders(props.soliders.sort((s1,s2)=>s1.First_Name.localeCompare(s2.First_Name)))
  },[props.soliders])
 
  return (
    <div>
        <h3>{(props.titel=="ז")?"זכר":((props.titel=="נ")?"נקבה":props.titel)}</h3>
        {(soliders.length>0)&&<div className='group-Container'>
          {soliders.map((solider,i)=>{return( <Solider solider={solider} select={selectedSoldiers.includes(solider)} key={i}></Solider>)})} 
        </div>}
    </div>
  )
}
