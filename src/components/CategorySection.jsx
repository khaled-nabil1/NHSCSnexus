import { useState } from 'react';

const CategorySection = ({ title, cards }) => {
  const [activeCard, setActiveCard] = useState(null);

  const getTitleText = (title) => {
    switch(title) {
      case 'PC1': return 'Preparatory Cycle 1';
      case 'PC2': return 'Preparatory Cycle 2';
      case 'SC1': return 'Superior Cycle 1';
      case 'SC2': return 'Superior Cycle 2';
      case 'SC3': return 'Superior Cycle 3';
      default: return title;
    }
  };

  const getSemesterLink = (title, semesterIndex) => {
    if (title === 'PC1') {
      if (semesterIndex === 0) {
        return 'https://drive.google.com/drive/folders/13ZOJJIChyDlZNixUSJKyPJ3cPXq13E8O';
      } else if (semesterIndex === 1) {
        return 'https://drive.google.com/drive/folders/13_4vw8RdwHLvCjU6OglHCZEH79-kjJLG';
      }
    }
    return '#';
  };

  const isUnavailable = (url) => {
    return url === '#' || url === 'UNKNOWN';
  };

  return (
    <section id={title} className="py-12 scroll-mt-20">
      <div className="bg-cyber-black border-2 border-cyber-green rounded-lg p-6 transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] relative">
        {/* Ambient glow */}
        <div className="absolute -top-2 -left-2 w-32 h-32 bg-cyber-green/20 rounded-full blur-2xl"></div>
        
        {/* Title section */}
        <a
          href={getSemesterLink(title, 0)}
          target="_blank"
          rel="noopener noreferrer"
          className={`group block ${getSemesterLink(title, 0) === '#' ? 'cursor-not-allowed' : ''}`}
        >
          <h2 className="text-3xl font-bold text-cyber-green mb-8 flex items-center group-hover:text-cyber-blue transition-all duration-200">
            <span className="mr-3 text-cyber-blue animate-pulse">&gt;</span>
            <span className="whitespace-nowrap">{getTitleText(title)}</span>
            <div className="h-[2px] flex-grow ml-4 bg-gradient-to-r from-cyber-green to-transparent"></div>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200">→</span>
          </h2>
        </a>
        
        {/* Semester cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className={`
                relative border-2 rounded-lg p-6
                transition-all duration-300 backdrop-blur-sm
                ${activeCard === index 
                  ? 'border-cyber-blue shadow-[0_0_15px_rgba(0,243,255,0.3)]' 
                  : 'border-cyber-green hover:border-cyber-blue hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                }
                transform hover:-translate-y-1
                ${getSemesterLink(title, index) === '#' ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-16 h-16 border-cyber-green border-t-2 border-r-2 rounded-tr-lg opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-cyber-green border-b-2 border-l-2 rounded-bl-lg opacity-50"></div>
              
              {/* Semester header */}
              <a
                href={getSemesterLink(title, index)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block ${getSemesterLink(title, index) === '#' ? 'cursor-not-allowed' : ''}`}
              >
                <h3 className="text-2xl text-cyber-blue mb-4 flex items-center group-hover:text-cyber-green transition-all duration-200">
                  <span className="mr-2 opacity-75 font-mono animate-pulse">#</span>
                  Semester {index + 1}
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200">→</span>
                </h3>
              </a>
              
              {/* Links */}
              <div className="space-y-3">
                {card.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group flex items-center text-cyber-green hover:text-cyber-blue 
                      transition-all duration-200 py-1 px-2 rounded-md
                      ${link.title === 'UNKNOWN' || link.url === '#'
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-cyber-blue/10 hover:shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                      }
                      ${activeCard === index ? 'hover:translate-x-2' : ''}
                    `}
                  >
                    <span className="mr-2 opacity-75 font-mono">-</span>
                    {link.title}
                    {link.title !== 'UNKNOWN' && link.url !== '#' && (
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200">→</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 