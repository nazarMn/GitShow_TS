import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBuilding, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// Імпорт зміниться, оскільки ми перенесемо FollowMessage у цю ж папку profile
import FollowMessage from './FollowMessage'; 

// 1. Описуємо інтерфейс для користувача.
// Ті поля, які можуть бути відсутніми (наприклад, company або bio), позначаємо як опціональні (?)
export interface UserProfileData {
  avatarUrl: string;
  username: string;
  bio?: string;
  location?: string;
  company?: string;
  email?: string;
}

interface UserInfoProps {
  user: UserProfileData;
  showFollowMessage?: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, showFollowMessage = false }) => {
  return (
    <div className="w-full md:w-1/2 h-full flex flex-col justify-start items-center leading-[38px] pt-[18px]">
      
      {/* Аватарка з тінями та плавною анімацією */}
      <img 
        src={user.avatarUrl} 
        alt={`${user.username}'s avatar`} 
        className="w-1/2 aspect-square rounded-full object-cover shadow-[0px_4px_10px_rgba(0,0,0,0.3),inset_0px_-4px_10px_rgba(255,255,255,0.1)] drop-shadow-[0px_8px_12px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:scale-105"
      />
      
      {/* Ім'я користувача */}
      <h2 className="text-[18px] font-medium tracking-[2px] text-[#15014b] dark:text-white mt-4">
        {user.username}
      </h2>

      {/* Кнопка підписки / Повідомлення */}
      {showFollowMessage && <FollowMessage user={user} />}
      
      {/* Біографія */}
      {user.bio && (
        <p className="text-[#15014b] dark:text-white text-center px-4 leading-normal mt-2">
          {user.bio}
        </p>
      )}

      {/* Блок з інформацією (Локація, Компанія, Пошта) */}
      <div className="flex flex-col gap-2 mt-4 w-full">
        {user.location && (
          <div className="flex w-full justify-center items-center text-[16px] font-medium tracking-[2px] text-[#15014b] dark:text-white">
            <FontAwesomeIcon icon={faLocationDot} size="lg" />
            <p className="pl-2 m-0 leading-none">{user.location}</p>
          </div>
        )}
        
        {user.company && (
          <div className="flex w-full justify-center items-center text-[16px] font-medium tracking-[2px] text-[#15014b] dark:text-white">
            <FontAwesomeIcon icon={faBuilding} size="lg" />
            <p className="pl-2 m-0 leading-none">{user.company}</p>
          </div>
        )}
        
        {user.email && (
          <div className="flex w-full justify-center items-center text-[16px] font-medium tracking-[2px] text-[#15014b] dark:text-white">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            <p className="pl-2 m-0 leading-none">{user.email}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default UserInfo;