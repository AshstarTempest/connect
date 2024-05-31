import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Button from './Button';
import anime from 'animejs/lib/anime.es.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      const moveElement = document.querySelector('.move');

      if (moveElement) {
        let xDirection = 1; // Start moving right

        // Define the animateMovement function within the useEffect
        function animateMovement() {
          const rect = moveElement.getBoundingClientRect();
          const windowWidth = window.innerWidth;

          anime({
            targets: moveElement,
            translateX: {
              value: function () {
                // Check if the element is near either edge of the screen
                if (
                  rect.left + rect.width + 10 >= windowWidth ||
                  rect.left - 10 <= 0
                ) {
                  xDirection *= -1; // Reverse direction
                }
                return `+=${20 * xDirection}`; // Move by 20px in the current direction
              },
            },
            duration: 1000, // Speed of movement (adjust as needed)
            easing: 'linear', // Consistent speed
            complete: animateMovement, // Call itself again to create a continuous loop
          });
        }

        // Call animateMovement to start the animation
        animateMovement();
      }
    }
  }, [isLoading]); // Trigger effect only when isLoading changes to false
  // Loading Delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide preloader after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []); // Run only once when the component mounts

  // Star and Content Animations
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const starCount = 100;
      const stars = [];
      let mouse = { x: null, y: null };

      window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
      });

      class Star {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = (Math.random() - 0.5) * 3;
          this.speedY = (Math.random() - 0.5) * 3;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.size > 0.2) this.size -= 0.1;
        }

        draw() {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function init() {
        stars.length = 0;
        for (let i = 0; i < starCount; i++) {
          stars.push(new Star());
        }
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < starCount; i++) {
          stars[i].update(mouse.x, mouse.y);
          stars[i].draw();

          if (stars[i].size <= 0.2) {
            stars[i] = new Star();
          }
        }
        requestAnimationFrame(animate);
      }

      init();
      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };

      // Content Animations
      // Only trigger content animations when the content is visible (after isLoading is false)
      if (!isLoading) {
        anime.timeline({ easing: 'easeOutExpo' }).add({
          // ... (content animation definitions - same as before)
        });
      }
    }
  }, [isLoading]); // Run again when isLoading changes

  return (
    <div className="App">
      {isLoading ? ( // Conditional rendering for preloader
        <div className={`preloader ${!isLoading ? 'hide' : ''}`}>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div>
            <h1 className="move">WELCOME</h1>
          </div>
          <canvas ref={canvasRef} id="lineCanvas" />
          {/* Render the rest of your content only when showContent is true */}
          {showContent && (
            <>
              <section className="hero">
                <h1>
                  Connect, Collaborate, Succeed: Your IIT-M Online Degree
                  Community Awaits!
                </h1>
                <p>
                  Join a vibrant network of students, alumni, and mentors to
                  enhance your learning experience.
                </p>
              </section>

              <section className="value-proposition">
                <Button
                  className="move"
                  showContent={showContent}
                  setShowContent={setShowContent}
                  onExpand={() => {
                    setTimeout(() => {
                      setShowContent(false);
                    }, 2000);
                  }}
                />
                <h2>Why Join Our Community?</h2>
                <ul>
                  <li>Access to exclusive study resources and materials.</li>
                  <li>
                    Connect with fellow students for study groups and peer
                    support.
                  </li>
                  <li>
                    Gain insights and advice from experienced alumni and
                    mentors.
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
            </>
          )}

          <footer className="footer">
            <p>&copy; 2023 Online Degree Community</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
