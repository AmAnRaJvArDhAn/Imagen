import React from 'react'
import Nav from '../Components/Nav.jsx'
import Footer from '../Components/footer.jsx'
import Galleries from '../Components/gallery.jsx'
function Gallery() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">
          <Galleries/>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Gallery