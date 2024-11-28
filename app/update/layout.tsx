import React from 'react'
// import Nav from './Nav'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen grid items-center justify-center py-12">
      {/* <Nav /> */}
      {children}
    </div>
  )
}

export default layout
