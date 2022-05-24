import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavbarAdmin } from '../ui/NavbarAdmin'
import { Dashboard } from './Dashboard'
import { Users } from './Users'
import { Estudents } from './Estudents'
import { LeftMenu } from './LeftMenu'
import { Settings } from './Settings'

export const Admin = () => {
  return (
    <div className='container'>
      <LeftMenu />
      <main className='content'>
      <NavbarAdmin />
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='academics' element={<Dashboard />} />
          <Route exact path='estudents' element={<Estudents />} />
          <Route exact path='users' element={<Users />} />
          <Route exact path='settings' element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}
