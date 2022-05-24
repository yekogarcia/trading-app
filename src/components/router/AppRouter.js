import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { startCheking } from '../../actions/auth'
import { Admin } from '../admin/Admin'
import { Main } from '../public/Main'
import { PrivateRouters } from './PrivateRouters'

import { PublicRouters } from './PublicRouters'

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/*' element={
          <PublicRouters>
            <Main />
          </PublicRouters>
        } />

        <Route path='/ad/*' element={
          <PrivateRouters>
            <Admin />
          </PrivateRouters>

        } />
      </Routes>
    </BrowserRouter>
  )
}
