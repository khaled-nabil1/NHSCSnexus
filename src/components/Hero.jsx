import { useState, useEffect, useCallback } from 'react';
import matrixBg from '../assets/matrix-bg.jpg'; // Make sure to add the image to your assets

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [isMobile]);

  useEffect(() => {
    // Function to trigger a glitch
    const triggerGlitch = () => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 150);
      
      // Random follow-up glitch
      if (Math.random() > 0.5) {
        setTimeout(() => {
          setGlitchText(true);
          setTimeout(() => setGlitchText(false), 100);
        }, 300);
      }
    };

    // Set up regular interval for glitches
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to glitch at each interval
        triggerGlitch();
      }
    }, 2000); // Reduced from 5000 to 2000ms

    // Random additional glitches
    const randomGlitchInterval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance for random glitch
        triggerGlitch();
      }
    }, 1000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(randomGlitchInterval);
    };
  }, []);

  return (
    <section 
      className={`
        relative overflow-hidden bg-cyber-black
        ${isMobile ? 'h-[400px]' : 'h-[600px]'}
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
    >
      {/* Matrix Background Image with mask */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          backgroundImage: `url(${matrixBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isMobile ? 0.15 : (isHovering ? 1 : 0.15),
          ...(isMobile ? {} : {
            WebkitMaskImage: isHovering ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)` : 'none',
            maskImage: isHovering ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)` : 'none',
          })
        }}
      />

      {/* Glow effect for the spotlight - hidden on mobile */}
      {!isMobile && (
        <div 
          className="absolute pointer-events-none transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 255, 157, 0.2), transparent 70%)`,
            opacity: isHovering ? 1 : 0,
            width: '100%',
            height: '100%',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/50 to-cyber-black/80 pointer-events-none" />

      {/* Glowing borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent opacity-50"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 
          className={`
            text-3xl md:text-7xl font-bold mb-4 md:mb-6 text-cyber-green tracking-wider
            ${glitchText ? 'animate-glitch' : ''}
            text-center
          `}
          style={{
            textShadow: '0 0 10px rgba(0, 255, 157, 0.5)',
          }}
        >
          Welcome to NHSCS Nexus
        </h1>
        <p className="text-lg md:text-2xl text-cyber-blue max-w-3xl text-center leading-relaxed backdrop-blur-sm py-3 md:py-4 px-4 md:px-6 rounded-lg bg-cyber-black/30">
          Collection of studying resources used in 
          <span className="font-bold block mt-1 md:mt-2 flex items-center justify-center">
            National Higher School of Cyber Security
            <span className="ml-2 w-3 h-6 bg-cyber-blue inline-block animate-caret"></span>
          </span>
        </p>

        {/* Decorative elements - adjusted for mobile */}
        <div className="absolute top-4 md:top-10 left-4 md:left-10 w-12 md:w-20 h-12 md:h-20 border-l-2 border-t-2 border-cyber-green opacity-50"></div>
        <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 w-12 md:w-20 h-12 md:h-20 border-r-2 border-b-2 border-cyber-green opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero; 