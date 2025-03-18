"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
function AboutMainComponent() {
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

      <main className="relative pt-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto relative z-10">
          <section className="min-h-[80vh] flex flex-col justify-center content-fade">
            <h1 className="font-crimson-text text-4xl md:text-7xl lg:text-8xl mb-6 fade-in">
              We build digital products that people love to use
            </h1>
          </section>

          <section
            id="services"
            className="py-24 grid grid-cols-1 md:grid-cols-3 gap-12 slide-up"
          >
            <div className="space-y-4">
              <h3 className="font-crimson-text text-2xl">
                Digital Product Design
              </h3>
              <p className="text-gray-500">
                Creating intuitive and engaging digital experiences that solve
                real problems.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-crimson-text text-2xl">Web Development</h3>
              <p className="text-gray-500">
                Building robust and scalable web applications with cutting-edge
                technology.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-crimson-text text-2xl">Brand Strategy</h3>
              <p className="text-gray-500">
                Crafting memorable brand identities that resonate with your
                target audience.
              </p>
            </div>
          </section>

          <section id="process" className="py-24 slide-up">
            <h2 className="font-crimson-text text-4xl mb-12">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: "fa-lightbulb",
                  title: "Discovery & Strategy",
                  desc: "Understanding your goals and planning the path forward",
                },
                {
                  icon: "fa-pencil-ruler",
                  title: "Design & Prototyping",
                  desc: "Creating intuitive interfaces and testing with real users",
                },
                {
                  icon: "fa-code",
                  title: "Development & Testing",
                  desc: "Building robust solutions with thorough quality assurance",
                },
                {
                  icon: "fa-rocket",
                  title: "Launch & Support",
                  desc: "Deploying with confidence and providing ongoing maintenance",
                },
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <i className={`fas ${item.icon} text-3xl`}></i>
                  <h3 className="font-crimson-text text-xl">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-24 slide-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "15+", text: "Years Experience" },
                { number: "100+", text: "Projects Delivered" },
                { number: "30+", text: "Team Members" },
                { number: "24/7", text: "Support" },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="font-crimson-text text-4xl">
                    {stat.number}
                  </div>
                  <div className="text-gray-500">{stat.text}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-24 slide-up">
            <h2 className="font-crimson-text text-4xl mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Innovation First",
                  desc: "Pushing boundaries and embracing new technologies",
                },
                {
                  title: "User-Centered",
                  desc: "Putting people at the heart of every decision",
                },
                {
                  title: "Quality Driven",
                  desc: "Delivering excellence in every project",
                },
              ].map((value, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="font-crimson-text text-2xl">{value.title}</h3>
                  <p className="text-gray-500">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />

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

export default AboutMainComponent;