import React from 'react';

const DocMessage = ({ message }) => {
  // Function to determine document type and icon based on file extension
  const getDocumentType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    
    const docTypes = {
      'pdf': {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
        color: 'bg-red-100 text-red-600',
        label: 'PDF Document'
      },
      'doc': {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        color: 'bg-blue-100 text-blue-600',
        label: 'Word Document'
      },
      'docx': {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        color: 'bg-blue-100 text-blue-600',
        label: 'Word Document'
      },
      'txt': {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        color: 'bg-gray-100 text-gray-600',
        label: 'Text Document'
      },
      'odt': {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        color: 'bg-blue-100 text-blue-600',
        label: 'OpenDocument'
      }
    };
    
    return docTypes[extension] || {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-gray-100 text-gray-600',
      label: 'Document'
    };
  };
  
  const docType = getDocumentType(message.content.name);
  
  // Show preview if document has preview data
  const hasPreview = message.content.preview;

  return (
    <div className="flex flex-col w-72">
      {/* Document preview (if available) */}
      {hasPreview && (
        <div className="bg-gray-100 border border-gray-200 rounded-t-lg p-4 mb-1 flex justify-center items-center">
          <img 
            src="/api/placeholder/240/180" 
            alt="Document preview" 
            className="max-h-32 w-auto object-contain"
          />
        </div>
      )}
      
      {/* Document details */}
      <div className={`flex items-center p-3 border border-gray-200 ${hasPreview ? 'rounded-b-lg' : 'rounded-lg'} bg-white hover:bg-gray-50 transition-colors`}>
        <div className={`p-2 rounded ${docType.color} mr-3`}>
          {docType.icon}
        </div>
        
        <div className="flex-grow min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{message.content.name}</p>
          <div className="flex items-center text-xs text-gray-500 mt-0.5">
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
        
        <div>
          <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* <div className="self-end mt-1">
        <span className="text-xs text-gray-500">{message.time}</span>
      </div> */}
    </div>
  );
};

export default DocMessage;