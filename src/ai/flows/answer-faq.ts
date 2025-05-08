// use server'

/**
 * @fileOverview AI-powered FAQ answering flow.
 *
 * - answerFAQ - A function that answers user questions about the product, using AI if necessary.
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
  fromExisting: z.boolean().describe('Whether the answer was from existing FAQs or AI-generated.'),
});
export type AnswerFAQOutput = z.infer<typeof AnswerFAQOutputSchema>;

export async function answerFAQ(input: AnswerFAQInput): Promise<AnswerFAQOutput> {
  return answerFAQFlow(input);
}

const faqTool = ai.defineTool({
  name: 'getFAQAnswer',
  description: 'This tool retrieves an answer from the existing FAQs if the question can be answered from existing FAQs. If the question cannot be answered using existing FAQs, return null.',
  inputSchema: z.object({
    question: z.string().describe('The user question.'),
  }),
  outputSchema: z.string().nullable(),
},
async (input) => {
  // In a real implementation, this would query a database or static list of FAQs.
  // For this example, we'll just check for a couple of specific questions.
  const question = input.question.toLowerCase();

  if (question.includes('white-label')) {
    return 'Yes, you can white-label Nedzo AI.';
  } else if (question.includes('calendly')) {
    return 'Yes, Nedzo works with Calendly.';
  } else if (question.includes('tech experience')) {
    return 'No, you do not need tech experience to use Nedzo.';
  } else {
    return null;
  }
});

const answerFAQPrompt = ai.definePrompt({
  name: 'answerFAQPrompt',
  tools: [faqTool],
  input: {schema: AnswerFAQInputSchema},
  output: {schema: AnswerFAQOutputSchema},
  prompt: `You are an AI assistant answering questions about Nedzo, an AI Voice Assistant SaaS product.

  First, try to answer the question using the getFAQAnswer tool.
  If the tool returns null, then generate an answer using your own knowledge.

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
        fromExisting: output.answer !== null,
      };
    }

    // If the tool didn't provide an answer, return a default message.
    return {
      answer: 'I am sorry, I cannot answer the question at this time.',
      fromExisting: false,
    };
  }
);
