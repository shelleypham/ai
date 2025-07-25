import { google } from '@ai-sdk/google';
import { generateText, Output } from 'ai';
import 'dotenv/config';
import { z } from 'zod/v4';

async function main() {
  const { experimental_output } = await generateText({
    model: google('gemini-2.5-flash'),
    experimental_output: Output.object({
      schema: z.object({
        name: z.string(),
        age: z.number().nullable().describe('Age of the person.'),
        contact: z.object({
          type: z.literal('email'),
          value: z.string(),
        }),
        occupation: z.object({
          type: z.literal('employed'),
          company: z.string(),
          position: z.string(),
        }),
      }),
    }),
    prompt: 'Generate an example person for testing.',
  });

  console.log(experimental_output);
}

main().catch(console.error);
