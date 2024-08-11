import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between items-center sm:items-start self-center mt-6 w-full max-w-[1049px] text-sm sm:text-base lg:text-xl text-gray-300">
      <div className="hover:text-white transition-colors">
        <a href="#help">Privacy & Policy</a>
      </div>
      <nav className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 lg:gap-5">
        {['Help', 'About', 'Contact Us'].map((item) => (
          <a key={item} className="hover:text-white transition-colors" href={`#${item.toLowerCase().replace(' ', '-')}`}>
            {item}
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;