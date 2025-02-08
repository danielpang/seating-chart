import React from 'react';

const Layout = ({ children, isDarkMode }) => {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <div className="container mx-auto py-8 px-4">
            {children}
          </div>
        </div>
      </div>
    );
  };

export default Layout;