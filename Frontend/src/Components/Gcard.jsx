import React from "react";

function Gcard({ image }) {
    return (
        <div className="relative w-31 h-35  ">
            <img
                src={image}
                alt="card"
                className="w-full h-full object-cover rounded-xl brightness-60 hover:brightness-110 transition-all duration-100 "
            />
        
        </div>
    );
}
export default Gcard;