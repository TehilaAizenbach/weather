import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import UserContex from '../contex'
import { apiGetMethod, apiMethod } from '../general/request'
import { wait } from '@testing-library/user-event/dist/utils'
import weatherData from '../apiRequest.json'
import Days from './days'
import Alert from './alert'
import { useNavigate } from 'react-router-dom'
// import env from 'react-dotenv'

export default function Home() {
  
  const [weather,setWeather]=useState([])
  // const [city,setCity]=useState("Jerusalem")
  const selectRef=useRef(null)
  const {user}=useContext(UserContex)
  const {cities,setCities,history,setHistory,city,setCity,History}=useContext(UserContex)
  const arrayDays=["מחר","בעוד יומים","בעוד שלושה ימים","בעוד ארבעה ימים"]
  const [isChange,setisChange]=useState(false)
  const [error,setError]=useState({
    titel:"",
    message:""
  })
  const navigate=useNavigate();

useEffect(()=>{
const f=async ()=>{
  await loderCities()
} 
f()
},[])
  useEffect( ()=>{
    onLoad()
  },[city])
 
  const onLoad=async ()=>{
    
    try{          
    
    console.log(history.length);
    console.log(isChange);
      if(history.length<1 || isChange==true){
       
          const resp= await getLongLat()
          if (resp.data) {  
                console.log(resp.data);
                let data=(weatherData.find((obj)=>obj.lat==resp.data.latitude.toFixed(4) && obj.lon==resp.data.longitude.toFixed(4)));
               if (data) {
                try { 
                  const daily=data.daily
                  setWeather(daily)
                  await History({city,daily});
                
                } catch (error) {
                  console.log(error);
                }
                await setisChange(false)
               }else{
                setError(prevAlert=>{
                  return{
                    ...prevAlert,["message"]:"עיר הזו אינה נמצאת ברשימה"
                  }
                })
               }
            }
        }else{   
          setCity(history[history.length-1].city)
          setWeather(history[history.length-1].daily)
          
        }
      }
  catch(error){
    console.log(error);
  } 
}

 const loderCities=async()=>{
    console.log(localStorage.getItem("user"));
   try{
    let resp=await apiMethod("http://localhost:3001/getAllCities","get",{},JSON.parse(localStorage.getItem("user")))
    setCities(resp.data)
    let cityFind=resp.data.find((obj)=>obj.city==="Jerusalem");
    setCity(cityFind)

  }catch(error){
    console.log(error);
  }
  } 
  
  const getLongLat = async ()=>{
    const headers=JSON.parse(localStorage.getItem("user"))
    try{
      let resp= await apiMethod(`http://localhost:3001/cities/${city.city}`,"get",{},headers);
      return resp;
  }catch(error){
    console.log(error);
  }
  }

   const getWather=async (data)=>{
    let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${data.latitude}&lon=${data.longitude}&appid=${process.env.REACT_APP_KEY_API}`
    let resp= await apiGetMethod(url)
    return resp.data;
  }

  const calacTemp=(index)=>{
    const dayly=weather[index];
    let temp=(dayly.temp.max+dayly.temp.min)/2
    return (temp-272.15).toFixed(2);
   
  }

  const getDescraption=(index)=>{
     let dayly=weather[index]
    return dayly.weather[0].description;
  }

  const getImageByTemp=(index)=>{
      let daily=weather[index]
     
      // let url='../public/images'
      let url='/images'
      
      let imageName='rainbow'

      if (daily.temp.day>29) {
        imageName='sun'
      }

      if (daily.clouds>20) {
        imageName='cloudy'
      }

      if (daily.pop>40) {
        imageName='rain'
      }
     
     return `${url}/${imageName}.png`
      
  }

  const getColor=(index)=>{
    let mone=0;
    const dayly=weather[index];
    const temp=dayly.temp;
    const  filesLike=dayly.feels_like;
    if (temp.day>filesLike.day) {
      mone++;
    }
    if (temp.eve>filesLike.eve) {
      mone++;
    }
    if (temp.morn>filesLike.morn) {
      mone++;
    }
    if (temp.night>filesLike.night) {
      mone++;
    }
    return mone;
  }



  // const History=(item)=>{
  // let historyTemp=history;
  // historyTemp.push(item);
  // if (historyTemp.length>5) {
  //   historyTemp.shift();
  // }
  // setHistory(historyTemp)
  // }

  return (
    <React.Fragment> 
    {
    (weather.length>0)?
    <div className='container white master'>
          {(error.message.length>0)&&<Alert titel={error.titel} message={error.message} setError={setError}></Alert>}
        <div>
          <h2>שלום: {user.First_Name} {user.Last_Name}</h2>
          <div className='d-flex align-items-center justify-content-center'>
          <select ref={selectRef} className='col-3' defaultValue={city.city} >
          {cities.map((cityItem, index) => {
            return (<option key={index} >{cityItem.city}</option>)
          })}
          </select>
        
          <button className=' btn justify-content-center m-1 d-flex' onClick={()=>{
            // setCity(selectRef.current.value);  
             if(selectRef.current.value!==city.city){
                setCity(cities[selectRef.current.selectedIndex])
             }
           setisChange(true);
          
          }}>
          <svg className='' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          </button>
       </div>
     
                <div className='row justify-content-center'>
                  <div className='col-5 m-2 align-items-center'>
                    <img src={getImageByTemp(0)} width="70%"></img>
                  </div>
                  <div className='col-5 m-2 d-flex align-items-center'>
                    <div>
                    <span className='display'>היום</span>
                    <h2 className='h2'>{city.city}</h2>
                    <div>טמפרטורה: &#8451;{calacTemp(0)}</div>
                    <div>{getDescraption(0)}</div></div>
                  </div>

                  <div className='conatainer-days row '>
                    {arrayDays.map((item,i)=>{return <Days key={i} image={getImageByTemp(i+1)} day={item} temp={calacTemp(i+1)} color={getColor(i)}></Days>})}
                  </div>
                </div>

              
    </div>
     </div> :
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
             <span className="visually-hidden">Loading...</span>
        </div>
        <span>loding...</span>
     </div>
    
    }
   

    </React.Fragment>

  )
}
