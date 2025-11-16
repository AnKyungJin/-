
import React from 'react';
import { AppMode } from '../types';

interface ResultDisplayProps {
    imageUrl: string | null;
    isLoading: boolean;
    error: string | null;
    mode: AppMode;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <svg className="animate-spin h-12 w-12 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-lg font-semibold text-gray-200">이미지를 생성하는 중입니다...</h3>
        <p className="text-gray-400 max-w-xs">잠시만 기다려 주세요. 이 작업은 몇 초 정도 소요될 수 있습니다.</p>
    </div>
);

const Placeholder: React.FC<{ mode: AppMode }> = ({ mode }) => (
    <div className="flex flex-col items-center justify-center gap-4 text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-300">결과가 여기에 표시됩니다</h3>
        <p className="max-w-xs">
            {mode === AppMode.Generate 
                ? '프롬프트를 입력하고 "생성하기" 버튼을 눌러 이미지를 만드세요.' 
                : '이미지를 업로드하고 편집 내용을 설명한 후 "편집하기" 버튼을 누르세요.'
            }
        </p>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl, isLoading, error, mode }) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">오류 발생</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (imageUrl) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                 <img src={imageUrl} alt="Generated result" className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" />
            </div>
        );
    }

    return <Placeholder mode={mode} />;
};
