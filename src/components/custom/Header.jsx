import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 shadow-lg flex justify-between px-5'>
        <img src='/logo.svg'/>
        <Button>Sign in</Button>
    </div>
  )
}

export default Header