import React, { useState, useEffect, useRef } from 'react';
import { latinAmericanCountriesData, CountryData } from '@/data/countries';
import { ChevronDown } from 'lucide-react';

interface CountryPhoneSelectProps {
  value: string;
  onChange: (dialCode: string) => void;
  onPlaceholderChange: (placeholder: string) => void;
  className?: string;
}

export const CountryPhoneSelect: React.FC<CountryPhoneSelectProps> = ({
  value,
  onChange,
  onPlaceholderChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedCountry = latinAmericanCountriesData.find(c => c.dial_code === value);

  useEffect(() => {
    if (selectedCountry) {
      onPlaceholderChange(selectedCountry.placeholder);
    }
  }, [selectedCountry, onPlaceholderChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (country: CountryData) => {
    onChange(country.dial_code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <div
        className="flex items-center justify-between w-full bg-white border-2 border-gray-300 rounded-xl py-3 px-4 text-black focus:outline-none focus:border-verde-lima focus:ring-2 focus:ring-verde-lima transition-all shadow-sm hover:shadow-md h-12 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span>{selectedCountry?.flag}</span>
          <span>{selectedCountry?.dial_code}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {latinAmericanCountriesData.map((country) => (
            <div
              key={country.code}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
              onClick={() => handleSelect(country)}
            >
              <span>{country.flag}</span>
              <span>{country.name} ({country.dial_code})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
