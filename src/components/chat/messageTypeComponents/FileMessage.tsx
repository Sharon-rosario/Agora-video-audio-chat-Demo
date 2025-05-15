
import React from 'react';

const FileMessage = ({ message }) => {
  // Get file extension to determine the icon
  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };
  
  const fileExtension = getFileExtension(message.content.name);
  
  // Map file extensions to their appropriate colors and icons
  const fileTypeMap = {
    pdf: { color: 'bg-red-100 text-red-600', icon: 'document-text' },
    docx: { color: 'bg-blue-100 text-blue-600', icon: 'document' },
    doc: { color: 'bg-blue-100 text-blue-600', icon: 'document' },
    xlsx: { color: 'bg-green-100 text-green-600', icon: 'table' },
    xls: { color: 'bg-green-100 text-green-600', icon: 'table' },
    zip: { color: 'bg-yellow-100 text-yellow-600', icon: 'archive' },
    rar: { color: 'bg-yellow-100 text-yellow-600', icon: 'archive' },
    ppt: { color: 'bg-orange-100 text-orange-600', icon: 'presentation' },
    pptx: { color: 'bg-orange-100 text-orange-600', icon: 'presentation' },
    txt: { color: 'bg-gray-100 text-gray-600', icon: 'document' },
    png: { color: 'bg-purple-100 text-purple-600', icon: 'photo' },
    jpg: { color: 'bg-purple-100 text-purple-600', icon: 'photo' },
    jpeg: { color: 'bg-purple-100 text-purple-600', icon: 'photo' }
  };
  
  const fileType = fileTypeMap[fileExtension] || { color: 'bg-gray-100 text-gray-600', icon: 'document' };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    //@ts-ignore
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };
  
  const renderFileIcon = () => {
    switch (fileType.icon) {
      case 'document-text':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'photo':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'archive':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case 'table':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'presentation':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <div className={`p-2 rounded-lg ${fileType.color} mr-3`}>
          {renderFileIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {message.content.name}
          </p>
          <p className="text-xs text-gray-500">
            {message.content.size ? formatFileSize(message.content.size) : fileExtension.toUpperCase()}
          </p>
        </div>
        
        <div className="ml-2">
          <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="self-end mt-1">
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
    </div>
  );
};

export default FileMessage;