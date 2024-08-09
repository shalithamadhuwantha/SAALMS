import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-wrap gap-5 justify-between  self-center mt-6 w-full text-xl hover: max-w-[1049px] max-md:max-w-full">
      <div className="hover:text-white">
        <a href="#help">Privacy & Policy</a>
      </div>
      <nav className="flex gap-3 self-start">
        <a className="hover:text-white" href="#help">
          Help
        </a>
        <a className="hover:text-white" href="#about">
          About
        </a>
        <a className="hover:text-white" href="#contact">
          Contact Us
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
