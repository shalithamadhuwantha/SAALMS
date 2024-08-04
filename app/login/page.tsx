import React from 'react';
import GoogleButton from './GoogleButton';
import Footer from './Footer';

interface LoginRegisterProps {
  logoSrc: string;
  googleLogoSrc: string;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ logoSrc, googleLogoSrc }) => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <main className="flex flex-col justify-center items-center px-20 py-72 w-full bg-neutral-800 max-md:px-5 max-md:py-24 max-md:max-w-full">
        <section className="flex flex-col mb-0 ml-3.5 w-full max-w-[1120px] max-md:mb-2.5 max-md:max-w-full">
          <div className="flex flex-col pt-6 pb-16 bg-slate-700 rounded-[50px] max-md:max-w-full">
            <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
                <div className="flex flex-col self-start text-4xl font-bold text-white">
                  <img loading="lazy" src={logoSrc} alt="Company Logo" className="object-contain self-center max-w-full aspect-[1.31] w-[169px]" />
                  <h1 className="mt-9">Login / Register</h1>
                </div>
                <GoogleButton googleLogoSrc={googleLogoSrc} />
              </div>
              <p className="self-end mt-16 mr-11 text-base text-white max-md:mt-10 max-md:mr-2.5">
                Not Your Computer ? Use Guest Mode to sign in Privately
              </p>
            </div>
            <p className="self-start ml-10 text-xl font-bold text-white max-md:ml-2.5">
              Use Your Google Account To login
            </p>
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default LoginRegister;