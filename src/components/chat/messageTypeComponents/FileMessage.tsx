// src/chat/messageTypeComponents/FileMessage.jsx
import React from 'react';
import { ChatTheme } from '../../../constants/theme';

const FileMessage = ({ message }) => {
  /* ─ helpers ──────────────────────────────────────────────── */
  const getExt = (name) => name.split('.').pop().toLowerCase();

  const ext = getExt(message.content.name);

  /* Map extensions → key used in ChatTheme.fileTypes */
  const extKey =
    /^(pdf)$/.test(ext)               ? 'pdf'   :
    /^(docx?|odt)$/.test(ext)         ? 'doc'   :
    /^(xlsx?)$/.test(ext)             ? 'xls'   :
    /^(pptx?)$/.test(ext)             ? 'ppt'   :
    /^(zip|rar)$/.test(ext)           ? 'zip'   :
    /^(png|jpe?g|gif|webp)$/.test(ext)? 'img'   :
    /^(txt)$/.test(ext)               ? 'txt'   :
    'default';

  const { bg, text } = ChatTheme.fileTypes[extKey];

  /* crude size formatter */
  const fmtSize = (bytes) => {
    if (!bytes) return ext.toUpperCase();
    const u = ['Bytes','KB','MB','GB','TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(1)} ${u[i]}`;
  };

  /* SVGs driven by `extKey` */
  const renderIcon = () => {
    const common = { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor' };
    switch (extKey) {
      case 'img':
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2
                 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2
                 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'zip':
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2
                 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case 'xls':
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0
                 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0
                 002 2z" />
          </svg>
        );
      case 'ppt':
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4
                 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      default: /* pdf, doc, txt, default */
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0
                 00-.293-.707l-5.414-5.414A1 1 0
                 0012.586 3H7a2 2 0 00-2 2v14a2 2 0
                 002 2z" />
          </svg>
        );
    }
  };

  /* ─ render ───────────────────────────────────────────────── */
  return (
    <div className="flex flex-col">
      <div
        className="flex items-center p-2 border border-gray-200 rounded-lg hover:brightness-95 transition"
      >
        <div
          className="p-2 rounded-lg mr-3"
          style={{ backgroundColor: bg, color: text }}
        >
          {renderIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: ChatTheme.textPrimary }}>
            {message.content.name}
          </p>
          <p className="text-xs" style={{ color: ChatTheme.timeStamp }}>
            {fmtSize(message.content.size)}
          </p>
        </div>

        <button
          className="p-1"
          style={{ color: text, opacity: 0.8 }}
          title="Download"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4
                 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FileMessage;
