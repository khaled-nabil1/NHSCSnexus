import { useState } from 'react';
import { searchDriveFiles } from '../services/driveService';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('Searching for:', searchQuery); // Debug log
      const results = await searchDriveFiles(searchQuery);
      console.log('Search results:', results); // Debug log
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error); // Debug log
      setError(error.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto search-section">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cyber-green mb-2 flex items-center justify-center">
          <span className="mr-3 text-cyber-blue">&gt;</span>
          SEARCH
          <div className="h-[2px] w-24 ml-4 bg-gradient-to-r from-cyber-green to-transparent"></div>
        </h2>
        <p className="text-cyber-blue text-lg">
          Explore and Access Relevant Study Materials
        </p>
      </div>

      <div className="bg-cyber-black border-2 border-cyber-green rounded-lg p-6 transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] relative">
        {/* Ambient glow corners */}
        <div className="absolute -top-2 -left-2 w-24 h-24 bg-cyber-green/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-cyber-blue/20 rounded-full blur-2xl"></div>

        <div className="flex items-center mb-4 text-cyber-green text-sm font-mono">
          <span className="mr-2 text-cyber-blue animate-pulse">$</span>
          <span className="typing-animation">search_files</span>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center bg-black/30 rounded-lg border-2 border-cyber-green focus-within:border-cyber-blue focus-within:shadow-[0_0_15px_rgba(0,243,255,0.3)] p-2 transition-all duration-300">
            <span className="text-cyber-green mr-2 font-mono animate-pulse">&gt;</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-cyber-green focus:outline-none font-mono placeholder-cyber-green/50"
              placeholder="Enter search query..."
            />
            <button
              type="submit"
              className={`
                ml-2 p-2 text-cyber-green hover:text-cyber-blue transition-all
                rounded-md hover:bg-cyber-blue/10 hover:shadow-[0_0_10px_rgba(0,243,255,0.3)]
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={isLoading}
            >
              <SearchIcon />
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-500 font-mono p-2 border-2 border-red-500 rounded-md shadow-[0_0_10px_rgba(255,0,0,0.2)]">
            <span className="mr-2 animate-pulse">!</span>
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="mt-4 text-cyber-blue font-mono animate-pulse">
            <span className="mr-2">&gt;</span>
            Searching files...
          </div>
        ) : searchResults.length > 0 ? (
          <div className="mt-4 space-y-4">
            {/* Group results by section */}
            {['S1', 'S2'].map(section => {
              const sectionResults = searchResults.filter(result => result.section === section);
              if (sectionResults.length === 0) return null;

              return (
                <div key={section} className="space-y-2">
                  <h3 className="text-cyber-blue font-mono">
                    <span className="mr-2">#</span>
                    {section}
                  </h3>
                  {sectionResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center text-cyber-green hover:text-cyber-blue transition-colors ml-4"
                    >
                      <span className="mr-2 font-mono">-</span>
                      <a 
                        href={result.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {result.name}
                      </a>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : searchQuery && !isLoading && (
          <div className="mt-4 text-cyber-green font-mono">
            <span className="mr-2">?</span>
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 