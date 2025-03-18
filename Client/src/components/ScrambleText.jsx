import { useState } from 'react';
import { useScramble } from 'use-scramble';

export default function ScrambleText({ text, as = 'span', className = '', ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  const Tag = as;

  return (
    <Tag
      onMouseEnter={() => setIsHovered(true)}
      //onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block cursor-pointer group ${className}`}
      {...props}
    >
      {/* Invisible padding area */}
      <span className="absolute inset-[-50px] group-hover:block"></span>

      {/* Actual text */}
      {isHovered ? (
        <ScrambledContent text={text} />
      ) : (
        text
      )}
    </Tag>
  );
}

function ScrambledContent({ text }) {
  const { ref } = useScramble({
    text,
    playOnMount: true,
    speed: 0.3,
    tick: 1,
    step: 5,
    scramble: 5,
    seed: 1,
    chance: 0.81,
    overdrive: false,
    overflow: false,
  });

  return <span ref={ref}>{text}</span>;
}
