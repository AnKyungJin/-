import { GoogleGenAI, Modality, GenerateContentResponse, Content, Part } from "@google/genai";
import { getApiKey } from '../utils/apiKeyManager';

const modelName = 'gemini-2.5-flash-image-preview';

const getClient = (): GoogleGenAI => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API 키가 설정되지 않았습니다. 먼저 API 키를 설정해주세요.");
    }
    return new GoogleGenAI({ apiKey });
}

export const generateImage = async (
    prompt: string,
    image?: { mimeType: string; data: string }
): Promise<string> => {
    
    const ai = getClient();
    
    if (!prompt) {
        throw new Error("프롬프트는 비워둘 수 없습니다.");
    }

    const textPart: Part = { text: prompt };
    const parts: Part[] = [textPart];

    if (image) {
        const imagePart: Part = {
            inlineData: {
                mimeType: image.mimeType,
                data: image.data,
            },
        };
        // For editing, it's often best to put the prompt second
        parts.unshift(imagePart);
    }
    
    const contents: Content[] = [{ parts }];

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
                // Must include both modalities when generating/editing images with this model
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        // Find the image part in the response
        for (const candidate of response.candidates) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                }
            }
        }

        // If no image part is found, check for a text response which might be an error or refusal
        const textResponse = response.text?.trim();
        if (textResponse) {
             throw new Error(`모델이 이미지를 생성하지 않았습니다. 응답: ${textResponse}`);
        }

        throw new Error("모델 응답에서 생성된 이미지를 찾을 수 없습니다.");

    } catch (error) {
        console.error("Gemini API Error:", error);
        if (error instanceof Error && error.message.includes('400')) {
             throw new Error("잘못된 API 키일 수 있습니다. 키를 확인하고 다시 시도해주세요.");
        }
        // Provide a more user-friendly error message
        if (error instanceof Error && error.message.includes('429')) {
             throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
        }
        throw new Error(`API 요청에 실패했습니다: ${error instanceof Error ? error.message : String(error)}`);
    }
};

/**
 * Tests if the provided API key is valid by making a simple request.
 * @param apiKey The API key to test.
 * @returns A promise that resolves to true if the key is valid, false otherwise.
 */
export const testApiKey = async (apiKey: string): Promise<boolean> => {
    if (!apiKey) return false;
    try {
        const ai = new GoogleGenAI({ apiKey });
        // Use a simple, text-only model for a fast, cheap test
        const testModel = 'gemini-2.5-flash';
        await ai.models.generateContent({
            model: testModel,
            contents: [{parts: [{text: 'test'}]}], // A minimal prompt
        });
        return true;
    } catch (error) {
        console.error("API Key test failed:", error);
        return false;
    }
};
