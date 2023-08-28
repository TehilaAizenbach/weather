import userEvent from '@testing-library/user-event';
import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContex from '../contex';

export default function SelectBox(props) {
 const {value,setValue}=props;
 const {selectboxOpen,setSelectboxOpen}=useContext(UserContex)
 const options=[{City:"עיר"},{City_Location:"מיקום עיר בארץ"},{Gender:"מין"},{Rank:"דרגה",Role:"תפקיד"}]
 const {getKey,getValue}=useContext(UserContex)
 const selectRef=useRef(null)


useEffect(() => {
  // Add an event listener to the document when the component mounts
  document.addEventListener('mousedown', handleClickOutside);

  // Remove the event listener when the component unmounts
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

 const openAndCloseBox=()=>{
    setSelectboxOpen(!selectboxOpen)
 }
//  const getValue=(object)=>{
//     return object[getKey(object)]
//  }
//  const getKey=(object)=>{
//   let keys=Object.keys(object);
//   if (keys.length>1) {
//     return keys;
//   }
//   return keys[0];
//  }
const handleClickOutside = (event) => {
  if (selectRef.current && !selectRef.current.contains(event.target)) {
    // Click happened outside the component, so you can trigger your event here
    setSelectboxOpen(false);
    // Additional actions can be performed here
  }
};
    return (
    <div className='select-box-container' ref={selectRef} >
        <div className='select-box-header'>
        <label> סדר לפי: </label>
        <span className='bold' style={{padding:"0px 5px"}}>{value[Object.keys(value)[0]]}</span> 
         {
           (!selectboxOpen)? 
           <div onClick={()=>{openAndCloseBox()}} >
           <svg  xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 30 16" fill="none">
           <path fill-rule="evenodd" clip-rule="evenodd" d="M3.61178 14.9355C2.78554 15.6922 1.44593 15.6922 0.619684 14.9355C-0.206561 14.1787 -0.206561 12.9517 0.619684 12.1949L13.3141 0.567539C14.1403 -0.189253 15.4799 -0.189253 16.3062 0.567539L29.0006 12.1949C29.8268 12.9517 29.8268 14.1787 29.0006 14.9355C28.1743 15.6922 26.8347 15.6922 26.0085 14.9355L14.8101 4.67842L3.61178 14.9355Z" fill="#555555"/>
           </svg>
           </div>:<div onClick={()=>{openAndCloseBox()}}>
           <svg  xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 30 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.0083 0.567594C26.8346 -0.189198 28.1742 -0.189198 29.0004 0.567594C29.8267 1.32439 29.8267 2.55139 29.0004 3.30818L16.306 14.9355C15.4798 15.6923 14.1402 15.6923 13.3139 14.9355L0.619549 3.30818C-0.206696 2.55139 -0.206696 1.32439 0.619549 0.567594C1.4458 -0.189198 2.7854 -0.189198 3.61165 0.567594L14.81 10.8246L26.0083 0.567594Z" fill="#555555"/>
            </svg>
        </div>
         }
        </div>
        {(selectboxOpen)&& <div className='select-box' >
           {options.map((item)=>{
           
            return(<div key={getKey(item)} className={`${(getKey(item)==getKey(value))?"bold":""}`} onClick={()=>{
              setValue(item)
            openAndCloseBox() }
            }>
                {getValue(item)}
            </div>)
           })}
        </div>}
       
    </div>
  )
}
