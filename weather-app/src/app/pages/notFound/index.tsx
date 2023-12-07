import React, { useEffect, useState } from 'react';

export default function NotFound() {
  const [isSupportOn, setIsSupportOn] = useState<boolean>(false);

  useEffect(() => {
    document.title = `404 Not Found`;
  }, []);

  const handleSupportChat = async () => {
    setIsSupportOn(!isSupportOn);
  };

  return (
    <div className="flex justify-center font-bold items-center bg-slate-50 bg-opacity-25 min-h-screen ">
      <div className="text-center">
        <h1 className="text-6xl mb-3 text-red-600">404</h1>
        <h2 className="text-2xl text-gray-700">Page Not Found</h2>
        <p className="text-base text-black mt-1">
          Sorry, the page you are looking for might be in another universe.
        </p>
      </div>
    </div>
  );
}
