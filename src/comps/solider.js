import React, { useContext, useState } from 'react'
import { ReactComponent as ProfilPicWoman } from './woman.svg'
import { ReactComponent as ProfilPicMan } from './man.svg'
import { ReactComponent as Katzin } from './katzin.svg'
import { useEffect } from 'react';
import UserContex from '../contex';

export default function Solider(props) {
  const {selectedSoldiers,setselectedSoldiers}=useContext(UserContex)
  const {solider}=props
  const [select,setSelect]=useState(selectedSoldiers.includes(solider))

  useEffect(()=>{
   const f=async ()=>{
      setSelect(selectedSoldiers.includes(solider));
    }
    f()
  
  },[selectedSoldiers])

   useEffect(()=>{
      (select)?setselectedSoldiers((selected)=>[...selected,solider]):setselectedSoldiers(prev => prev.filter(element => element.User_Name !== solider.User_Name))

   },[select])
    
  return (
    <div className={`solider-container ${(select)&&'choose-border'}`} onClick={()=>{setSelect(!select);}}>
        <div className='icon-container'>
          {(solider.Gender=="נ")?<ProfilPicWoman className='icon' ></ProfilPicWoman>:<ProfilPicMan className='icon'></ProfilPicMan>}
          {solider.Is_Officer===true && <div className='officer-container'><Katzin className='officer' ></Katzin></div>}
        </div>
        <div>
            <h5 className='solider-name'>{`${solider.First_Name} ${solider.Last_Name}`}</h5>
            <span className='bold'>{solider.Role}, {solider.Age}</span>
            <p>{solider.Role} , {solider.Rank}</p>
        </div>
    </div>
  )
}
