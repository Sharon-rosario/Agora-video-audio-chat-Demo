import React, { useState, useRef, useEffect } from 'react';

const TextMessage = ({ message, onDelete, onTag, onReply }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

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
      {/* Message Content */}
      <p className="text-sm text-gray-800">{message.content}</p>

      {/* Footer: Time, Status, Menu */}
      <div className="self-end mt-1 flex items-center space-x-1">
        <span className="text-xs text-gray-500">{message.time}</span>

        {/* Read/Delivered/Other Status Icons */}
        {/* {message.status && (
          <span className="ml-1">
            {message.status === 'read' ? (
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
              </svg>
            ) : message.status === 'delivered' ? (
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM12 2.25c-1.81 0-3.25 1.44-3.25 3.25 0 1.8 1.44 3.25 3.25 3.25s3.25-1.44 3.25-3.25c0-1.8-1.44-3.25-3.25-3.25z" />
              </svg>
            )}
          </span>
        )} */}

        {/* 3-dot menu */}
        <div className="relative ml-1" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            &#8942;
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 gap-2 bg-white border p-2 rounded-xl pshadow-lg z-50 text-sm">
              <button onClick={() => onReply?.(message)} className="w-full text-left px-4 py-2 my-[1px] rounded hover:bg-gray-200">Reply</button>
              <button onClick={() => onDelete?.(message)} className="w-full text-left px-4 py-2 my-[1px] rounded text-red-600 hover:bg-gray-200">Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextMessage;
