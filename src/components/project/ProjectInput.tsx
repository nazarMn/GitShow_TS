import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Описуємо тип користувача, який повертає пошук
export interface SearchUser {
  _id: string;
  username: string;
  avatarUrl?: string;
}

const ProjectInput: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Отримуємо поточного користувача
  useEffect(() => {
    fetch('/api/current-user')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then(data => setCurrentUserId(data.id))
      .catch(err => console.error('Error fetching current user:', err));
  }, []);

  // Логіка Debounce (затримка пошуку)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchUsers(searchQuery);
      } else {
        setUsers([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchUsers = async (query: string) => {
    try {
      const response = await fetch(`/api/users?username=${query}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        // Відфільтровуємо поточного користувача з результатів
        setUsers(data.filter((user: SearchUser) => user._id !== currentUserId));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/public-profile/${userId}`);
    setSearchQuery(''); // Очищаємо пошук після переходу
    setUsers([]);
  };

  return (
    // Фіксоване позиціонування. pointer-events-none для обгортки, 
    // щоб не блокувати кліки по елементах під нею на сторінці.
    <div className="fixed top-[15vh] right-5 z-[100] flex flex-col items-end w-[90%] md:w-[300px] pointer-events-none">
      
      {/* Інпут (повертаємо pointer-events-auto, щоб можна було клікати) */}
      <input
        type="text"
        placeholder="Search for creators"
        value={searchQuery}
        onChange={handleChange}
        className="w-full p-2.5 text-[16px] md:text-[1.2rem] rounded-lg outline-none border border-gray-300 dark:border-[#555] bg-white dark:bg-[#141318] text-[#15014b] dark:text-white shadow-md transition-colors duration-300 mb-2.5 pointer-events-auto placeholder:text-gray-400"
      />
      
      {/* Випадаючий список результатів */}
      {users.length > 0 && (
        <div className="w-full max-h-[300px] overflow-y-auto bg-white dark:bg-[#222] rounded-lg border border-gray-300 dark:border-[#555] flex flex-col p-2.5 shadow-lg pointer-events-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {users.map((user) => (
            <div 
              key={user._id} 
              className="flex items-center mb-2 last:mb-0 p-2 bg-gray-50 dark:bg-[#333] rounded-md transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-[#444] cursor-pointer" 
              onClick={() => handleUserClick(user._id)}
            >
              <img 
                src={user.avatarUrl || './img/account.png'} 
                alt={user.username} 
                className="w-[40px] h-[40px] rounded-full mr-3 object-cover border border-gray-200 dark:border-gray-600"
              />
              <div className="text-[#15014b] dark:text-white font-medium text-[16px]">
                {user.username}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ProjectInput;