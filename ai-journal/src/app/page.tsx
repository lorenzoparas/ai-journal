"use client";

import 'dotenv/config'
import { ThemeProvider, Button, Textarea, Card, Chip, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Sidebar from './components/Sidebar';
import History from './components/History';
import JournalEntry from './components/JournalEntry';
import { JournalContext } from './context/journal';
import { Service, ServiceOutput } from './types/service';
import { InputHistoryItem } from './types/history';

export default function Home() {
  const [journal, setJournal] = useState<string>('');
  const [currService, setCurrService] = useState<Service>(Service.TC);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serviceOutput, setServiceOutput] = useState<ServiceOutput>({ thinkingPatterns: [] });
  const [inputHistory, setInputHistory] = useState<InputHistoryItem[]>([]);

  return (
    <ThemeProvider>
      <JournalContext.Provider value={{
        journal,
        setJournal,
        currService,
        setCurrService,
        isLoading,
        setIsLoading,
        serviceOutput,
        setServiceOutput,
        inputHistory,
        setInputHistory
      }}>
        <main className="flex min-h-screen flex-col items-center justify-between h-screen">
          <div className="flex h-[calc(100%-4rem)] w-[calc(100%-4rem)] my-8 gap-x-4">
            <Sidebar />
            <JournalEntry />
            <History />
          </div>
        </main>
      </JournalContext.Provider>
    </ThemeProvider>

  )
}
