import React from "react";

function LongCard({ image }) {
    return (
        <div className="relative w-45 h-85 ">
            <img
                src={image}
                alt="card"
                className="w-full h-full object-cover rounded-3xl brightness-90  "
            />
        </div>
    );
}
export default LongCard;