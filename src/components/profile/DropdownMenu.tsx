import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// 1. Описуємо пропси: компонент очікує функцію handleLogout, яка нічого не повертає (void)
interface DropdownMenuProps {
  handleLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ handleLogout }) => {
  // Виносимо спільні класи для елементів меню у змінну, щоб не дублювати код
  const menuItemClasses = "flex items-center px-[15px] py-[10px] cursor-pointer text-[14px] text-[#15014b] dark:text-white transition-colors duration-300 hover:bg-[#f1f1f1] dark:hover:bg-[#2a2a2a]";

  return (
    <div className="absolute top-[40px] right-0 bg-white dark:bg-[#1C1C1C] shadow-[0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-none border border-transparent dark:border-[#333] rounded-lg z-[100] overflow-hidden flex flex-col min-w-[50px]">
      
      {/* Використовуємо Link замість <a> для миттєвого роутингу без перезавантаження сторінки */}
      <Link to="/PublicProfileSettings" className="no-underline">
        <div className={menuItemClasses}>
          <FontAwesomeIcon icon={faCog} size="lg" className="mr-[10px]" />
          {/* Якщо колись захочеш додати текст поруч з іконкою, просто напиши його тут */}
          {/* <span>Settings</span> */}
        </div>
      </Link>

      {/* Кнопка виходу */}
      <div className={menuItemClasses} onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-[10px]" />
      </div>

    </div>
  );
};

export default DropdownMenu;