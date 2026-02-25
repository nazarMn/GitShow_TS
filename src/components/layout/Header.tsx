import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Типізуємо тему як 'light' або 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  // Логіка перемикання теми (адаптовано під стандарт Tailwind)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleLangOpen = () => setIsLangOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header className="w-full h-[14vh] min-h-[80px] flex items-center justify-between px-6 md:px-[58px] border-b border-[#15014b] dark:border-white bg-white dark:bg-[#101010] transition-colors duration-300 relative z-50">
      
      {/* Ліва частина: Логотип */}
      <div className="flex items-center h-full text-lg md:text-[19px] font-medium italic tracking-[3px]">
        <h1 className="text-[#15014b] dark:text-white cursor-pointer hover:text-[#3c3c3c] dark:hover:text-gray-300 transition-colors">
          GitShow
        </h1>
      </div>

      {/* Права частина: Десктопна навігація (схована на мобільних) */}
      <div className="hidden md:flex h-full w-auto items-center justify-between gap-8">
        
        {/* Блок мови */}
        <div className="flex items-center gap-2 relative">
          <FontAwesomeIcon icon={faGlobe} size="lg" className="text-[#15014b] dark:text-white transition-colors" />
          <div className="relative inline-block">
            <select
              className="appearance-none bg-transparent text-lg text-[#15014b] dark:text-white cursor-pointer outline-none pr-6 w-full"
              onClick={toggleLangOpen}
              onBlur={() => setIsLangOpen(false)}
            >
              <option value="Eng" className="text-black dark:text-white dark:bg-[#101010]">Eng</option>
              <option value="Ukr" className="text-black dark:text-white dark:bg-[#101010]">Ukr</option>
              <option value="Deu" className="text-black dark:text-white dark:bg-[#101010]">Deu</option>
              <option value="Ita" className="text-black dark:text-white dark:bg-[#101010]">Ita</option>
            </select>
            {/* Кастомна стрілочка */}
            <span 
              className={`absolute top-1/2 right-0 w-2.5 h-2.5 border-r-2 border-b-2 border-[#15014b] dark:border-white pointer-events-none transition-transform duration-300 ${
                isLangOpen ? '-translate-y-1/2 -rotate-135' : '-translate-y-1/2 rotate-45'
              }`}
            ></span>
          </div>
        </div>

        {/* Support */}
        <h2 className="text-[20px] font-semibold text-[#15014b] dark:text-white cursor-pointer hover:text-[#3c3c3c] dark:hover:text-gray-300 transition-colors">
          Support
        </h2>

        {/* Перемикач теми */}
        <FontAwesomeIcon
          icon={theme === 'light' ? faMoon : faSun}
          size="2xl"
          className="cursor-pointer text-[#15014b] dark:text-white transition-colors hover:scale-110"
          onClick={toggleTheme}
        />

        {/* GitHub іконка */}
        <FontAwesomeIcon 
          icon={faGithub} 
          size="2xl" 
          className="cursor-pointer text-[#15014b] dark:text-white transition-colors hover:scale-110" 
        />
      </div>

      {/* Кнопка бургер-меню (тільки для мобільних) */}
      <button 
        className="md:hidden flex items-center text-[#15014b] dark:text-white"
        onClick={toggleMobileMenu}
      >
        <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} size="2xl" />
      </button>

      {/* Мобільне меню (випадаєшка) */}
      {isMobileMenuOpen && (
        <div className="absolute top-[14vh] left-0 w-full bg-white dark:bg-[#101010] border-b border-[#15014b] dark:border-white flex flex-col items-center py-6 gap-6 md:hidden shadow-lg transition-colors duration-300">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGlobe} size="lg" className="text-[#15014b] dark:text-white" />
            <select className="appearance-none bg-transparent text-lg text-[#15014b] dark:text-white outline-none">
              <option value="Eng" className="text-black">Eng</option>
              <option value="Ukr" className="text-black">Ukr</option>
              <option value="Deu" className="text-black">Deu</option>
              <option value="Ita" className="text-black">Ita</option>
            </select>
          </div>
          <h2 className="text-[20px] font-semibold text-[#15014b] dark:text-white cursor-pointer">
            Support
          </h2>
          <div className="flex gap-8 mt-4">
            <FontAwesomeIcon
              icon={theme === 'light' ? faMoon : faSun}
              size="2xl"
              className="cursor-pointer text-[#15014b] dark:text-white"
              onClick={toggleTheme}
            />
            <FontAwesomeIcon icon={faGithub} size="2xl" className="cursor-pointer text-[#15014b] dark:text-white" />
          </div>
        </div>
      )}
    </header>
  );
}