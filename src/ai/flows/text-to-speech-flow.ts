
'use server';
/**
 * @fileOverview Flow to generate or provide text for Text-to-Speech.
 * The client-side will use browser's SpeechSynthesis API to speak the text.
 *
 * - textToSpeech - A function that returns text to be spoken.
 * - TextToSpeechInput - The input type for the textToSpeech function.
 * - TextToSpeechOutput - The return type for the textToSpeech function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TextToSpeechInputSchema = z.object({
  text: z.string().optional().describe('Optional text to be spoken. If not provided, AI will generate a short creative phrase.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  textToSpeak: z.string().describe('The text that should be spoken.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  return textToSpeechInternalFlow(input);
}

const textGeneratorPrompt = ai.definePrompt({
    name: 'textGeneratorPrompt',
    input: { schema: z.object({}) }, // No specific input needed from user for generation
    output: { schema: z.object({ creativeText: z.string() }) },
    prompt: `Generate a very short, interesting, and slightly futuristic-sounding phrase or a welcome message suitable for an AI voice assistant. Max 1-2 sentences. For example: "Greetings from the digital frontier." or "Nedzo AI, at your service."`,
});


const textToSpeechInternalFlow = ai.defineFlow(
  {
    name: 'textToSpeechInternalFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async (input) => {
    if (input.text && input.text.trim() !== "") {
      return { textToSpeak: input.text };
    }
    // Generate text if not provided or empty
    const {output} = await textGeneratorPrompt({});
    return { textToSpeak: output?.creativeText || "Hello from Nedzo AI. I am ready to assist you." };
  }
);
