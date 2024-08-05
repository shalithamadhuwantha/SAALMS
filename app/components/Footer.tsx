import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-wrap gap-5 justify-between self-center mt-6 w-full text-xl text-white max-w-[1049px] max-md:max-w-full">
      <div>Privacy & Policy</div>
      <nav className="flex gap-3 self-start">
        <a href="#help">Help</a>
        <a href="#about">About</a>
        <a href="#contact">Contact Us</a>
      </nav>
    </footer>
  );
};

export default Footer;