
import React from 'react';
import { AppMode } from '../types';

interface ModeSelectorProps {
    currentMode: AppMode;
    onModeChange: (mode: AppMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
    const baseClasses = "w-full text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500";
    const activeClasses = "bg-indigo-600 text-white shadow-lg";
    const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";

    return (
        <div className="grid grid-cols-2 gap-4 bg-gray-800 p-2 rounded-xl">
            <button
                onClick={() => onModeChange(AppMode.Generate)}
                className={`${baseClasses} ${currentMode === AppMode.Generate ? activeClasses : inactiveClasses}`}
            >
                이미지 생성
            </button>
            <button
                onClick={() => onModeChange(AppMode.Edit)}
                className={`${baseClasses} ${currentMode === AppMode.Edit ? activeClasses : inactiveClasses}`}
            >
                이미지 편집
            </button>
        </div>
    );
};
