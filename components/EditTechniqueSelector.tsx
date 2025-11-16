import React from 'react';
// Fix: Import `EditTechnique` from `../types` where it is defined, not from `../constants`.
import { EDIT_TECHNIQUES } from '../constants';
import { EditTechnique } from '../types';

interface EditTechniqueSelectorProps {
    currentTechnique: EditTechnique;
    onTechniqueChange: (technique: EditTechnique) => void;
}

export const EditTechniqueSelector: React.FC<EditTechniqueSelectorProps> = ({ currentTechnique, onTechniqueChange }) => {
    const baseClasses = "w-full text-center py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500";
    const activeClasses = "bg-cyan-600 text-white shadow";
    const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";

    return (
        <div className="flex flex-col gap-2">
             <p className="text-sm font-semibold text-gray-400 mb-1">편집 기법 선택:</p>
            <div className="grid grid-cols-3 gap-2">
                {EDIT_TECHNIQUES.map((technique) => (
                    <button
                        key={technique.key}
                        onClick={() => onTechniqueChange(technique.key)}
                        className={`${baseClasses} ${currentTechnique === technique.key ? activeClasses : inactiveClasses}`}
                        aria-pressed={currentTechnique === technique.key}
                    >
                        {technique.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
