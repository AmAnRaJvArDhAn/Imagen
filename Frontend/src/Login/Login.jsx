import React from 'react'
import Nav from '../Components/Nav.jsx'
import Footer from '../Components/footer.jsx'
import Login from '../Components/Loginpage.jsx'

function login() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">
          <Login />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default login
