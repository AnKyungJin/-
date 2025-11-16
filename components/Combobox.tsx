import React, { useState, useRef, useEffect } from 'react';

interface ComboboxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    suggestions: string[];
}

export const Combobox: React.FC<ComboboxProps> = ({ value, onChange, placeholder, suggestions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (suggestion: string) => {
        onChange(suggestion);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block w-auto flex-grow min-w-[120px]" ref={containerRef}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                autoComplete="off"
                className="w-full bg-gray-700 text-cyan-300 px-2 py-1 rounded-md border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-colors duration-200"
            />
            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-20 w-full mt-1 bg-gray-600 border border-gray-500 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            className="px-3 py-2 text-sm text-gray-200 cursor-pointer hover:bg-cyan-700 hover:text-white"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
