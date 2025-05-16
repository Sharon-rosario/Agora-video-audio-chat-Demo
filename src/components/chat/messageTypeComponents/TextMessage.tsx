import React, { useState, useRef, useEffect } from 'react';
import { ChatTheme } from '../../../constants/theme';


const TextMessage = ({ message, onDelete, onTag, onReply }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col relative">
      <p className="text-sm" style={{ color: ChatTheme.textPrimary }}>
        {message.content}
      </p>
    </div>
  );
};

export default TextMessage;
