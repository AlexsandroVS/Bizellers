import React, { useState, useEffect, useRef } from 'react';
import { latinAmericanCountriesData, CountryData } from '@/data/countries';
import { ChevronDown } from 'lucide-react';

interface CountrySelectWithFlagAndNameProps {
  value: string;
  onChange: (dialCode: string) => void;
  onPlaceholderChange: (placeholder: string) => void;
  className?: string;
}

export const CountrySelectWithFlagAndName: React.FC<CountrySelectWithFlagAndNameProps> = ({
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
        className="flex items-center justify-between w-full bg-white border-verde-lima border rounded-md py-2 px-3 text-black focus:outline-none focus:ring-verde-lima focus:border-verde-lima sm:text-sm transition-all shadow-sm hover:shadow-md h-10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex  items-center gap-2 text-black"> {/* Changed text-black to text-white for dark background */}
          <span>{selectedCountry?.flag}</span>
          <span>{selectedCountry?.name} ({selectedCountry?.dial_code})</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} /> {/* Changed text-black to text-white */}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-verde-lima rounded-md shadow-lg max-h-60 overflow-y-auto"> {/* Changed bg-white to bg-gray-800/50 */}
          {latinAmericanCountriesData.map((country) => (
            <div
              key={country.code}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700 text-black hover:text-verde-lima"
              onClick={() => handleSelect(country)}
            > {/* Changed text-black to text-white, hover:bg-gray-100 to hover:bg-gray-700 */}
              <span>{country.name} ({country.dial_code})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
