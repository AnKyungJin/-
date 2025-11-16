import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { PromptInput } from './components/PromptInput';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { PromptGuideModal } from './components/PromptGuideModal';
import { EditTechniqueSelector } from './components/EditTechniqueSelector';
import { EditPromptBuilder } from './components/EditPromptBuilder';
import { AppMode, EditTechnique } from './types';
import { generateImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { EDIT_TECHNIQUES } from './constants';

const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>(AppMode.Generate);
    const [prompt, setPrompt] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
    const [editTechnique, setEditTechnique] = useState<EditTechnique>(EDIT_TECHNIQUES[0].key);

    const handleFileChange = (file: File | null) => {
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleModeChange = (newMode: AppMode) => {
        setMode(newMode);
        setGeneratedImageUrl(null);
        setError(null);

        if (newMode === AppMode.Generate) {
            setPrompt('');
            handleFileChange(null);
        } else {
            setEditTechnique(EDIT_TECHNIQUES[0].key);
        }
    };

    const handleTechniqueChange = (newTechnique: EditTechnique) => {
        setEditTechnique(newTechnique);
    };

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImageUrl(null);

        try {
            let imagePayload: { mimeType: string, data: string } | undefined = undefined;

            if (mode === AppMode.Edit) {
                if (!imageFile) {
                    throw new Error('이미지 편집 모드에서는 이미지를 업로드해야 합니다.');
                }
                const base64Data = await fileToBase64(imageFile);
                imagePayload = { mimeType: imageFile.type, data: base64Data };
            }

            const resultUrl = await generateImage(prompt, imagePayload);
            setGeneratedImageUrl(resultUrl);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : '이미지 생성 중 알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, mode, imageFile]);
    
    const handlePromptChange = useCallback((newPrompt: string) => {
        setPrompt(newPrompt);
    }, []);

    const selectedTechnique = EDIT_TECHNIQUES.find(t => t.key === editTechnique) ?? EDIT_TECHNIQUES[0];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3 flex flex-col gap-6">
                    <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
                    
                    {mode === AppMode.Edit && (
                        <>
                            <ImageUploader 
                                imagePreview={imagePreview} 
                                onFileChange={handleFileChange} 
                            />
                            <EditTechniqueSelector
                                currentTechnique={editTechnique}
                                onTechniqueChange={handleTechniqueChange}
                            />
                            <EditPromptBuilder
                                technique={selectedTechnique}
                                onPromptChange={handlePromptChange}
                            />
                        </>
                    )}
                    
                    <PromptInput 
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        mode={mode}
                    />

                    <button 
                        onClick={() => setIsGuideOpen(true)}
                        className="mt-4 text-center w-full bg-gray-700 hover:bg-gray-600 text-indigo-300 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        프롬프트 가이드 보기
                    </button>
                </div>
                <div className="lg:w-2/3 flex-grow flex items-center justify-center bg-gray-800 rounded-xl shadow-lg p-4">
                    <ResultDisplay
                        imageUrl={generatedImageUrl}
                        isLoading={isLoading}
                        error={error}
                        mode={mode}
                    />
                </div>
            </main>
            <PromptGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        </div>
    );
};

export default App;
