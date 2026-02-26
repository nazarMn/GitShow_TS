import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPaperclip, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'; // Використовуємо regular для порожньої зірки

// Імпортуємо хуки та тип Project, який ми створили раніше
import { useBookmarks, useToggleBookmark, Project } from '../../hooks/useBookmarks';

// 1. Описуємо пропси картки
export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  link: string; // GitHub посилання
  websiteUrl?: string;
  userAvatar?: string;
  userId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  link, 
  websiteUrl, 
  userAvatar, 
  userId 
}) => {
  const navigate = useNavigate();
  const { data: bookmarks = [] } = useBookmarks();
  const toggleBookmark = useToggleBookmark();

  // Перевіряємо, чи є проект у закладках
  const isSaved = bookmarks.some((proj: Project) => proj.title === title);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Запобігаємо спливанню кліку
    const project: Project = { title, description, imageUrl, url: link, language: '' }; // Адаптуємо під наш інтерфейс Project
    toggleBookmark.mutate({ project, isSaved });
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/public-profile/${userId}`);
  };

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
    const charCode = firstLetter.charCodeAt(0);
    const color1 = `hsl(${(charCode * 30) % 360}, 70%, 50%)`;
    const color2 = `hsl(${(charCode * 70) % 360}, 70%, 50%)`;

    return (
      <div 
        className="w-full h-full flex justify-center items-center text-[80px] font-bold text-white opacity-90 transition-opacity duration-300" 
        style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}
      >
        <span>{firstLetter}</span>
      </div>
    );
  };

  return (
    // Клас `group` тут є ключовим! Він дозволяє дочірнім елементам реагувати на hover картки.
    <div className="relative w-[400px] h-[250px] overflow-hidden rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-gradient-to-br from-[#1a1a1a] to-[#333] text-white transition-transform duration-300 hover:scale-105 group">
      
      {/* Зображення */}
      <div className="w-full h-full">
        {renderImage()}
      </div>
      
      {/* Оверлей з текстом (виїжджає знизу завдяки group-hover:translate-y-0) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/60 text-white p-5 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-center flex flex-col justify-end h-full">
        <h2 className="text-[22px] font-bold mb-2">{title}</h2>
        <p className="text-[14px] line-clamp-3">{description}</p>
      </div>

      {/* Блок з іконками (виїжджає зверху завдяки group-hover:top-2.5) */}
      <div className="absolute w-full px-[25px] -top-[50px] right-2.5 flex justify-between gap-[15px] transition-all duration-300 group-hover:top-2.5 z-10">
        
        {/* Ліва частина: Аватар */}
        <div className="w-1/2 flex justify-start">
          <div onClick={handleAvatarClick} className="cursor-pointer rounded-full w-[50px] h-[50px] overflow-hidden border-2 border-transparent hover:border-white transition-colors duration-300">
            <img 
              src={userAvatar || './img/account.png'} 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        {/* Права частина: Іконки дій */}
        <div className="w-[40%] flex justify-evenly items-center">
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:text-gray-300 transition-colors duration-300 hover:scale-110">
            <FontAwesomeIcon icon={faGithub} size="2xl" />
          </a>
          
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:text-gray-300 transition-colors duration-300 hover:scale-110">
              <FontAwesomeIcon icon={faPaperclip} size="2xl" />
            </a>
          )}
          
          <button onClick={handleToggle} className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform duration-300 outline-none">
            <FontAwesomeIcon 
              icon={isSaved ? solidStar : regularStar} 
              size="2xl" 
              className={`transition-colors duration-300 ${isSaved ? 'text-yellow-400' : 'text-white hover:text-gray-300'}`} 
            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;