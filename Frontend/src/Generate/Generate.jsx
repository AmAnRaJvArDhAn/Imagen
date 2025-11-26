import React from 'react'
import Generate from '../Components/Gnrt.jsx'

function generate() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Generate />
        </main>
      </div>
    </>
  )
}

export default generate