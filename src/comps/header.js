import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContex from '../contex'


export default function Header() {

 const {history,user,setUser}=useContext(UserContex)
 const navigate=useNavigate()
 const logOut=()=>{
  localStorage.clear()
  setUser(null)
  navigate("/")
    }
  return (
    <div className='header'>
      {(user)&&
        <nav className='d-flex'>
            <ul className='header--ul'>
                <li className='header--li'>
                   <Link className='header--Link' to={"/home"}>ראשי</Link>
                </li>
                <li className='header--li'><Link className='header--Link' to={"/mador"}>מדור</Link></li>
                <li className='header--li'><Link className='header--Link' to={"/history"}>הסטוריה</Link></li>
            </ul>
            <ul className='header--ul logOut'>
              <li className='header--li ' onClick={logOut}>התנתקות</li>
            </ul>
        </nav>
        }
    </div>
  )
}
