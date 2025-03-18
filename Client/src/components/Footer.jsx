import { useEffect, useState } from "react";

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(true); // Footer starts visible
  const [lastScrollY, setLastScrollY] = useState(0); // Track previous scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and past a small threshold (50px)
        setIsFooterVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsFooterVisible(true);
      }

      setLastScrollY(currentScrollY); // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Depend on lastScrollY to update it correctly

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full md:p-6 z-20 bg-backgroundSCD-light dark:bg-backgroundSCD-dark transition-opacity duration-500 ease-in-out ${
        isFooterVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between w-full text-sm text-text-light dark:text-text-dark">
        <div>Kolkata • India • Worldwide</div>
        <div>
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;