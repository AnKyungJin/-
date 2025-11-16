
import React from 'react';

interface ImageUploaderProps {
    imagePreview: string | null;
    onFileChange: (file: File | null) => void;
}

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ imagePreview, onFileChange }) => {
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileChange(e.target.files[0]);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onFileChange(null);
        // Reset file input value
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <div className="w-full">
            <label htmlFor="file-upload" className="cursor-pointer block">
                <div className="relative border-2 border-dashed border-gray-600 hover:border-indigo-500 transition-colors duration-300 rounded-xl p-4 text-center h-48 flex items-center justify-center">
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Upload preview" className="max-h-full max-w-full object-contain rounded-lg" />
                            <button onClick={handleClear} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                           <FileIcon />
                           <p className="mt-2 text-sm">편집할 이미지를 업로드하세요</p>
                           <p className="text-xs text-gray-500">클릭 또는 드래그 앤 드롭</p>
                        </div>
                    )}
                </div>
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileSelect} />
        </div>
    );
};
