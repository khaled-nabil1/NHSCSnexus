import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navLinks = [
    { id: 'PC1', label: 'Preparatory Cycle 1' },
    { id: 'PC2', label: 'Preparatory Cycle 2' },
    { id: 'SC1', label: 'Superior Cycle 1' },
    { id: 'SC2', label: 'Superior Cycle 2' },
    { id: 'SC3', label: 'Superior Cycle 3' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'search') {
      const searchElement = document.querySelector('.search-section');
      if (searchElement) {
        const navHeight = 64;
        const additionalOffset = 20;
        const elementPosition = searchElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight - additionalOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64;
      const additionalOffset = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight - additionalOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  // Hamburger button component
  const HamburgerButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="md:hidden p-2 text-cyber-green hover:text-cyber-blue transition-colors focus:outline-none"
    >
      <div className="w-6 h-5 relative flex flex-col justify-between">
        <span 
          className={`
            block h-0.5 bg-current transform transition-all duration-300
            ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}
          `}
        />
        <span 
          className={`
            block h-0.5 bg-current transform transition-all duration-300
            ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <span 
          className={`
            block h-0.5 bg-current transform transition-all duration-300
            ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}
          `}
        />
      </div>
    </button>
  );

  return (
    <nav className="bg-cyber-black border-b border-cyber-green sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-cyber-green text-xl font-bold hover:text-cyber-blue transition-colors"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              <span className="mr-2 opacity-75">&gt;</span>
              NHSCS Nexus
            </Link>
          </div>

          {/* Mobile menu button */}
          <HamburgerButton />

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-cyber-green hover:text-cyber-blue hover:bg-cyber-blue/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                HOME
              </button>

              <button
                onClick={() => scrollToSection('search')}
                className="text-cyber-green hover:text-cyber-blue hover:bg-cyber-blue/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                SEARCH
              </button>

              <div className="h-4 w-px bg-cyber-green/30 mx-2"></div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-cyber-green hover:text-cyber-blue hover:bg-cyber-blue/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  title={link.label}
                >
                  {link.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`
            md:hidden fixed inset-0 top-16 bg-cyber-black/95 backdrop-blur-sm
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-cyber-green/30">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="w-full text-left text-cyber-green hover:text-cyber-blue hover:bg-cyber-blue/10 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
            >
              HOME
            </button>

            <button
              onClick={() => scrollToSection('search')}
              className="w-full text-left text-cyber-green hover:text-cyber-blue hover:bg-cyber-blue/10 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
            >
              SEARCH
            </button>

            <div className="h-px bg-cyber-green/30 mx-3 my-2"></div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left text-cyber-green hover:text-cyber-blue hover:bg-cyber-blue/10 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 