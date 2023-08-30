import React, { createContext, useState } from 'react'

const UserContex= createContext()

  

export  function ContexProvider({children}) {
    const [user,setUser]=useState(null)
    const [cities,setCities]=useState([])
    const [history,setHistory]=useState([]);
    const [city,setCity]=useState({})
    const [selectedSoldiers,setselectedSoldiers]=useState([]);
    const [selectboxOpen,setSelectboxOpen]=useState(false)
    
  const getDefulteValue=()=>{
   setCity(cities.find((obj)=>obj.city==="Jerusalem"));
  }

  const getValue=(object)=>{
    return object[getKey(object)]
 }
 const getKey=(object)=>{
  return getKeys(object)[0];
 }

 const getKeys=(object)=>{
  return Object.keys(object)
 }

 const removeFirstItem=async ()=>{
  await setHistory(prev=>{
let temp=[...prev];
 temp.shift()
 return temp;
  })
 }
   const History=async (item)=>{
   let historyTemp=history.filter(cityObj=>cityObj.city.city!==item.city.city);
   await setHistory(historyTemp);
   await setHistory(prev=>{let temp=[...prev,item]
    console.log(temp);
    return temp});
   console.log(history);
    if (history.length>5) {
      removeFirstItem()
    }
    }
    
  return (
    <UserContex.Provider value={{user,setUser,cities,setCities,history,setHistory,city,setCity,History,getDefulteValue,getValue,getKey,getKeys,selectedSoldiers,setselectedSoldiers,selectboxOpen,setSelectboxOpen}}>
        {children}
    </UserContex.Provider>
  )

  }

  export default UserContex;