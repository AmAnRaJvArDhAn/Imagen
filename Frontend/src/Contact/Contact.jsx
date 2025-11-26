import React from 'react'
import Nav from '../Components/Nav.jsx'
import Footer from '../Components/footer.jsx'
import ContactSection from '../Components/Contacts.jsx'

function ContactPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ContactPage