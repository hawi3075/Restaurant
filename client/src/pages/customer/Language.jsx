import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';

export default function Language() {
  const [selectedLang, setSelectedLang] = useState('en');

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'am', name: 'Amharic', native: 'አማርኛ' },
    { code: 'om', name: 'Afaan Oromoo', native: 'Afaan Oromoo' }
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-orange-50 text-orange-600 p-3 rounded-2xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">Choose Language</h1>
            <p className="text-sm text-gray-500">Select your preferred app language</p>
          </div>
        </div>

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition ${
                selectedLang === lang.code 
                  ? 'border-orange-600 bg-orange-50/50 text-orange-900' 
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200 text-gray-800'
              }`}
            >
              <div className="text-left">
                <p className="font-bold text-base">{lang.name}</p>
                <p className="text-xs text-gray-500">{lang.native}</p>
              </div>
              {selectedLang === lang.code && (
                <div className="bg-orange-600 text-white p-2 rounded-xl shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}