"use client";

import 'dotenv/config'
import { ThemeProvider, Button, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import OpenAI from 'openai';
import { randomUUID } from 'crypto';

const dummy = ["sk-Arhk0KV", "R6c5ptMB4M", "yi7T3BlbkF", "JumYyU8ruT7", "KAYKba93aO"]

const openai = new OpenAI({
  apiKey: dummy.join(''),
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResponsePoints, setAiResponsePoints] = useState<string[] | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'user', content: "Your role is to act as an expert in psychology, journaling, and therapy, aiding users in their introspective journey. Users will spend 15-20 minutes writing stream-of-consciousness text about their thoughts and feelings. Your task is to analyze their writing and generate insightful, reflective journal prompts based on their input. The aim is to facilitate deeper self-understanding and personal growth for the user, exclusively through the use of journal prompts. You should not offer direct advice, psychoanalysis, or therapeutic solutions, but rather guide the user in exploring their thoughts and emotions more deeply through thoughtful questioning. It's important to handle users' inputs with empathy and sensitivity, maintaining a supportive and non-judgmental tone. You should ask for clarification only if it's essential for providing relevant prompts, and your responses should be tailored to encourage thoughtful self-reflection. Present this in 5 very short dot points" },
        { role: 'user', content: input }
      ],
      model: 'gpt-3.5-turbo',
    });

    if (!chatCompletion.choices[0].message.content) return;

    const splittedPoints = chatCompletion.choices[0].message.content.split(/\s(?=\d+\.)/).map(point => point.substring(3));
    setAiResponsePoints(splittedPoints);
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-between px-8 my-24">
        <div className="m-12 leading-loose text-center flex h-96 w-full lg:w-4/6 flex-col items-center justify-around">
          <h1 className="text-center block font-sans text-4xl antialiased font-semibold leading-tight tracking-normal text-inherit">
            AI-Powered Journal Prompts
          </h1>
          {
            aiResponsePoints
              ? aiResponsePoints.map(aiResponsePoint => (
                <div
                  key='1'
                  className="my-4"
                >
                  <p>{aiResponsePoint}</p>
                </div>
              ))
              :
              <>
                <div className="mt-12 w-full">
                  <p>Set a timer (we recommend 15-30 minutes) and write down whatever comes to mind stream of consciousness. A private connection to OpenAI will then suggest some journal prompts to help guide you in self-reflection.</p>
                </div>
                <div className="my-12 w-full">
                  <Textarea
                    className="h-full"
                    resize={true}
                    size="lg"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    label="Add a journal entry"
                  />
                </div>
                <Button size="lg" loading={isLoading} onClick={handleSubmit} placeholder={''}>I&apos;m ready</Button>
              </>
          }

        </div>
      </main>
    </ThemeProvider>

  )
}
