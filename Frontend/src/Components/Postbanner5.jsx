import React from 'react'
import LongCard from './LongCard'
import p9 from '../assets/p9.jpeg'
import p10 from '../assets/p10.jpeg'
import p11 from '../assets/p11.jpeg'
import p12 from '../assets/p12.jpeg'
import p13 from '../assets/p13.jpeg'
import p14 from '../assets/p14.jpeg'
import p15 from '../assets/p15.jpeg'
import p16 from '../assets/p16.jpeg'
import p17 from '../assets/p17.jpeg'
import p18 from '../assets/p18.jpeg'

function postbanner5() {
    return (
        <div className="bg-black text-white py-7 px-9 mt-22">
            <div>
                <h1><h1 className='text-cyan-500 mt-2'>Explore ◊</h1></h1>
            </div>
            <div className="flex flex-row gap-6 overflow-clip overflow-x-auto animate-scroll mt-12 ml-auto mr-0" style={{scrollbarWidth: "none"}}>
                <div>
                    <LongCard image={p9} />
                </div>
                <div>
                    <LongCard image={p10} />
                </div>
                <div >
                    <LongCard image={p11} />
                </div>
                
                <div >
                    <LongCard image={p12} />
                </div>
                <div >
                    <LongCard image={p13} />
                </div>
                <div>
                    <LongCard image={p14} />
                </div>
                <div>
                    <LongCard image={p15} />
                </div>
                <div>
                    <LongCard image={p16} />
                </div>
                <div>
                    <LongCard image={p17} />
                </div>
                <div>
                    <LongCard image={p18} />
                </div>
                <div>
                    <LongCard image={p17} />
                </div>
                <div>
                    <LongCard image={p19} />
                </div>
                <div>
                    <LongCard image={p21} />
                </div>
                <div>
                    <LongCard image={p21} />
                </div>
                <div>
                    <LongCard image={p22} />
                </div>
                <div>
                    <LongCard image={p23} />
                </div>
                <div>
                    <LongCard image={p24} />
                </div>
                <div>
                    <LongCard image={p25} />
                </div>
                <div>
                    <LongCard image={p26} />
                </div>
            </div>
        </div>
    )
}
export default postbanner5

