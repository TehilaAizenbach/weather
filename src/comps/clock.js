import React from 'react'
import { useState,useEffect } from 'react'

export default function Clock() {
    const [time, setTime] = useState({
        minutes: new Date().getMinutes(),
        hours: new Date().getHours(),
        seconds: new Date().getSeconds(),
        day:new Date().getDate(),
        month:new Date().getMonth(),
        year:new Date().getFullYear(),
      })
      useEffect(() => {
        const intervalId = setInterval(() => {
          const date = new Date();
          setTime({
            minutes: date.getMinutes(),
            hours: date.getHours(),
            seconds: date.getSeconds(),
            day:date.getDate(),
            month:date.getMonth(),
            year:date.getFullYear(),
          })
        }, 1000)
    
        return () => clearInterval(intervalId);
      }, [])
      const convertToTwoDigit = (number) => {
        return number.toLocaleString('en-US', {
          minimumIntegerDigits: 2
        })
      }
  return (
    <div className='date-time'>
    <div>
    <span>{convertToTwoDigit(time.hours)}:</span>
    <span>{convertToTwoDigit(time.month)}:</span>
    <span>{convertToTwoDigit(time.seconds)}</span>
    </div>
    <div>
        <span>{convertToTwoDigit(time.day)}/</span>
        <span>{convertToTwoDigit(time.month)}/</span>
        <span>{time.year}</span>
    </div>
  </div>
  )
}
