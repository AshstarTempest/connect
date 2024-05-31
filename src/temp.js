import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { ReactComponent as DiscordLogo } from './discord-icon-svgrepo-com.svg';
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading time

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const animateElements = () => {
      const animations = anime.timeline({ easing: 'easeOutExpo' });
      animations
        .add({
          targets: '.hero h1',
          opacity: [0, 1],
          translateY: [-50, 0],
          duration: 1200,
        })
        .add({
          targets: '.hero p',
          opacity: [0, 1],
          translateY: [-50, 0],
          duration: 1000,
          offset: '-=800',
        })
        .add({
          targets: '.discord-button',
          opacity: [0, 1],
          scale: [0, 1],
          duration: 800,
          offset: '-=600',
        })
        .add({
          targets: '.value-proposition li',
          opacity: [0, 1],
          translateY: [-20, 0],
          delay: anime.stagger(200),
        })
        .add({
          targets: '.social-proof',
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 1000,
          easing: 'easeOutExpo',
        })
        .add({
          targets: '.about-us',
          opacity: [0, 1],
          translateX: [100, 0],
          duration: 1500,
          easing: 'easeOutExpo',
        });
    };

    if (!isLoading && canvasRef.current) {
      animateElements(); // Call the function to start animations

      // Particle Animation
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const particleCount = 100;
      let particles = [];

      // Particle class
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 7 + 3; // Random size between 3 and 10
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
          this.color = '#ff5964'; // Pink particle color
          this.opacity = 1;
          this.life = Math.random() * 100 + 50; // Particle lifespan
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.opacity -= 0.01; // Decrease opacity over time
          this.life--;
        }
        draw() {
          ctx.globalAlpha = this.opacity;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Create initial particles
      function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      }

      function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          // Check for particle death (disappearance)
          if (particles[i].life <= 0 || particles[i].opacity <= 0) {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
      }

      // Event Listeners (mouse movement)

      init();
      animate();

      // Add a resize event listener to update canvas dimensions on resize
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); // Re-initialize particles on resize
      };
      window.addEventListener('resize', handleResize);

      // Clean up event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isLoading]); // Trigger effect only when isLoading changes

  return (
    <div className="App">
      {isLoading ? (
        <>
          <div className={`preloader ${!isLoading ? 'hide' : ''}`}>
            <div className="loading-spinner"></div>
          </div>
          <canvas ref={canvasRef} id="lineCanvas" style={{ display: 'none' }} />
        </>
      ) : (
        <>
          <canvas ref={canvasRef} id="lineCanvas" />

          <section className="hero">
            <h1>
              Connect, Collaborate, Succeed: Your IIT-M Online Degree Community
              Awaits!
            </h1>
            <p>
              Join a vibrant network of students, alumni, and mentors to enhance
              your learning experience.
            </p>
            <button
              className="discord-button"
              onClick={() => {
                window.location.href = 'https://discord.gg/BdW7yMFT';
              }}
            >
              <DiscordLogo />
              <span>Join Our Discord Community</span>
            </button>
          </section>

          <section className="value-proposition">
            <h2>Why Join Our Community?</h2>
            <ul>
              <li>Access to exclusive study resources and materials.</li>
              <li>
                Connect with fellow students for study groups and peer support.
              </li>
              <li>
                Gain insights and advice from experienced alumni and mentors.
              </li>
            </ul>
          </section>

          <section className="social-proof">
            {/* Add testimonials or member count here */}
          </section>

          <section className="about-us">
            <h2>About Our Community</h2>
            <p>
              We are a passionate community of IIT-M online degree learners
              dedicated to supporting each other's academic and professional
              journeys.
            </p>
          </section>

          <footer className="footer">
            <p>&copy; 2023 IIT-M Online Degree Community</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
