
import { GoogleGenAI, Modality, GenerateContentResponse, Content, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash-image-preview';

export const generateImage = async (
    prompt: string,
    image?: { mimeType: string; data: string }
): Promise<string> => {
    
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
            model,
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
        // Provide a more user-friendly error message
        if (error instanceof Error && error.message.includes('429')) {
             throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
        }
        throw new Error(`API 요청에 실패했습니다: ${error instanceof Error ? error.message : String(error)}`);
    }
};
