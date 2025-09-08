'use server';

/**
 * @fileOverview AI-powered message formatting enhancement flow.
 *
 * - enhanceMessageFormatting - A function that enhances the message formatting with AI.
 * - EnhanceMessageFormattingInput - The input type for the enhanceMessageFormatting function.
 * - EnhanceMessageFormattingOutput - The return type for the enhanceMessageFormatting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceMessageFormattingInputSchema = z.object({
  message: z.string().describe('The message to be formatted.'),
});
export type EnhanceMessageFormattingInput = z.infer<typeof EnhanceMessageFormattingInputSchema>;

const EnhanceMessageFormattingOutputSchema = z.object({
  enhancedMessage: z.string().describe('The message with enhanced formatting.'),
});
export type EnhanceMessageFormattingOutput = z.infer<typeof EnhanceMessageFormattingOutputSchema>;

export async function enhanceMessageFormatting(
  input: EnhanceMessageFormattingInput
): Promise<EnhanceMessageFormattingOutput> {
  return enhanceMessageFormattingFlow(input);
}

const enhanceMessageFormattingPrompt = ai.definePrompt({
  name: 'enhanceMessageFormattingPrompt',
  input: {schema: EnhanceMessageFormattingInputSchema},
  output: {schema: EnhanceMessageFormattingOutputSchema},
  prompt: `You are an AI assistant designed to enhance the formatting of text messages.

  Your goal is to make the message more clear and impactful by adding emphasis to key sections.
  You can use markdown formatting to apply italics, underline, or highlight important sections.

  Here are some guidelines:
  - Use italics for words or phrases that need slight emphasis.
  - Use underline for important keywords or concepts.
  - Use highlighting (using ==...==) to draw attention to critical sections or warnings.

  Message: {{{message}}}`,
});

const enhanceMessageFormattingFlow = ai.defineFlow(
  {
    name: 'enhanceMessageFormattingFlow',
    inputSchema: EnhanceMessageFormattingInputSchema,
    outputSchema: EnhanceMessageFormattingOutputSchema,
  },
  async input => {
    const {output} = await enhanceMessageFormattingPrompt(input);
    return output!;
  }
);
