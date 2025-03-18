import { Around } from "@theme-toggles/react";
import "@theme-toggles/react/css/Around.css";
import AnimatedButton from "./AnimatedButton";

const Header = ({ handleToggleClick, isDark, toggleRef, scrolled }) => {
  return (
    <header className={`fixed top-0 w-full z-50 px-6 py-4 md:px-12 backdrop-blur-sm ${scrolled ? "fade-out" : ""}`}>
      <div className="flex items-center justify-between w-full">
        {/* Header text on the far left */}
        <div className="text-3xl font-header text-text-light dark:text-text-dark">
          <a href="/">SAAP Ventures</a>
        </div>

        {/* Navigation links and theme toggle on the far right */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <AnimatedButton text="Work" link="/Error" />
            <AnimatedButton text="About" link="/Error" />
            <AnimatedButton text="Contact" link="/Error" />
          </div>
          <button
            onClick={handleToggleClick}
            className="relative text-[1.8rem] flex items-center hover:scale-110 justify-center translate-y-[-1px]"
            aria-label="Toggle dark mode"
            ref={toggleRef}
          >
            <Around duration={750} reversed={isDark} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
