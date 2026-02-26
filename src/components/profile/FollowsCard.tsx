import React from 'react';

// 1. Описуємо структуру користувача для цього компонента
// Нам не важливо, що саме всередині масивів, головне що це масиви і в них є length
export interface FollowsCardUser {
  following?: unknown[]; 
  followers?: unknown[];
}

// 2. Типізуємо пропси. Зверни увагу на onViewAll — це функція, яка приймає чітко задані рядки!
interface FollowsCardProps {
  user: FollowsCardUser;
  onViewAll: (type: 'following' | 'followers') => void;
}

const FollowsCard: React.FC<FollowsCardProps> = ({ user, onViewAll }) => {
  return (
    <div className="flex justify-between items-center w-full mt-5">
      
      {/* Картка Following */}
      <div className="flex flex-col items-center justify-center w-[45%] h-[180px] p-5 rounded-lg backdrop-blur-md bg-white shadow-md dark:bg-[#1C1C1C] dark:shadow-none overflow-hidden transition-colors duration-300">
        <h4 className="text-[#15014b] dark:text-white text-[20px] font-semibold tracking-[1.5px] text-center mb-2.5">
          Following
        </h4>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-[#15014b] dark:text-white text-[30px] font-semibold tracking-[1.5px] text-center mb-1">
            {user.following?.length || 0}
          </h3>
          <p 
            onClick={() => onViewAll('following')}
            className="text-[#76B68E] text-[18px] font-semibold tracking-[1.5px] text-center mb-1 cursor-pointer transition-colors duration-300 hover:text-[#517A60] active:text-[#76B68E]"
          >
            View all
          </p>
        </div>
      </div>

      {/* Картка Followers */}
      <div className="flex flex-col items-center justify-center w-[45%] h-[180px] p-5 rounded-lg backdrop-blur-md bg-white shadow-md dark:bg-[#1C1C1C] dark:shadow-none overflow-hidden transition-colors duration-300">
        <h4 className="text-[#15014b] dark:text-white text-[20px] font-semibold tracking-[1.5px] text-center mb-2.5">
          Followers
        </h4>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-[#15014b] dark:text-white text-[30px] font-semibold tracking-[1.5px] text-center mb-1">
            {user.followers?.length || 0}
          </h3>
          <p 
            onClick={() => onViewAll('followers')}
            className="text-[#76B68E] text-[18px] font-semibold tracking-[1.5px] text-center mb-1 cursor-pointer transition-colors duration-300 hover:text-[#517A60] active:text-[#76B68E]"
          >
            View all
          </p>
        </div>
      </div>

    </div>
  );
};

export default FollowsCard;