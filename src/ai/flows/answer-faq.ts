
'use server';

/**
 * @fileOverview AI-powered FAQ answering flow.
 *
 * - answerFAQ - A function that answers user questions about the product, using AI.
 * - AnswerFAQInput - The input type for the answerFAQ function.
 * - AnswerFAQOutput - The return type for the answerFAQ function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFAQInputSchema = z.object({
  question: z.string().describe('The user question about the AI Voice Assistant.'),
});
export type AnswerFAQInput = z.infer<typeof AnswerFAQInputSchema>;

const AnswerFAQOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
  fromExisting: z.boolean().describe('Whether the answer was from existing FAQs or AI-generated. This should be false as AI is generating the answer.'),
});
export type AnswerFAQOutput = z.infer<typeof AnswerFAQOutputSchema>;

export async function answerFAQ(input: AnswerFAQInput): Promise<AnswerFAQOutput> {
  return answerFAQFlow(input);
}

// faqTool removed as per user request to have AI generate all answers.

const answerFAQPrompt = ai.definePrompt({
  name: 'answerFAQPrompt',
  // tools: [faqTool], // Tool removed
  input: {schema: AnswerFAQInputSchema},
  output: {schema: AnswerFAQOutputSchema},
  prompt: `You are an AI assistant answering questions about Nedzo, an AI Voice Assistant SaaS product.
  Generate an answer to the user's question.
  The answer you provide is AI-generated, so ensure the 'fromExisting' field in your output is set to false.

  Question: {{{question}}}
`,
});

const answerFAQFlow = ai.defineFlow(
  {
    name: 'answerFAQFlow',
    inputSchema: AnswerFAQInputSchema,
    outputSchema: AnswerFAQOutputSchema,
  },
  async input => {
    const {output} = await answerFAQPrompt(input);

    if (output?.answer) {
      return {
        answer: output.answer,
        // The LLM is instructed to set fromExisting to false.
        // If the LLM fails to set it or sets it incorrectly, we enforce false here
        // to align with the requirement that all answers are AI-generated.
        fromExisting: false, 
      };
    }
    
    // Fallback if LLM provides no output or fails.
    return {
      answer: 'I am sorry, I cannot answer the question at this time.',
      fromExisting: false, // Fallback is definitely not from existing, and AI generated.
    };
  }
);
