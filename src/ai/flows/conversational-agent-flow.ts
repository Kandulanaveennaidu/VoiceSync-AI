'use server';
/**
 * @fileOverview A conversational AI agent flow.
 *
 * - getAgentResponse - A function that handles the conversational AI responses.
 * - AgentRequestInput - The input type for the getAgentResponse function.
 * - AgentResponseOutput - The return type for the getAgentResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AgentRequestInputSchema = z.object({
  userMessage: z.string().describe('The message from the user.'),
  // Optional: Add conversation history here for more context if needed in future
  // history: z.array(z.object({ role: z.enum(['user', 'model']), parts: z.array(z.object({text: z.string()})) })).optional(),
});
export type AgentRequestInput = z.infer<typeof AgentRequestInputSchema>;

const AgentResponseOutputSchema = z.object({
  reply: z.string().describe("The AI agent's response to the user."),
});
export type AgentResponseOutput = z.infer<typeof AgentResponseOutputSchema>;

export async function getAgentResponse(input: AgentRequestInput): Promise<AgentResponseOutput> {
  return conversationalAgentFlow(input);
}

const conversationalAgentPrompt = ai.definePrompt({
  name: 'conversationalAgentPrompt',
  input: {schema: AgentRequestInputSchema},
  output: {schema: AgentResponseOutputSchema},
  prompt: `You are a helpful, friendly, and concise AI Voice Assistant for Nedzo AI.
Nedzo AI is a SaaS product that provides AI Voice Agents for marketing agencies and businesses to qualify leads, book meetings, and scale operations.
Keep your responses conversational and relatively short, suitable for a voice interaction. Avoid lists or overly complex sentences.
If asked about your capabilities, you can mention you can chat, answer questions about Nedzo AI, and demonstrate text-to-speech and speech-to-text.

User: {{{userMessage}}}
Assistant:`,
});

const conversationalAgentFlow = ai.defineFlow(
  {
    name: 'conversationalAgentFlow',
    inputSchema: AgentRequestInputSchema,
    outputSchema: AgentResponseOutputSchema,
  },
  async (input) => {
    const {output} = await conversationalAgentPrompt(input);
    
    if (!output?.reply) {
      // Fallback response if the LLM fails to generate a reply
      return { reply: "I'm sorry, I didn't quite understand that. Could you try rephrasing?" };
    }
    
    return output;
  }
);
