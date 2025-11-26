import React from 'react'
import Nav from '../Components/Nav.jsx'
import Footer from '../Components/footer.jsx'
import About from '../Components/About.jsx'

function AboutUs() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">
          <About />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default AboutUs
