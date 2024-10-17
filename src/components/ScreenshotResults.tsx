import React from 'react';

interface Result {
  id: number;
  price: string;
  section: string;
  row: string;
}

interface ScreenshotResultsProps {
  url: string;
  results: Result[];
}

const ScreenshotResults: React.FC<ScreenshotResultsProps> = ({ url, results }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Results for: {url}</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Price</th>
              <th className="text-left">Section</th>
              <th className="text-left">Row</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.price}</td>
                <td>{result.section}</td>
                <td>{result.row}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScreenshotResults;