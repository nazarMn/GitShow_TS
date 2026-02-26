import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';

// 1. Описуємо тип користувача, який приходить у списку
export interface FollowUser {
  _id: string;
  username: string;
  avatarUrl?: string;
}

// 2. Типізуємо пропси компонента
interface FollowInfoModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data?: FollowUser[];
  type: 'followers' | 'following';
}

const FollowInfoModal: React.FC<FollowInfoModalProps> = ({ 
  isOpen, 
  onRequestClose, 
  data = [], 
  type 
}) => {
  const [users, setUsers] = useState<FollowUser[]>(data);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  // Типізуємо об'єкт з лічильниками (ключ - це ID користувача, значення - число)
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(data);
  }, [data]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('/api/current-user');
        if (res.ok) {
          const userData = await res.json();
          setCurrentUserId(userData.id);
        }
      } catch (err) {
        console.error('Error fetching current user', err);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    users.forEach(async (user) => {
      if (!user._id) return;
      
      const sortedIds = [currentUserId, user._id].sort();
      const chatId = `${sortedIds[0]}-${sortedIds[1]}`;
      
      try {
        const res = await fetch(`/api/messages/unread-count/${chatId}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const { unreadCount } = await res.json();
          setUnreadCounts(prev => ({ ...prev, [user._id]: unreadCount }));
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    });
  }, [currentUserId, users]);

  const handleUserClick = (userId: string) => {
    // Краще використовувати navigate замість window.location.href для SPA
    navigate(`/public-profile/${userId}`);
    onRequestClose(); // Закриваємо модалку після переходу
  };

  const handleUnfollow = async (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/unfollow/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      } else {
        const responseData = await response.json();
        alert(responseData.message || 'Failed to unfollow');
      }
    } catch (error) {
      console.error('Unfollow error:', error);
      alert('Error unfollowing user');
    }
  };

  const handleMessage = async (e: React.MouseEvent, targetUserId: string) => {
    e.stopPropagation();
    if (!currentUserId || !targetUserId) return;
    
    const sortedIds = [currentUserId, targetUserId].sort();
    const chatId = `${sortedIds[0]}-${sortedIds[1]}`;

    await fetch('/api/messages/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ chatId }),
    });

    setUnreadCounts(prev => ({ ...prev, [targetUserId]: 0 }));
    
    onRequestClose(); // Закриваємо модалку перед переходом у чат
    navigate(`/chat/${chatId}`);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      // Оверлей (фон)
      overlayClassName="fixed inset-0 bg-black/60 z-[1000] backdrop-blur-[4px] flex justify-center items-center"
      // Саме вікно (анімація fadeIn реалізована через класи Tailwind animate-in fade-in zoom-in)
      className="bg-white dark:bg-[#1C1C1C] rounded-2xl w-[90%] max-w-[555px] max-h-[80vh] p-6 overflow-y-auto shadow-[0_8px_24px_rgba(0,0,0,0.2)] dark:shadow-none outline-none animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Шапка модалки */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[24px] font-semibold text-[#333] dark:text-white">
          {type === 'followers' ? 'Followers' : 'Following'}
        </h2>
        <button 
          onClick={onRequestClose}
          className="bg-transparent border-none text-[26px] cursor-pointer text-[#888] dark:text-[#bbb] transition-colors duration-200 hover:text-[#333] dark:hover:text-white"
        >
          ×
        </button>
      </div>

      {/* Список користувачів */}
      <ul className="list-none p-0 m-0 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {users.length > 0 ? (
          users.map((user) => (
            <li 
              key={user._id} 
              onClick={() => handleUserClick(user._id)}
              className="flex items-center py-3 border-b border-[#eee] dark:border-[#333] transition-colors duration-200 cursor-pointer hover:bg-[#f9f9f9] dark:hover:bg-[#2a2a2a] group"
            >
              <img
                src={user.avatarUrl || './img/account.png'}
                alt={user.username}
                className="w-[55px] h-[55px] object-cover rounded-full mr-3 border-2 border-[#ddd] dark:border-[#555]"
              />
              <span className="text-[19px] font-medium text-[#444] dark:text-[#eee]">
                {user.username || 'No Name'}
              </span>

              {/* Бейдж непрочитаних повідомлень */}
              {unreadCounts[user._id] > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-[12px] ml-2 font-bold select-none">
                  {unreadCounts[user._id]}
                </span>
              )}

              {/* Кнопки дій */}
              <div className="ml-auto flex gap-2 pr-2">
                <button
                  onClick={(e) => handleMessage(e, user._id)}
                  className="px-3 py-1.5 text-[14px] rounded-lg border-none cursor-pointer bg-[#007bff] text-white transition-colors duration-300 hover:bg-[#0056b3]"
                >
                  Message
                </button>
                
                {type === 'following' && (
                  <button
                    onClick={(e) => handleUnfollow(e, user._id)}
                    className="px-3 py-1.5 text-[14px] rounded-lg border-none cursor-pointer bg-[#e0e0e0] dark:bg-[#444] text-[#333] dark:text-white transition-colors duration-300 hover:bg-[#c2c2c2] dark:hover:bg-[#555]"
                  >
                    Unfollow
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-[#aaa] italic mt-5">No {type}</p>
        )}
      </ul>
    </ReactModal>
  );
};

export default FollowInfoModal;