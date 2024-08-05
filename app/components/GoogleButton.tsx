import React from 'react';
import Image from 'next/image';


const GoogleButton=()=>{
  return (
    <div className="flex flex-col text-3xl text-black max-md:max-w-full">
      <img loading="lazy" src="/img/google.webp" alt="Google Logo" className="object-contain self-center max-w-full aspect-[3.02] w-[251px]" />
      <button className="flex gap-5 px-12 py-5 mt-12 bg-sky-700 rounded-[90px] max-md:px-5 max-md:mt-10">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/612e36239651494e1e7f20c9fb90a79700079615482a3cf775671865b231c1d3?apiKey=79e3a8fee0a847b384c0ec3b1920eb9a&&apiKey=79e3a8fee0a847b384c0ec3b1920eb9a" alt="" className="object-contain shrink-0 aspect-[0.91] w-[52px]" />
        <span className="flex-auto my-auto">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleButton;