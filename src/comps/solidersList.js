import React, { useContext, useEffect, useRef, useState } from 'react'
import Group from './group'
import UserContex from '../contex';
import { useSearchParams } from 'react-router-dom';

export default function SolidersList(props) {

  const {getKey,getValue}=useContext(UserContex)
  const {dicSoliders}=props
  const containerRef=useRef(null)

  useEffect(()=>{
    containerRef.current.scrollTo(0, containerRef.current.scrollHeight)
  },[])
  return (
    <div ref={containerRef} className='soliders-list'>
      {Object.keys(dicSoliders).map((key,i)=><Group key={key} titel={key}  soliders={dicSoliders[key]} ></Group>)}
    </div>
  )
}
