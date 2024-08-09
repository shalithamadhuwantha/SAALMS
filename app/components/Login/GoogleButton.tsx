import React from "react";
import Image from "next/image";

const GoogleButton = () => {
  return (
    <div className="flex flex-col text-2xl text-black max-md:max-w-full">
      <Image
        loading="lazy"
        src="/img/google.webp"
        width={200}
        height={200}
        alt="Google Logo"
        className="object-contain self-center max-w-full aspect-[3.02] w-[251px]"
      />
      <button className="flex gap-5 px-12 py-2 mt-12 bg-sky-700 rounded-[90px] max-md:px-5 max-md:mt-10">
        <Image
          loading="lazy"
          width={200}
          height={200}
          src="/img/googleG.png"
          alt=""
          className="object-contain shrink-0 aspect-[0.91] w-[52px]"
        />
        <span className="flex-auto my-auto">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleButton;
