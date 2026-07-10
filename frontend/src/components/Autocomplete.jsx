import React, { useState, useEffect, useRef } from 'react';

export default function Autocomplete({ label, name, options, value, onChange, placeholder, required }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(name, val);
    
    if (val.trim() === '') {
      setFilteredOptions([]);
      setIsOpen(false);
      return;
    }
    
    // Filter and limit to 10 options for performance
    const lowerVal = val.toLowerCase();
    const filtered = options.filter(opt => opt.toLowerCase().includes(lowerVal)).slice(0, 10);
    setFilteredOptions(filtered);
    setIsOpen(true);
  };

  const handleOptionClick = (opt) => {
    onChange(name, opt);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-semibold text-textMain mb-1.5">{label}</label>
      <input 
        type="text"
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => { if(value && filteredOptions.length > 0) setIsOpen(true); }}
        className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-black/5 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((opt, index) => (
            <li 
              key={index} 
              onClick={() => handleOptionClick(opt)}
              className="px-4 py-2 hover:bg-surface cursor-pointer text-sm text-textMain transition-colors"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
