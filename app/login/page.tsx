'use client'
import { SignIn } from '@clerk/clerk-react';
import React from 'react'

type Props = {}

const loginpage = (props: Props) => {

  return (
    <div className='flex items-center justify-center py-10'><SignIn/></div>
  )
}

export default loginpage;