"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
  return (
    <div className="flex flex-col text-2xl text-black max-md:max-w-full">
      <Image
        loading="lazy"
        src="/img/google.webp"
        width={251}
        height={83}
        alt="Google Logo"
        className="object-contain self-center max-w-full aspect-[3.02] w-[251px] max-md:w-[180px]"
      />
      <button
        onClick={() => signIn("google")}
        className="flex gap-5 px-12 py-2 mt-12 bg-sky-700 rounded-[90px] max-md:px-5 max-md:mt-6 max-md:gap-2"
      >
        <Image
          loading="lazy"
          width={52}
          height={52}
          src="/img/googleG.png"
          alt=""
          className="object-contain shrink-0 aspect-square w-[52px] max-md:w-[32px]"
        />
        <span className="flex-auto my-auto text-white">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleButton;