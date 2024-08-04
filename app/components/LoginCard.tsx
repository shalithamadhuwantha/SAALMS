'use client';

import React from "react";

const Card: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <style jsx>{`
        .cardbdr {
          border-radius: 50px;
        }
      `}</style>
      <div className="loginbg card w-4/5 h-4/6 bg-slate-700 shadow-xl rounded-e-3xl cardbdr">
        <div className="card-body flex-row">
          <div className="left card w-3/6 h-full bg-slate-300 flex-none "></div>
          <div className="right card w-3/6 h-full bg-slate-300 flex-none  "></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
