import React from 'react';

const StravaLogo: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 h-6 w-auto z-50 p-1 bg-white border-t border-r border-gray-300 rounded-tr-md">
      <img 
        src="/api_logo_pwrdBy_strava_horiz_black.svg" 
        alt="Powered by Strava" 
        className="h-full w-auto object-contain"
      />
    </div>
  );
};

export default StravaLogo;
