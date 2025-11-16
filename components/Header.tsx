
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg shadow-indigo-900/10">
            <div className="container mx-auto px-4 py-4 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Gemini 이미지 생성기 (Nano Banana)
                </h1>
                <p className="text-sm text-gray-400 mt-1">gemini-2.5-flash-image-preview 모델 사용</p>
            </div>
        </header>
    );
};
