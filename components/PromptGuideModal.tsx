
import React from 'react';
import { PROMPT_GUIDE_SECTIONS, UI_TEXTS } from '../constants';

interface PromptGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PromptGuideModal: React.FC<PromptGuideModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 text-gray-300 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
                    <h2 className="text-xl font-bold text-indigo-400">{UI_TEXTS.guideTitle}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="overflow-y-auto p-6 space-y-8">
                    {PROMPT_GUIDE_SECTIONS.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-cyan-400 mb-3">{section.title}</h3>
                            <p className="mb-4 text-gray-400">{section.description}</p>
                            {section.template && (
                                <pre className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto">
                                    <code>{section.template}</code>
                                </pre>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
