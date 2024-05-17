import React, { useState } from 'react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

// Styling and creation of each collapsible component
// How it looks and how it works

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <div
        className="flex justify-between items-center p-2 cursor-pointer"
        onClick={toggleCollapsible}
      >
        <h2 className="text-sm ">{title}</h2>
        <svg
          className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="p-4 border-t border-gray-300">{children}</div>
      )}
    </div>
  );
};

export default Collapsible;
