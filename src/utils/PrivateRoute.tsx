import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { isLogged } from './isLogged'

interface IPrivateRoute {
  children: ReactNode
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  if (!isLogged()) {
    return <Navigate to="/" replace/>
  }

  return children
}
