import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

// 1. Описуємо тип даних, які очікує компонент.
// Знак питання (?) означає, що поле не є обов'язковим (користувач міг його не вказати).
export interface SocialUser {
  profileUrl?: string; // GitHub
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

interface SocialIconsProps {
  user: SocialUser;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ user }) => {
  // 2. Якщо об'єкт user порожній або не має жодного посилання, не рендеримо нічого.
  if (!user || (!user.profileUrl && !user.instagram && !user.facebook && !user.twitter)) {
    return null;
  }

  // Спільні стилі для всіх посилань, щоб не дублювати їх у кожному <a>
  const linkClasses = "text-[#15014b] dark:text-white transition-all duration-300 hover:scale-125 hover:text-[#1da1f2] dark:hover:text-[#1da1f2]";

  return (
    <div className="fixed top-1/2 left-5 -translate-y-1/2 flex flex-col gap-5 z-40">
      
      {user.profileUrl && (
        <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      )}
      
      {user.instagram && (
        <a href={user.instagram} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      )}
      
      {user.facebook && (
        <a href={user.facebook} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
      )}
      
      {user.twitter && (
        <a href={user.twitter} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
      )}
      
    </div>
  );
};

export default SocialIcons;