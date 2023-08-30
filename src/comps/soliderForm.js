import React, { useEffect, useRef, useState } from 'react'
import { personalNumberValidation, usernameValidation } from '../validation/userValidation';

export default function SoliderForm(props) {
    const {solider,setSolider,solidersArray,setSolidersArray,setError}=props;
    const [validationuserName,setValidationuserName]=useState(true)
    const [validationMisparIsi,setvalidationMisparIsi]=useState(true)
    const [filedsRequire,setFiledsRequire]=useState(false)
    const formRef=useRef(null)

   

    const handleChange=async (event)=>{
 
      await updateSolider(event)
      await checkFildsNotRequired();
  
      }

      const updateSolider=async (event)=>{
         await setSolider(prevFormData => {
           return {
              ...prevFormData,
              [event.target.name]:(event.target.name)!="Gender"?event.target.value:(event.target.value=="זכר"?"ז":"נ"),
          }   
      })
      }
      const checkFildsNotRequired=async ()=>{
        const pattern = /^.+$/;
        let inputs= formRef.current.querySelectorAll("input");
        inputs.forEach(async element=>{
          await setFiledsRequire(pattern.test(element.value));
          console.log(pattern.test(element.value));
        })
      
   

      //  let validFirstName=pattern.test(solider.First_Name);
      //  console.log("validFirstName "+validFirstName);
      //  await setFiledsRequire(pattern.test(solider.First_Name)&&
      //   pattern.test(solider.Mispar_Ishi)&&
      //   pattern.test(solider.User_Name))
      }

      const addSolider= async (event)=>{
        event.preventDefault();
        if (validationuserName && validationMisparIsi) {
        await setSolidersArray((solidersArray)=>[...solidersArray,solider])  
        console.log(filedsRequire);
        cleanValues()
        formRef.current.reset()
        await setFiledsRequire(false)
        } else {

       await setError(prevAlert=>{
          return{
            ...prevAlert,["titel"]:"אופס",["message"]:"אחד מהמנתונים שהוקשו שגוי"
          }
        }
        )
    
        }
        
      }

      const cleanValues=async ()=>{
        const inputs=formRef.current.querySelectorAll("input");
        await inputs.forEach(async element => {
        await setSolider(prevFormData => {
            return {
                ...prevFormData,
                [element.name]:element.value,
            }  
        })
        });
      }

      
    
  return (
    <form className='soliderForm' ref={formRef} onSubmit={(e)=>addSolider(e)} >
        <div>
        {/* <label>שם החייל</label> */}
        <input className="input" placeholder='שם החייל' name='First_Name'  onChange={(e)=>{handleChange(e)}}></input>
        </div>
        <div>
        {/* <label>מספר אישי</label> */}
        <input  className="input" placeholder='מספר אישי' name='Mispar_Ishi' onChange={
            
            async (e)=>{
               await setvalidationMisparIsi(personalNumberValidation(e.target.value))
               handleChange(e)}}></input>
               {(!validationMisparIsi)&&<label className='text-danger'>מספר אישי מכיל רק ספרות</label>}
        </div>
       
        <div>
      
        <input  className="input" name='User_Name' placeholder='שם משתמש' onChange={async (e)=>{handleChange(e) ;
          await setValidationuserName(usernameValidation(e.target.value))}}></input>
        {(!validationuserName)&&<label className='text-danger'>שם המשתמש אינו תקין</label>}
        </div>
        <div>
            <label>מין</label>
        <select className="select" name='Gender' defaultValue={"זכר"} onChange={(e)=>{
            handleChange(e)}}>
            <option>זכר</option>
            <option>נקבה</option>
        </select>
       
        </div> 
        <button type='submit' disabled={(!filedsRequire)} className={`add-btn btn ${(filedsRequire)?"btn-primary active-btn":"gray--button"}`}>הוספה</button>

    </form>
  )
}
