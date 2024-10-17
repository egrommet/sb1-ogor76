import React, { useState } from 'react';

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit, isLoading }) => {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Viagogo URL
        </label>
        <input
          type="url"
          id="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://www.viagogo.com/..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
        disabled={isLoading}
      >
        {isLoading ? 'Starting...' : 'Start Monitoring'}
      </button>
    </form>
  );
};

export default UrlForm;