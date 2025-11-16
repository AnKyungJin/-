import React from 'react';
import { AppMode } from '../types';

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    mode: AppMode;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);


export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading, mode }) => {
    const placeholderText = mode === AppMode.Generate 
        ? "생성할 이미지에 대한 설명을 입력하세요...\n예: 보석 테마의 레스토랑에 있는 나노 바나나 요리 사진" 
        : "위의 빌더를 사용하여 프롬프트를 구성하거나, 여기서 직접 수정하세요.";
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) {
                onSubmit();
            }
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholderText}
                rows={5}
                className="w-full bg-gray-800 text-gray-200 p-4 rounded-lg border-2 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition-colors duration-300 resize-none"
                disabled={isLoading}
            />
            <button
                onClick={onSubmit}
                disabled={isLoading || !prompt}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        생성 중...
                    </>
                ) : (
                   <> <SendIcon /> {mode === AppMode.Generate ? '생성하기' : '편집하기'} </>
                )}
            </button>
        </div>
    );
};
