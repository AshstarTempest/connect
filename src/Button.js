import React, { useState, useRef } from 'react';
import './Button.css';
import { ReactComponent as DiscordLogo } from './discord-icon-svgrepo-com.svg';
import anime from 'animejs/lib/anime.es.js';
import { triggerVisualEffects } from './visual.js';

function Button({ showContent, setShowContent }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setIsExpanded(true); // Immediately expand on click

    // Trigger visual effects
    triggerVisualEffects(() => {
      // Redirect after visual effects complete
      window.location.href = 'https://discord.gg/BdW7yMFT';
    });

    anime({
      targets: buttonRef.current,
      width: ['300px', '100%'], // Start from 300px, expand to 100%
      height: ['50px', '100vh'],
      easing: 'easeOutExpo',
      duration: 2000,
    });

    anime({
      targets: 'body',
      backgroundColor: '#000', // Background color animation
      easing: 'easeOutExpo',
      duration: 2000,
    });

    anime({
      targets: '.App',
      opacity: [1, 0], // Fade out the rest of the content
      easing: 'easeOutExpo',
      duration: 2000,
    });
  };

  const handleShrink = () => {
    setIsExpanded(false);

    anime({
      targets: buttonRef.current,
      width: ['100%', '300px'], // Start from 100%, shrink to 300px
      height: ['100vh', '50px'],
      easing: 'easeOutExpo',
      duration: 500,
      complete: () => {
        setShowContent(true); // Show content after animation finishes
      },
    });
  };

  return (
    <div className="visual-container">
      <button
        ref={buttonRef}
        className={`discord-button ${isExpanded ? 'expanded' : ''}`}
        onClick={isExpanded ? handleShrink : handleClick}
      >
        <DiscordLogo />
        {!isExpanded && <span>CLICK ON ME</span>}
      </button>
      <div className="square"></div>
      <div className="circle"></div>
      <div className="triangle"></div>
    </div>
  );
}

export default Button;
