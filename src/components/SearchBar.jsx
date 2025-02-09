import { useState, useEffect } from 'react';
import { searchDriveFiles, refreshCache } from '../services/driveService';

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
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isCacheReady, setIsCacheReady] = useState(false);

  useEffect(() => {
    const initializeCache = async () => {
      try {
        await refreshCache();
        setIsCacheReady(true);
      } catch (error) {
        setError('Failed to initialize search. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCache();
  }, []);

  useEffect(() => {
    if (!isCacheReady) return;

    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        try {
          const results = searchDriveFiles(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setError(error.message);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, isCacheReady]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
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

        <div className="relative">
          <div className="flex items-center bg-black/30 rounded-lg border-2 border-cyber-green focus-within:border-cyber-blue focus-within:shadow-[0_0_15px_rgba(0,243,255,0.3)] p-2 transition-all duration-300">
            <span className="text-cyber-green mr-2 font-mono animate-pulse">&gt;</span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-cyber-green focus:outline-none font-mono placeholder-cyber-green/50"
              placeholder="Enter file name..."
            />
            <div className="ml-2 p-2 text-cyber-green">
              <SearchIcon />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-500 font-mono p-2 border-2 border-red-500 rounded-md shadow-[0_0_10px_rgba(255,0,0,0.2)]">
            <span className="mr-2 animate-pulse">!</span>
            {error}
          </div>
        )}

        {isLoading && searchQuery ? (
          <div className="mt-4 text-cyber-blue font-mono animate-pulse">
            <span className="mr-2">&gt;</span>
            Searching files...
          </div>
        ) : searchResults.length > 0 ? (
          <div className="mt-4 max-h-[400px] overflow-y-auto custom-scrollbar">
            <div className="space-y-4 pr-4">
              {searchResults.map((result) => (
                <a
                  key={result.id}
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-cyber-green transition-all duration-200 hover:text-cyber-blue hover:bg-cyber-blue/10 rounded-md hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:translate-x-2"
                >
                  <div className="flex flex-col p-2">
                    <div className="flex items-center">
                      <span className="mr-2 opacity-75 font-mono">-</span>
                      <span>
                        {result.name}
                      </span>
                    </div>
                    {result.path && (
                      <div className="ml-6 text-sm text-cyber-green/60 font-mono group-hover:text-cyber-blue/60">
                        {result.path}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
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