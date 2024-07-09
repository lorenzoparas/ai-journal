"use client";

import 'dotenv/config'
import {
  ThemeProvider,
  Typography
} from "@material-tailwind/react";
import { useState } from "react";
import Sidebar from './components/Sidebar';
import History from './components/History';
import JournalEntry from './components/JournalEntry';
import { JournalContext } from './context/journal';
import { Service, ServiceOutput } from './types/service';
import { InputHistoryItem } from './types/history';
import {

} from "@material-tailwind/react";
import GetStartedModal from './components/GetStartedModal';
import { ModalContext } from './context/modal';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ApiKeyContext } from './context/api-key';
import { Modals } from './types/modal';
import ApiKeyModal from './components/ApiKeyModal';
import OpenAI from 'openai';

export default function Home() {
  const [apiKey, setApiKey] = useState<string>('');
  const [journal, setJournal] = useState<string>('');
  const [currService, setCurrService] = useState<Service>(Service.TC);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serviceOutput, setServiceOutput] = useState<ServiceOutput>({ thinkingPatterns: [] });
  const [inputHistory, setInputHistory] = useState<InputHistoryItem[]>([]);
  const [openai, setOpenai] = useState<OpenAI | null>(null);

  const [openModal, setOpenModal] = useState<Modals | null>(Modals.GET_STARTED);

  return (
    <ThemeProvider>
      <ApiKeyContext.Provider value={{ apiKey, setApiKey, openai, setOpenai }}>
        <ModalContext.Provider value={{ openModal, setOpenModal }}>
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
              <div className="my-4 text-xs">
                <Typography
                  as="a"
                  href="https://forms.gle/TdCE45BYPMn1aw9A6"
                  target="_blank"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Leave us feedback here!
                </Typography>
              </div>
              <div className="flex h-[calc(100%-4rem)] w-[calc(100%-4rem)] mb-8 gap-x-4">
                <Sidebar />
                <JournalEntry />
                <History />
              </div>
              <GetStartedModal />
              <ApiKeyModal />
              <QuestionMarkCircleIcon
                onClick={() => setOpenModal(Modals.GET_STARTED)}
                color='grey'
                className='fixed w-8 h-8 bottom-8 right-8 cursor-pointer'
              />
            </main>
          </JournalContext.Provider>
        </ModalContext.Provider>
      </ApiKeyContext.Provider>
    </ThemeProvider>

  )
}
