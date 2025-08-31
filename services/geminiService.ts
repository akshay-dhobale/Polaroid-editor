import { GoogleGenAI, Modality } from '@google/genai';
import { Effect } from '../components/EffectSelector';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getPromptForEffect = (effect: Effect): string => {
    const basePrompt = `Please transform this image into a Polaroid picture. The output should be the image itself, with the classic white Polaroid frame around it. Do not add any text, handwriting, or other markings on the frame.`;
    
    let effectInstruction = '';
    switch (effect) {
        case 'Sepia Tone':
            effectInstruction = `Apply a warm sepia tone filter to give it an antique, old-fashioned look.`;
            break;
        case 'Black & White':
            effectInstruction = `Convert the image to a classic, high-contrast black and white photograph.`;
            break;
        case 'Vignette':
            effectInstruction = `Apply a gentle vignette effect, subtly darkening the corners to draw focus to the center, while maintaining a vintage feel.`;
            break;
        case 'Classic':
        default:
            effectInstruction = `Apply a subtle vintage filter to give it a nostalgic, slightly faded look with authentic color shifts, typical of old Polaroid photos.`;
            break;
    }

    return `${basePrompt} ${effectInstruction}`;
};


export const polarizeImage = async (imageDataUrl: string, effect: Effect): Promise<string> => {
    const match = imageDataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid image data URL format");
    }

    const mimeType = match[1];
    const base64Data = match[2];

    const prompt = getPromptForEffect(effect);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const newBase64Data = part.inlineData.data;
                const newMimeType = part.inlineData.mimeType;
                return `data:${newMimeType};base64,${newBase64Data}`;
            }
        }
        
        const textResponse = response.text;
        throw new Error(`AI did not return an image. Response: ${textResponse || 'No details provided.'}`);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate Polaroid image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while contacting the AI service.");
    }
};