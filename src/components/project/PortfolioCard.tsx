import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPaperclip, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// 1. Типізуємо пропси
export interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
  websiteUrl?: string;
  // Функції можуть бути відсутніми, якщо shouldShowDelEdit = false
  onDelete?: (e: React.MouseEvent) => void;
  onEdit?: (e: React.MouseEvent) => void;
  showDelEdit?: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  link, 
  websiteUrl, 
  onDelete, 
  onEdit, 
  showDelEdit = false 
}) => {
  const location = useLocation(); 

  // Перевіряємо, чи ми на домашній сторінці, або чи передано пропс явно
  const shouldShowDelEdit = location.pathname === '/home' || showDelEdit; 

  // Генерація дефолтної картинки або рендер переданої
  const renderImage = () => {
    if (imageUrl?.trim()) {
      return (
        <img 
          src={imageUrl} 
          alt="Project Thumbnail" 
          className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
        />
      );
    }

    const firstLetter = title?.[0]?.toUpperCase() || 'P';
    const letterCode = firstLetter.charCodeAt(0);
    const color1 = `hsl(${(letterCode * 30) % 360}, 70%, 50%)`; 
    const color2 = `hsl(${(letterCode * 70) % 360}, 70%, 50%)`; 

    return (
      <div 
        className="w-full h-full flex items-center justify-center text-[4rem] font-bold text-white uppercase" 
        style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}
      >
        <span>{firstLetter}</span>
      </div>
    );
  };

  return (
    // Клас `group` для активації hover-ефектів у дочірніх елементах
    <div className="relative w-[400px] h-[250px] overflow-hidden rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#1a1a1a] text-white transition-transform duration-300 hover:scale-105 group">
      
      {/* Зображення */}
      <div className="w-full h-full flex items-center justify-center">
        {renderImage()}
      </div>
      
      {/* Оверлей з текстом (виїжджає знизу) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-5 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-center flex flex-col justify-end h-full">
        <h2 className="text-[24px] font-bold mb-2">{title}</h2>
        <p className="text-[16px] line-clamp-3">{description}</p>
      </div>

      {/* Іконки дій (виїжджають зверху) */}
      <div className="absolute -top-[50px] right-2.5 flex items-center gap-[15px] transition-all duration-300 group-hover:top-2.5 z-10">
        
        <a href={link} className="text-white hover:text-gray-300 transition-colors duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        
        {websiteUrl && (
          <a href={websiteUrl} className="text-white hover:text-gray-300 transition-colors duration-200 hover:scale-110" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faPaperclip} size="2x" />
          </a>
        )}

        {shouldShowDelEdit && (
          <div className="flex gap-3 ml-2">
            <button 
              onClick={onEdit} 
              className="bg-transparent border-none cursor-pointer text-white hover:text-blue-400 transition-all duration-200 hover:scale-125 outline-none"
              title="Edit project"
            >
              <FontAwesomeIcon icon={faEdit} size="xl" />
            </button>
            <button 
              onClick={onDelete} 
              className="bg-transparent border-none cursor-pointer text-red-500 hover:text-red-400 transition-all duration-200 hover:scale-125 outline-none"
              title="Delete project"
            >
              <FontAwesomeIcon icon={faTrash} size="xl" />
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default PortfolioCard;