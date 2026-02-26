import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Описуємо тип підписника (оскільки в коді є follower._id)
interface Follower {
  _id: string;
}

// 2. Описуємо тип користувача, якого ми передаємо в пропси
export interface FollowMessageUser {
  _id: string;
  followers?: Follower[];
}

interface FollowMessageProps {
  user: FollowMessageUser;
}

const FollowMessage: React.FC<FollowMessageProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  // Типізуємо ID поточного користувача як рядок або null
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('/api/current-user');
        if (!res.ok) throw new Error('Failed to fetch user');
        
        const data = await res.json();
        setCurrentUserId(data.id);

        // Перевіряємо, чи є поточний користувач у списку підписників
        // Додаємо fallback `user.followers || []` на випадок, якщо масив не прийшов
        const isUserFollowing = (user.followers || []).some(
          (follower) => follower._id === data.id
        );
        setIsFollowing(isUserFollowing);
      } catch (err) {
        console.error('Error fetching current user:', err);
      }
    };

    if (user && user._id) {
      fetchCurrentUser();
    }
  }, [user]);

  const handleFollow = async () => {
    try {
      const response = await fetch(`/api/follow/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      
      if (response.ok) {
        setIsFollowing(true);
      } else {
        alert(data.message || 'Error following user');
      }
    } catch (error) {
      console.error('Follow error:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(`/api/unfollow/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      
      if (response.ok) {
        setIsFollowing(false);
      } else {
        alert(data.message || 'Error unfollowing user');
      }
    } catch (error) {
      console.error('Unfollow error:', error);
    }
  };

  const handleMessage = () => {
    if (!currentUserId || !user._id) return;

    // Сортуємо ID для створення унікальної кімнати чату
    const sortedIds = [currentUserId, user._id].sort();
    navigate(`/chat/${sortedIds[0]}-${sortedIds[1]}`);
  };

  return (
    <div className="flex justify-center items-center mt-2">
      {!isFollowing ? (
        <button 
          onClick={handleFollow}
          className="px-4 py-2 bg-[#1da1f2] text-white text-[14px] font-medium border-none rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#1a91da] active:scale-95 shadow-sm"
        >
          Follow
        </button>
      ) : (
        <div className="flex gap-2.5">
          <button 
            onClick={handleUnfollow}
            className="px-4 py-2 bg-[#ff4d4f] text-white text-[14px] font-medium border-none rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#e04345] active:scale-95 shadow-sm"
          >
            Unfollow
          </button>
          <button 
            onClick={handleMessage}
            className="px-4 py-2 bg-[#4caf50] text-white text-[14px] font-medium border-none rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#439c47] active:scale-95 shadow-sm"
          >
            Message
          </button>
        </div>
      )}
    </div>
  );
};

export default FollowMessage;