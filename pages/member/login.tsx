import React from 'react'
import Auth from '../../components/auth'
import Dashboard from '../../components/dashboard'
import { useUser } from '../../contexts/user'

const login = () => {
  const { user } = useUser()
  console.log(user)
  return (
    <div>{!user ? <Auth /> : <Dashboard />}</div>
  )
}

export default login