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
import p19 from '../assets/p19.jpeg'
import p20 from '../assets/p20.jpeg'
import p21 from '../assets/p21.jpeg'
import p22 from '../assets/p22.jpeg'
import p23 from '../assets/p23.jpeg'
import p24 from '../assets/p24.jpeg'
import p25 from '../assets/p25.jpeg'
import p26 from '../assets/p26.jpeg'

function postbanner5() {
    const images = [p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p17, p19, p20, p21, p22, p23, p24, p25, p26];
    return (
        <div className="relative overflow-hidden mt-12">
            <div className="flex flex-row gap-6 animate-scroll">
                {[...images, ...images].map((img, i) => (
                    <div key={i} className="shrink-0">
                        <LongCard image={img} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default postbanner5

