import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import Footer from '../Components/footer.jsx'
import Banner from '../Components/Banner.jsx'
import Postbanner from '../Components/Postbanner.jsx'
import Postbanner2 from '../Components/Postbanner2.jsx'
import Postbanner3 from '../Components/Postbanner3.jsx'
import Postbanner4 from '../Components/Postbanner4.jsx'
import Postbanner5 from '../Components/Postbanner5.jsx'
import Postbanner6 from '../Components/Postbanner6.jsx'
import Postbanner4_1 from '../Components/Postbanner4_1.jsx'


function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
         <main className="flex-1">
           <Banner/>
           <Postbanner/>
           <Postbanner2/>
           <Postbanner3/>
           <Postbanner4/>
           <Postbanner4_1/>
           <Postbanner5/>
           <Postbanner6/>
         </main>
      <Footer />
    </div>
  )
}

export default Home