import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Fotter } from '../ui/Fotter'


import { NavbarHead } from '../ui/NavbarHead'
import { About } from './About'
import { Company } from './Company'
import { Contact } from './Contact'
import { Login } from './Login'
import { Payments } from './Payments'
import { Services } from './Services'
import { Sign } from './Sign'
import { Testimonials } from './Testimonials'

console.log("Main");
export const Main = () => {
  return <>
    <NavbarHead />
    <div className='main'>
      <Routes>
        <Route exact path='/' element={<About />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/services' element={<Services />} />
        <Route exact path='/testimonials' element={<Testimonials />} />
        <Route exact path='/company' element={<Company />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/sign' element={<Sign />} />
        <Route exact path='/validate-pay' element={<Payments />} />
        <Route exact path='/login' element={<Login />} />

      </Routes>
    </div>
    <Fotter />
  </>
}
