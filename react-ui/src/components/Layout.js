import React from "react";

const CLIENT = process.env.REACT_APP_CLIENT;
const backgroundFile = "/${client}-background.jpeg".replace("${client}", CLIENT);

const Layout = ({ children, isDarkMode, backgroundImage = backgroundFile }) => {
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen relative">
        {/* Background image with blur effect */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)',
            opacity: isDarkMode? 1 : 0.85,
          }}
        />

        {/* Content container with semi-transparent overlay for readability */}
        <div className="relative z-10 container mx-auto py-4 px-4">
          <div className="container mx-auto py-8 px-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;