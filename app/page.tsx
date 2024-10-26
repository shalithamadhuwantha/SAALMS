"use client";
import React,  { useState, useEffect } from "react";
import GoogleButton from "./components/Login/GoogleButton";
import Footer from "./components/Login/Footer";
import styles from "./login.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./components/root/LoadingSpinner";


const App = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    setLoading(false); // Simulate loading finished
  }, []);
  
  if (status === "authenticated") {
    router.push("/login/roll");
    return null;
  } else {
    return (
      
      <AnimatePresence>
        {loading && <LoadingSpinner />}
          <motion.div
            initial={{ opacity: 0 , y:25}}
            animate={{ opacity: 1 , y:0 }}
            exit={{ opacity: 0 , y:15 }}
            transition={{ duration: 0.5 }}
          >
      <div className="flex overflow-hidden flex-col h-screen">
        
            <main className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-12 md:py-16 lg:py-72 w-full h-full">
              <section className="flex flex-col mb-0 ml-0 lg:ml-3.5 w-full max-w-[1120px]">
                <div className="flex flex-col pt-6 pb-16 bg-slate-700 rounded-[30px] lg:rounded-[50px]">
                  <div className="flex flex-col px-4 sm:px-6 md:px-10 lg:px-10 w-full">
                    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 lg:gap-5">
                      <div className="flex flex-col items-center lg:items-start lg:self-start text-2xl lg:text-3xl font-bold text-white">
                        <Image
                          loading="lazy"
                          src="/img/logo.png"
                          width={200}
                          height={200}
                          alt="Company Logo"
                        />
                        <h1 className="mt-4 lg:mt-1 text-center lg:text-left">
                          <div className={styles.title}>Login / Register</div>
                        </h1>
                      </div>
                      <GoogleButton />
                    </div>
                    <p className="text-xs text-center lg:text-right lg:self-end text-gray-300 mt-4 lg:mt-5 lg:mr-11">
                      Not Your Computer? Use private Mode to sign in Privately
                    </p>
                  </div>
                  <p className="px-4 lg:px-10 lg:self-start text-xl lg:text-2xl  text-center mt-4 lg:mt-0 lg:text-left">
                    Use Your Google Account To login
                  </p>
                </div>
                <Footer />
              </section>
            </main>
        
      </div>
        </motion.div>
        </AnimatePresence>
    );
  }
};

export default App;
