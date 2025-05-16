import React from 'react';
import {ChatTheme} from '../../../constants/theme';

const DocMessage = ({ message }) => {
  const getDocumentType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const docTypes = {
      pdf:  { color: '#F87171', bg: '#FEE2E2', label: 'PDF Document' },
      doc:  { color: '#3B82F6', bg: '#DBEAFE', label: 'Word Document' },
      docx: { color: '#3B82F6', bg: '#DBEAFE', label: 'Word Document' },
      txt:  { color: '#6B7280', bg: '#E5E7EB', label: 'Text Document' },
      odt:  { color: '#3B82F6', bg: '#DBEAFE', label: 'OpenDocument' },
    };
    return docTypes[extension] || { color: '#6B7280', bg: '#E5E7EB', label: 'Document' };
  };

  const docType = getDocumentType(message.content.name);
  const hasPreview = message.content.preview;

  return (
    <div className="flex flex-col w-72">
      {hasPreview && (
        <div className="border rounded-t-lg p-4 mb-1 flex justify-center items-center" style={{ backgroundColor: ChatTheme.bubbleOthers, borderColor: ChatTheme.docBorder }}>
          <img src="/api/placeholder/240/180" alt="Document preview" className="max-h-32 w-auto object-contain" />
        </div>
      )}

      <div className={`flex items-center p-3 border ${hasPreview ? 'rounded-b-lg' : 'rounded-lg'} transition-colors`} style={{ backgroundColor: ChatTheme.bubbleOthers, borderColor: ChatTheme.docBorder }}>
        <div className="p-2 rounded mr-3" style={{ backgroundColor: docType.bg, color: docType.color }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <div className="flex-grow min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: ChatTheme.textPrimary }}>
            {message.content.name}
          </p>
          <div className="flex items-center text-xs mt-0.5" style={{ color: ChatTheme.timeStamp }}>
            <span>{docType.label}</span>
            {message.content.pages && (
              <span className="ml-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {message.content.pages} pages
              </span>
            )}
          </div>
        </div>

        <button className="p-1 transition-colors" style={{ color: ChatTheme.timeStamp }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DocMessage;
