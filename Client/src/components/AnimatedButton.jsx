
const AnimatedButton = ({ text, link }) => {
  const splitText = text.split("").map((char, index) => (
    <span key={index} data-text={char}>
      {char}
    </span>
  ));

  return (
    <>
      <a
        href={link}
        className="
          relative
          inline-flex
          items-center
          justify-center
          px-6
          h-12
          text-base
          font-button
          uppercase
          border-2
          rounded-full
          overflow-hidden
          transition-transform
          duration-300
          text-text-light
          dark:text-text-dark
          border-border-light
          dark:border-border-dark
          hover:scale-110
        "
      >
        {splitText}
      </a>

      <style>{`
        a span {
          display: inline-block;
          position: relative;
          transition: 0.5s;
        }

        a span::before {
          content: attr(data-text);
          position: absolute;
          transition: 0.5s;
          color: inherit;
        }

        a span:nth-child(odd)::before {
          transform: translateY(120%);
        }

        a span:nth-child(even)::before {
          transform: translateY(-120%);
        }

        a:hover span:nth-child(odd)::before {
          transform: translateY(0);
        }

        a:hover span:nth-child(even)::before {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
};

export default AnimatedButton;
