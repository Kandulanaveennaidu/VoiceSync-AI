
'use server';
/**
 * @fileOverview Flow to transcribe audio to text using AI.
 *
 * - speechToText - A function that transcribes audio.
 * - SpeechToTextInput - The input type for the speechToText function.
 * - SpeechToTextOutput - The return type for the speechToText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpeechToTextInputSchema = z.object({
  audioDataUri: z.string().describe("A recording of speech, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type SpeechToTextInput = z.infer<typeof SpeechToTextInputSchema>;

const SpeechToTextOutputSchema = z.object({
  transcript: z.string().describe('The transcribed text from the audio.'),
});
export type SpeechToTextOutput = z.infer<typeof SpeechToTextOutputSchema>;

export async function speechToText(input: SpeechToTextInput): Promise<SpeechToTextOutput> {
  return speechToTextInternalFlow(input);
}

// Using ai.generate directly within the flow as it's simpler for multimodal requests
// than ai.definePrompt which expects a string template for its `prompt` field.
const speechToTextInternalFlow = ai.defineFlow(
  {
    name: 'speechToTextInternalFlow',
    inputSchema: SpeechToTextInputSchema,
    outputSchema: SpeechToTextOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
        // Assuming gemini-2.0-flash can handle audio. If not, a specific speech model might be needed.
        // For Genkit with Google AI, this implies a model that supports multimodal input.
        model: 'googleai/gemini-2.0-flash', // Ensure this model supports audio input for transcription
        prompt: [
            {media: {url: input.audioDataUri}},
            {text: "Transcribe the spoken words in this audio. Provide only the transcription."}
        ],
        output: {
            schema: SpeechToTextOutputSchema,
            format: 'json' // Request JSON output to match the schema
        },
        config: {
            temperature: 0.1, // Lower temperature for more factual transcription
        }
    });

    if (!output?.transcript) {
        // Check for any text output if structured output fails
        const textResponse = (await ai.generate({
            model: 'googleai/gemini-2.0-flash',
            prompt: [
                {media: {url: input.audioDataUri}},
                {text: "Transcribe the spoken words in this audio. Provide only the transcription."}
            ],
             config: {
                temperature: 0.1, 
            }
        })).text;

        if (textResponse) {
            return {transcript: textResponse};
        }
        console.error("Speech-to-text flow did not produce a valid transcript.", output);
        throw new Error("Failed to transcribe audio. The AI model did not return a transcript.");
    }
    
    return output;
  }
);
