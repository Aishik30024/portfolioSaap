import { useState } from "react";

const PageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    if (isTransitioning) return; // Prevent multiple clicks
    setIsTransitioning(true);

    setTimeout(() => {
      window.location.href = "/about";
    }, 1000);
  };

  return (
    <div className={`container ${isTransitioning ? "transition-active" : ""}`}>
      <h1>Click to transition</h1>
      <button onClick={handleClick} disabled={isTransitioning}>
        Go to About
      </button>
      <div className="overlay" aria-hidden="true"></div>

      <style jsx>{`
        .container {
          position: relative;
          text-align: center;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: white;
          transition: background-color 0.3s ease;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          background-color: black;
          color: white;
          border-radius: 5px;
          margin-top: 20px;
          transition: opacity 0.3s ease;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .overlay {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background-color: black;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
          transition: width 1s ease-out, height 1s ease-out, opacity 1s ease-out;
          opacity: 0.8;
        }

        .transition-active .overlay {
          width: 200vw;
          height: 200vh;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
