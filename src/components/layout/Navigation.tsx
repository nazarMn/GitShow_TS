import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
// Шлях до хука може відрізнятися залежно від твоєї структури, 
// але за нашою архітектурою це буде приблизно так:
// import { useBookmarks } from '../../hooks/useBookmarks';

const Navigation: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  
  // Якщо хук ще не типізований, залишаємо поки так. 
  // Пізніше ми типізуємо useBookmarks.
//   const { data: bookmarks = [] } = useBookmarks();

  const toggleNavigation = () => setIsCollapsed((prev) => !prev);

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 flex flex-col items-end z-[9999] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'right-0' : 'right-5'
      }`}
    >
      {/* Кнопка згортання/розгортання */}
      <button
        className="bg-transparent border-none cursor-pointer text-[#15014b] dark:text-white mb-2.5 p-2.5 text-lg transition-transform duration-300 hover:scale-125 focus:outline-none"
        onClick={toggleNavigation}
        aria-label="Toggle Navigation"
      >
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} size="lg" />
      </button>

      {/* Блок з іконками навігації */}
      <div
        className={`flex flex-col gap-5 p-2.5 transition-opacity duration-300 ${
          isCollapsed ? 'hidden opacity-0' : 'flex opacity-100'
        }`}
      >
        <Link
          to="/Project"
          className="text-[#15014b] dark:text-white transition-all duration-300 hover:scale-125 hover:text-[#1da1f2] dark:hover:text-[#1da1f2]"
        >
          <FontAwesomeIcon icon={faHouse} size="2x" />
        </Link>
        
        <Link
          to="/home"
          className="text-[#15014b] dark:text-white transition-all duration-300 hover:scale-125 hover:text-[#1da1f2] dark:hover:text-[#1da1f2]"
        >
          <FontAwesomeIcon icon={faUser} size="2x" />
        </Link>
        
        {/* {bookmarks.length > 0 && (
          <Link
            to="/bookmarks"
            className="text-[#15014b] dark:text-white transition-all duration-300 hover:scale-125 hover:text-[#1da1f2] dark:hover:text-[#1da1f2]"
          >
            <FontAwesomeIcon icon={faBookmark} size="2x" />
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Navigation;