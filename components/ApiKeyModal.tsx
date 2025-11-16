import React, { useState, useEffect } from 'react';
import { testApiKey } from '../services/geminiService';
import { saveApiKey, getApiKey, clearApiKey } from '../utils/apiKeyManager';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onKeyVerified: (key: string) => void;
}

enum TestStatus {
    Idle,
    Testing,
    Success,
    Error,
}

const EyeOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);

const EyeClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781z" clipRule="evenodd" />
        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.022 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
    </svg>
);


export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeyVerified }) => {
    const [apiKeyInput, setApiKeyInput] = useState('');
    const [status, setStatus] = useState<TestStatus>(TestStatus.Idle);
    const [errorMessage, setErrorMessage] = useState('');
    const [showKey, setShowKey] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setApiKeyInput(getApiKey() || '');
            setStatus(TestStatus.Idle);
            setErrorMessage('');
            setShowKey(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleTestAndSave = async () => {
        setStatus(TestStatus.Testing);
        setErrorMessage('');
        const isValid = await testApiKey(apiKeyInput);
        if (isValid) {
            saveApiKey(apiKeyInput);
            onKeyVerified(apiKeyInput);
            setStatus(TestStatus.Success);
            setTimeout(() => {
                onClose();
            }, 1500);
        } else {
            setStatus(TestStatus.Error);
            setErrorMessage('유효하지 않은 API 키입니다. 키를 확인하고 다시 시도해주세요.');
        }
    };

    const handleClear = () => {
        clearApiKey();
        setApiKeyInput('');
        onKeyVerified(''); // Notify App component that key is cleared
    };

    const getStatusMessage = () => {
        switch (status) {
            case TestStatus.Testing:
                return <p className="text-sm text-yellow-400">연결 테스트 중...</p>;
            case TestStatus.Success:
                return <p className="text-sm text-green-400">성공! 키가 저장되었습니다.</p>;
            case TestStatus.Error:
                return <p className="text-sm text-red-400">{errorMessage}</p>;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 text-gray-300 rounded-2xl shadow-2xl w-full max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-indigo-400">API 키 관리</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-400">
                        Gemini API를 사용하려면 API 키가 필요합니다. 
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline"> Google AI Studio </a>
                        에서 키를 발급받아 아래에 입력하세요. 키는 브라우저의 로컬 저장소에 안전하게 보관됩니다.
                    </p>
                    <div className="relative">
                        <input
                            type={showKey ? 'text' : 'password'}
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            placeholder="여기에 API 키를 붙여넣으세요"
                            className="w-full bg-gray-900 text-gray-200 p-3 pr-10 rounded-lg border-2 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition-colors"
                        />
                         <button
                            type="button"
                            onClick={() => setShowKey(!showKey)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-300"
                            aria-label={showKey ? 'Hide API key' : 'Show API key'}
                        >
                            {showKey ? <EyeClosedIcon /> : <EyeOpenIcon />}
                        </button>
                    </div>

                    <div className="h-5">
                        {getStatusMessage()}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                         <button
                            onClick={handleTestAndSave}
                            disabled={status === TestStatus.Testing || !apiKeyInput}
                            className="flex-grow flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {status === TestStatus.Testing ? '테스트 중...' : '저장 및 연결 테스트'}
                        </button>
                        <button
                            onClick={handleClear}
                            className="flex-grow sm:flex-grow-0 bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                        >
                            키 지우기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
