'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExtractApi() {
  const [apiUrl, setApiUrl] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    if (!apiUrl) {
      setError('Please provide a valid API URL');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch the data.');
      }
      const data = await response.json();
      setJsonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setJsonData(null);
    setApiUrl('');
  };

  return (
    <div className="min-h-screen flex md:items-center justify-center bg-white p-4 sm:p-6">
      <div className="w-full max-w-4xl rounded-2xl p-4 sm:p-8 space-y-4 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">API Data Extractor</h1>
        <p className="text-center text-gray-600 text-sm sm:text-base">
          Enter the API URL below to extract and display JSON data.
        </p>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter API URL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          />

          <div className="flex space-x-2">
            <button
              onClick={handleFetchData}
              className="flex-1 px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
            >
              Extract
            </button>
            <button
              onClick={handleClear}
              className="flex-1 px-4 sm:px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm sm:text-base"
            >
              Clear
            </button>
          </div>
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center space-x-2"
            >
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {jsonData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 sm:mt-8 space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Extracted JSON Data:</h2>
              <pre className="bg-gray-50 p-4 sm:p-6 rounded-xl text-xs sm:text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap border border-gray-200">
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
            >
              <div className="bg-white rounded-lg p-6 sm:p-8 max-w-sm w-full">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Error</h3>
                <p className="text-gray-700 mb-6 text-sm sm:text-base">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
