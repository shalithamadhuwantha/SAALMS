import React from "react";
import GoogleButton from "./components/GoogleButton";
import Footer from "./components/Footer";
import styles from "./login.module.css";


const App = () => {
  return (
    <div className="flex overflow-hidden flex-col h-screen">
      <main className="flex flex-col justify-center items-center px-20 py-72 w-full  max-md:px-5 max-md:py-24 max-md:max-w-full h-full">
        <section className="flex flex-col mb-0 ml-3.5 w-full max-w-[1120px] max-md:mb-2.5 max-md:max-w-full">
          <div className="flex flex-col pt-6 pb-16 bg-slate-700 rounded-[50px] max-md:max-w-full">
            <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
                <div className="flex flex-col self-start text-4xl font-bold text-white">
                  <img
                    loading="lazy"
                    src="/img/logo.png"
                    width={200}
                    alt="Company Logo"
                   
                  />
                  <h1 className="mt-9 text-3xl">
                    <div className={styles.title}>Login / Register</div>
                  </h1>
                </div>
                <GoogleButton/>
              </div>
              <p className="self-end mt-16 mr-11 text-xs  max-md:mt-9 max-md:mr-2.5 text-center	">
                Not Your Computer ? Use Guest Mode to sign in Privately
              </p>
            </div>
            <p className="self-start ml-10 	text-2xl">
              Use Your Google Account To login
            </p>
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default App;
