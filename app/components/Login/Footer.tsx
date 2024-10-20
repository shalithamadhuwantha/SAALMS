import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between items-center sm:items-start self-center mt-6 w-full max-w-[1049px] text-sm sm:text-base lg:text-xl text-gray-300">
      <div className="hover:text-white transition-colors">
        <a href="/Dev/privacypolicy">Privacy & Policy</a>
      </div>
      <nav className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 lg:gap-5">
        <a className="hover:text-white transition-colors" href="/Dev/developers">
          Help
        </a>
        <a className="hover:text-white transition-colors" href="/Dev/about">
          About
        </a>
        <a className="hover:text-white transition-colors" href="/Dev/developers">
          Contact Us
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
