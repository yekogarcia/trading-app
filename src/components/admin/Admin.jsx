import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavbarAdmin } from './dashboard/NavbarAdmin'
import { ListDynamic } from './lists/ListDynamic'
import { ListDevelopers } from './developers/ListDevelopers'
import { Settings } from './dashboard/Settings'
import { Dashboard } from './academics/Dashboard'
import { LeftMenu } from './dashboard/LeftMenu'
import { Estudents } from './users/Estudents'
import { Users } from './users/Users'
import { Payments } from './payments/Payments'

export const Admin = () => {
  return (
    <div className='container'>
      <LeftMenu />
      <main className='content'>
      <NavbarAdmin />
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='academics' element={<Dashboard/>} />
          <Route exact path='payments' element={<Payments/>} />
          <Route exact path='estudents' element={<Estudents />} />
          <Route exact path='users' element={<Users />} />
          <Route exact path='settings' element={<Settings />} />
          <Route exact path='developers' element={<ListDevelopers  />} />
          <Route path='list/:table' element={<ListDynamic />} />
        </Routes>
      </main>
    </div>
  )
}