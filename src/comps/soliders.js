import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import PopupHeader from './popupHeader'
import SoliderForm from './soliderForm'
import SelectBox from './selectBox'
import SolidersList from './solidersList'
import { apiGetMethod, apiMethod } from '../general/request'
import UserContex from '../contex'
// import { useNavigate } from 'react-router-dom'
import FooterPopup from './footerPopup'




export default function Soliders(props) {
  const [selectValue,setSelectValue]=useState({City:"עיר"})
  const [solidersArray,setSolidersArray]=useState([])
  const [dicSoliders,setDicSolider]=useState({})
  const {selectedSoldiers,setselectedSoldiers}=useContext(UserContex)
  const [solider,setSolider]=useState({
    Age:22,
    City:"רמת גן",
    City_Location:"מרכז",
    First_Name:"",
    Gender:"ז",
    Is_Officer:true,
    Last_Name:"",
    Mispar_Ishi:"",
    Rank:"סגן",
    Role:"מפתח תוכנה",
    User_Name:""
  })
  const {error,setError}=props


 useEffect(()=>{
 onload()
 },[])

const onload=async ()=>{
  await getSoliders()
  await setSelectValue({City:"עיר"})
  let selectKey=getKey(selectValue);
   mapSoliders(selectKey) 
}
  useEffect(()=>{
    console.log(solidersArray);
    const f=async ()=>{
   let selectKey=getKeys(selectValue);
   await mapSoliders(selectKey).then(dic=>setDicSolider(dic)).catch(err=>console.log(err)) }
   console.log(selectedSoldiers);
   f()
  },[selectValue])

  useEffect( ()=>{
    const f=async ()=>{
       let selectKey=getKeys(selectValue);
       await mapSoliders(selectKey).then(dic=>setDicSolider(dic)).catch(err=>console.log(err)) 
    }
  f()
  },[solidersArray])

  useEffect(()=>{
    console.log(dicSoliders);
  },[dicSoliders])

 
  const {getKey,getKeys,getValue}=useContext(UserContex)
  

  const getSoliders=async ()=>{
  const headers=JSON.parse(localStorage.getItem("user"))
  let url="http://localhost:3001/getAllSoldiers";
  await apiMethod(url,"get",{},headers).then(async resp=>await setSolidersArray(resp.data)).catch(console.log(error))
  

   }

  const mapSoliders=async (keySelected)=>{
   await setDicSolider([]);
   let dic={}
    solidersArray.forEach( element => {
    let key=(keySelected).length>1?element[keySelected[0]]+'-'+element[keySelected[1]]:element[keySelected[0]];
   

    if (dic.hasOwnProperty(key)) {
      //dic[key].push(element);
      dic[key] = [...dic[key], element]
  } else {
    dic[key] = [element];
  }
   
   });
return(dic);
  }

  const selectAllSoliders=()=>{
    let arr=solidersArray;
    setselectedSoldiers(arr);
  }

  const deselectAll=()=>{
    let arr=[]
    setselectedSoldiers(arr)
  }

  const deleteSelectedsoliders=async ()=>{
    let arr=await solidersArray.filter(solider=>!selectedSoldiers.includes(solider));
    setselectedSoldiers([])
    await setSolidersArray(arr)
    // let selectKey=getKeys(selectValue);
    // mapSoliders(selectKey);
    // deselectAll();
    // refresh();
  }

  const refresh=  ()=>{
    const f=async ()=>{
    let selectKey=getKey(selectValue);
   await mapSoliders(selectKey)
    }
  f();
    // deselectAll();
  }
  const close=()=>{
    console.log("close");
    props.setOpenPopup(false)
  }

  const saveSoliderlist=async ()=>{     
    let newSoldiers={newSoldiers:solidersArray}
    await apiMethod("http://localhost:3001/updateMadorSoldiers","put",newSoldiers ,JSON.parse(localStorage.getItem("user")))
    .then((rep)=>{
      if(rep.status==200){
        close()
    }})
    .catch(err=>{
      console.log(err);
      setError(prevAlert=>{
        return{
          ...prevAlert,["titel"]:err.response.data.error,["message"]:"נסה שוב מאוחר יותר"

        }
      })
console.log(error);
    })

  }
  
  return (
      <div className='solider--container'>
      <div className='close-box' ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56" fill="none" onClick={(e)=>close()}>
      <path d="M41.9238 14.372C43.2027 15.6289 43.2027 17.6666 41.9238 18.9235L32.661 28.0262L41.9238 37.1295C43.2027 38.3863 43.2027 40.4241 41.9238 41.681C40.6449 42.9378 38.5714 42.9378 37.2925 41.681L28.0298 32.5776L18.7671 41.681C17.4882 42.9378 15.4147 42.9378 14.1358 41.681C12.8568 40.4241 12.8568 38.3863 14.1358 37.1295L23.3986 28.0262L14.1358 18.9235C12.8568 17.6666 12.8568 15.6289 14.1358 14.372C15.4147 13.1151 17.4882 13.1151 18.7671 14.372L28.0298 23.4749L37.2925 14.372C38.5714 13.1151 40.6449 13.1151 41.9238 14.372Z" fill="#555555"/>
      </svg></div>
      <PopupHeader></PopupHeader>
      <div className='solider-activities'>
      <SoliderForm solider={solider} setSolider={setSolider}  setSolidersArray={setSolidersArray} solidersArray={solidersArray} setError={setError}></SoliderForm>
      <SelectBox  value={selectValue} setValue={setSelectValue}></SelectBox>
      <SolidersList dicSoliders={dicSoliders}></SolidersList>

    {  (solidersArray.length>0)&&<div className='check-buttons'>
      <button className='active-btn btn btn-primary' onClick={()=>{selectAllSoliders()}}>בחר הכל</button>
      <button className='active-btn btn btn-primary'  onClick={()=>{deselectAll()}}>נקה הכל</button>
      <button disabled={(!selectedSoldiers.length>0)} className={`btn ${selectedSoldiers.length>0?'active-btn btn-primary':'btn'}`} onClick={async ()=>{await deleteSelectedsoliders()}}>הסר מסומנים</button>
      </div>
    }
    </div>
      <FooterPopup saveSoliderlist={saveSoliderlist}></FooterPopup>
    
      
    </div>
  )
}
