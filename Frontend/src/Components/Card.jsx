import React from "react";

function Card({ image }) {
  return (
    <div className="relative w-43 h-43 rounded-3xl bg-linear-to-br from-cyan-500/10 to-purple-600/10 backdrop-blur-md shadow-lg overflow-hidden group transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/20 hover:shadow-2xl">
      <img
        src={image}
        alt="card"
        className="w-full h-full object-cover rounded-3xl brightness-90 group-hover:brightness-110 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
    </div>
  );
}
export default Card;