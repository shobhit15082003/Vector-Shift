import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // First check localStorage, then system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('color-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply theme changes and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`
        relative h-8 w-14 rounded-full transition-colors duration-500 ease-in-out
        ${darkMode ? 'bg-indigo-950' : 'bg-amber-300'}
        focus:outline-none focus:ring-2 focus:ring-blue-500
        overflow-hidden
      `}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Stars (dark mode only) */}
      {darkMode && (
        <>
          <div className="absolute top-2 left-3 h-1 w-1 bg-white rounded-full animate-pulse" />
          <div className="absolute top-4 left-8 h-0.5 w-0.5 bg-white rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-3 left-5 h-0.5 w-0.5 bg-white rounded-full animate-pulse delay-200" />
        </>
      )}

      {/* Toggle handle */}
      <div
        className={`
          absolute top-1 left-1 h-6 w-6 rounded-full shadow-lg transition-all duration-500 ease-in-out
          ${darkMode ? 'translate-x-6 bg-gray-100' : 'translate-x-0 bg-white'}
          flex items-center justify-center overflow-hidden
        `}
      >
        {/* Sun (light mode) */}
        {!darkMode && (
          <div className="h-4 w-4 rounded-full bg-amber-400 animate-[pulse_2s_ease-in-out_infinite]" />
        )}

        {/* Proper crescent moon (dark mode) */}
        {darkMode && (
          <div className="relative h-4 w-4">
            <div className="absolute inset-0 rounded-full bg-gray-100" />
            <div 
              className="absolute top-0 left-[5px] h-4 w-4 rounded-full bg-indigo-950"
              style={{ clipPath: 'circle(40% at 30% 50%)' }}
            />
            <div className="absolute top-1 left-2 h-1 w-1 rounded-full bg-gray-300 opacity-80" />
          </div>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;