
import React from 'react';

const Card: React.FC = () => {
  return (
    
    <div className="flex items-center justify-center h-full w-full">
      <div className="loginbg card w-4/5 h-4/5 bg-slate-700 shadow-xl rounded-lg">
        <div className="card-body">
          <div className="left card w-3/6 h-full bg-slate-300"></div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
