import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import UrlForm from './components/UrlForm';
import ScreenshotResults from './components/ScreenshotResults';

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (submittedUrl: string) => {
    setUrl(submittedUrl);
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: submittedUrl }),
      });
      if (!response.ok) {
        throw new Error('Failed to start monitoring');
      }
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError('Failed to start monitoring. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Camera className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Viagogo Screenshot Tool</h1>
        </div>
        <UrlForm onSubmit={handleSubmit} isLoading={loading} />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {loading && <p className="text-gray-600 mt-2">Starting monitoring...</p>}
        {url && !loading && <ScreenshotResults url={url} results={results} />}
      </div>
    </div>
  );
}

export default App;