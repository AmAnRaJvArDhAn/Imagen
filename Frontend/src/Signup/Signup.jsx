import React from 'react'
import Nav from '../Components/Nav.jsx'
import Footer from '../Components/footer.jsx'
import SignupForm from '../Components/Signpage.jsx'

function Signup() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">
          <SignupForm />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Signup
