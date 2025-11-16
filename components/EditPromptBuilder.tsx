import React, { useState, useEffect } from 'react';
import { EditTechniqueDetails, PromptPart } from '../types';
import { Combobox } from './Combobox';

const buildPrompt = (parts: PromptPart[], values: { [key: string]: string }): string => {
    return parts.map(part => {
        if (part.type === 'text') {
            return part.value;
        }
        return values[part.id] || '';
    }).join('');
};

const getInitialValues = (parts: PromptPart[]): { [key: string]: string } => {
    const initial: { [key: string]: string } = {};
    parts.forEach(part => {
        if (part.type === 'input') {
            initial[part.id] = '';
        } else if (part.type === 'select') {
            initial[part.id] = part.options[0];
        }
    });
    return initial;
};


export const EditPromptBuilder: React.FC<{
    technique: EditTechniqueDetails;
    onPromptChange: (newPrompt: string) => void;
}> = ({ technique, onPromptChange }) => {
    const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>(() => getInitialValues(technique.parts));

    useEffect(() => {
        const initialValues = getInitialValues(technique.parts);
        setFieldValues(initialValues);
        onPromptChange(buildPrompt(technique.parts, initialValues));
    }, [technique, onPromptChange]);

    const handleFieldChange = (id: string, value: string) => {
        setFieldValues(prev => {
            const newValues = { ...prev, [id]: value };
            onPromptChange(buildPrompt(technique.parts, newValues));
            return newValues;
        });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg space-y-3">
             <p className="text-sm font-semibold text-gray-400 mb-2">프롬프트 빌더:</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-base">
                {technique.parts.map((part, index) => {
                    switch (part.type) {
                        case 'text':
                            return <span key={index} className="text-gray-300 leading-8">{part.value}</span>;
                        case 'input':
                            return (
                                <Combobox
                                    key={part.id}
                                    value={fieldValues[part.id] || ''}
                                    onChange={(value) => handleFieldChange(part.id, value)}
                                    placeholder={part.placeholder}
                                    suggestions={part.suggestions || []}
                                />
                            );
                        case 'select':
                            return (
                                <select
                                    key={part.id}
                                    value={fieldValues[part.id]}
                                    onChange={(e) => handleFieldChange(part.id, e.target.value)}
                                    className="inline-block w-auto bg-gray-700 text-cyan-300 px-2 py-1 rounded-md border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-colors duration-200 appearance-none"
                                >
                                    {part.options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};
