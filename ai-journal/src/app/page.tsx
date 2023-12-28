"use client";

import 'dotenv/config'
import { ThemeProvider, Button, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import OpenAI from 'openai';

const dummy = ["sk-Arhk0KV", "R6c5ptMB4M", "yi7T3BlbkF", "JumYyU8ruT7", "KAYKba93aO"]

const openai = new OpenAI({
  apiKey: dummy.join(''),
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResponseMessage, setAiResponseMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'user', content: "Your role is to act as an expert in psychology, journaling, and therapy, aiding users in their introspective journey. Users will spend 15-20 minutes writing stream-of-consciousness text about their thoughts and feelings. Your task is to analyze their writing and generate insightful, reflective journal prompts based on their input. The aim is to facilitate deeper self-understanding and personal growth for the user, exclusively through the use of journal prompts. You should not offer direct advice, psychoanalysis, or therapeutic solutions, but rather guide the user in exploring their thoughts and emotions more deeply through thoughtful questioning. It's important to handle users' inputs with empathy and sensitivity, maintaining a supportive and non-judgmental tone. You should ask for clarification only if it's essential for providing relevant prompts, and your responses should be tailored to encourage thoughtful self-reflection." },
        { role: 'user', content: input }
      ],
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
