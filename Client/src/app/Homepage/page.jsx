  "use client";
  import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ScrambleText from "../../components/ScrambleText";

  function MainComponent() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const toggleRef = useRef(null);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        // Disable browser's automatic scroll restoration
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        // Force scroll to top
        window.scrollTo(0, 0);

        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialDark = storedTheme ? storedTheme === "dark" : prefersDark;
        setIsDark(initialDark);
        if (initialDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        setMounted(true);

        const handleScroll = () => {
          setScrollY(window.scrollY);
          if (window.scrollY > 0) setHasScrolled(true);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }
    }, []); // Run only on mount

    const toggleDarkImmediate = () => {
      document.documentElement.classList.toggle("dark");
      setIsDark((prev) => !prev);
      localStorage.setItem("theme", !isDark ? "dark" : "light");
    };

    const isReducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;

    const toggleDarkTheme = (event) => {
      if (!toggleRef.current) return;
      const { left, top, width, height } = toggleRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const right = window.innerWidth - x;
      const bottom = window.innerHeight - y;
      const endRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom));
      const willDark = !document.documentElement.classList.contains("dark");

      if (!document.startViewTransition || isReducedMotion()) {
        toggleDarkImmediate();
        return;
      }

      const transition = document.startViewTransition(() => {
        toggleDarkImmediate();
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          {
            clipPath: willDark ? clipPath : [...clipPath].reverse()
          },
          {
            duration: 300,
            easing: "ease-in",
            pseudoElement: willDark
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)"
          }
        );
      });
    };

    const handleToggleClick = (event) => {
      if (!toggleRef.current) return;
      toggleRef.current.classList.add("animate");
      setTimeout(() => {
        toggleRef.current.classList.toggle("active");
        toggleDarkTheme(event);
      }, 150);
      setTimeout(() => toggleRef.current.classList.remove("animate"), 300);
    };

    const scrollToSection = (sectionId, offset = 0) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const yPosition = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: yPosition,
          behavior: "smooth"
        });
      }
    };

    if (!mounted) return null;

    // Hero section fades based on scrollY
    const triggerPoint = 375; // Fade out completely at 350px
    const opacity = Math.max(1 - scrollY / triggerPoint, 0); // Linear fade

    // Determine rectangle animation: slide in when scrollY > 400, otherwise slide out.
    const animateRect = scrollY > 500;

    return (
      <div className="min-h-screen relative overflow-y-auto transition-colors duration-300 bg-background-light dark:bg-background-dark">
        <Header
          handleToggleClick={handleToggleClick}
          isDark={isDark}
          toggleRef={toggleRef}
          scrolled={scrollY > 20}
        />

        <main className="pt-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
          <section
  id="Hero"
  style={{ opacity }}
  className="mt-[-100px] relative min-h-[80vh] flex flex-col justify-center items-center text-center"
>
  <h1 className="font-header text-text-light dark:text-text-dark text-4xl md:text-7xl lg:text-8xl mb-4 animate-fadeInUp-slow">
    SAAP Ventures
  </h1>
  <div className="relative flex flex-col items-center">
  <p className="text-lg md:text-xl lg:text-2xl text-text-light dark:text-text-dark max-w-2xl mb-4 animate-fadeInUp-slow delay-200 relative inline-block">
    <a href="https://youtu.be/dQw4w9WgXcQ?si=qzPUvA6DBSOMBD8b">Never gonna let you down</a>
  </p>

  {/* Positioned SVG Arrow */}
  <img
    src="/svg (1).svg"
    alt="Arrow pointing to text"
    className="w-36 h-auto md:w-48 md:h-auto absolute animate-fadeInUp-slow delay-300
             filter invert-0 dark:invert"
    style={{
      top: '25%',   // Aligns to the bottom of the text
      right: '-65%',    // Aligns right side of SVG with right side of text
      transform: 'translate(10px, 5px) rotate(90deg)', // Fine-tune with translate X/Y
    }}
  />
</div>
      <section
              className="min-h-[15vh] flex items-center justify-center"
            ></section>
  <div className="absolute bottom-10 flex flex-col items-center animate-fadeInUp-slow delay-400">
    <button
      onClick={() => scrollToSection("Bio", 50)}
      className="pointer-events-auto text-text-light dark:text-text-dark text-base md:text-lg bg-transparent border-none cursor-pointer hover:underline focus:outline-none"
    >
      Scroll down to see the animations!
    </button>
    <div className="mt-2 animate-bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-text-light dark:text-text-dark"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
</section>


            <section
              id="Bio"
              className="min-h-[100vh] flex items-center justify-center"
            >
              <ScrambleText 
                as="p" 
                text={`At SAAP Ventures, we don’t just build technology—we refine how it fits into everyday life.
                With a team of developers, creators, and thought leaders, we push the boundaries of innovation 
                to make tech more seamless, more meaningful, and more human.`}
                className="text-lg md:text-xl lg:text-2xl text-text-light dark:text-text-dark max-w-2xl mb-8"
                />
            </section>

            <section
              id="content"
              className="min-h-[50vh] flex items-center justify-center"
            >
              {/*Blank Section*/}
            </section>
          </div>
        </main>

        <Footer style={{ opacity }} />

        {/* Sliding Rounded Rectangle */}
        <div className="fixed top-1/2 left-10 transform -translate-x-0 -translate-y-1/2 z-50 ml-2">
          <div
            className={`h-72 rounded-3xl bg-background-dark dark:bg-background-light shadow-lg opacity-90 transition-all duration-1000 ease-in-out ${
            animateRect ? "w-36" : "w-0"
            } ${animateRect ? "opacity-100" : "opacity-0"}`}
          ></div>
        </div>

        <style jsx global>{`
          :root {
            --black: #333333;
            --white: #f5f5f5;
            --background-light: var(--white);
            --background-dark: var(--black);
            --foreground-light: var(--black);
            --foreground-dark: var(--white);
            --background: var(--background-light);
            --foreground: var(--foreground-light);
          }
          :root.dark {
            --background: var(--background-dark);
            --foreground: var(--foreground-dark);
          }
          html {
            background: var(--background);
            color: var(--foreground);
          }
          /* Override global.css height if needed */
          body {
            min-height: 100vh;
          }
          @keyframes fadeInUpSlow {
            0% {
              opacity: 0;
              transform: translateY(25px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp-slow {
            animation: fadeInUpSlow 2s ease-out forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
          .toggle {
            position: absolute;
            cursor: pointer;
            top: 50px;
            right: 25px;
            font-size: 150%;
          }
          .toggle.animate {
            animation: animate 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes animate {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
            }
          }
          .text {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
          }
          .dark::view-transition-old(root) {
            z-index: 1;
          }
          .dark::view-transition-new(root) {
            z-index: 999;
          }
          ::view-transition-old(root) {
            z-index: 999;
          }
          ::view-transition-new(root) {
            z-index: 1;
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgba(10, 10, 10, 0.1);
            border-radius: 9999px;
            border: 1px solid transparent;
          }
          /* For Firefox */
          html {
            scrollbar-width: thin;
            scrollbar-color: rgba(100, 100, 100, 0.4) transparent;
            scrollbar-height: short;
          }
        `}</style>
      </div>
    );
  }

  export default MainComponent;
