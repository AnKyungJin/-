import React from 'react';

interface HeaderProps {
    onOpenApiKeyModal: () => void;
}

const KeyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h2a2 2 0 012 2v10a2 2 0 01-2 2h-2m-6 0a2 2 0 00-2-2H7a2 2 0 00-2 2m8 0a2 2 0 01-2-2v-2m2 2h-2m2-4v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m0 0h2" />
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ onOpenApiKeyModal }) => {
    return (
        <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg shadow-indigo-900/10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-center flex-grow">
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Gemini 이미지 생성기 (Nano Banana)
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">gemini-2.5-flash-image-preview 모델 사용</p>
                </div>
                <div className="absolute right-4">
                     <button 
                        onClick={onOpenApiKeyModal}
                        className="p-2 bg-gray-700 hover:bg-indigo-600 rounded-full text-gray-300 hover:text-white transition-colors duration-300"
                        aria-label="API 키 관리"
                    >
                        <KeyIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};
