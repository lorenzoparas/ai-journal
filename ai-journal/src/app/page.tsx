"use client";

import { ThemeProvider, Button, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // This is the default and can be omitted
  dangerouslyAllowBrowser: true
});

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResponseMessage, setAiResponseMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: input }],
      model: 'gpt-3.5-turbo',
    });
    setAiResponseMessage(chatCompletion.choices[0].message.content)
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex min-h-96 max-w-xs text-center flex-col items-center justify-around">
          <h1 className="block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal text-inherit">
            AI Journal
          </h1>
          {
            aiResponseMessage
              ? aiResponseMessage
              :
              <>
                <Textarea
                  className="min-h-full"
                  size="lg"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  label="Add a journal entry"
                />
                <Button size="lg" loading={isLoading} onClick={handleSubmit} placeholder={undefined}>Help me</Button>
              </>
          }

        </div>
      </main>
    </ThemeProvider>

  )
}
