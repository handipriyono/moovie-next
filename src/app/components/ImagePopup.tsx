"use client";
import React, { useState, useEffect, useCallback } from "react";

type TImagePopup = {
  imageUrl: string;
};

const ImagePopup = ({ imageUrl }: TImagePopup) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = useCallback(() => {
    setIsPopupOpen(!isPopupOpen);
  }, [isPopupOpen]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Escape") {
        togglePopup();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [togglePopup]);

  return (
    <>
      <img
        className="aspect-[3/2] w-full rounded-2xl object-cover transition-transform transform hover:scale-100 sm:hover:scale-110 "
        src={imageUrl}
        alt="feature"
        onClick={togglePopup}
      />
      {isPopupOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="max-w-full max-h-full overflow-auto">
            <button
              className="absolute top-2 right-10 text-white text-lg font-bold hover:text-gray-300 bg-black p-4"
              onClick={togglePopup}
            >
              Close
            </button>
            <img
              src={imageUrl}
              alt="Full Scrseen"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePopup;
