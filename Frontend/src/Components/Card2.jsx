import React from "react";

function Card2({ image }) {
    return (
        <div className="relative w-55 h-90 rounded-3xl ">
            <img
                src={image}
                alt="card"
                className="w-full h-full object-cover rounded-3xl brightness-90 "
            />
        </div>
    );
}
export default Card2;