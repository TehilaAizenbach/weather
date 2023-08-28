import React from 'react'

export default function FooterPopup(props) {
    const {saveSoliderlist}=props
  return (
    <div className='footer-popup'>
    <button onClick={()=>saveSoliderlist()} className=' btn'>שמירה</button>
    </div>
  )
}
