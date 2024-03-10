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

export default function Home() {
  const [journal, setJournal] = useState<string>('');
  const [currService, setCurrService] = useState<Service>(Service.TC);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serviceOutput, setServiceOutput] = useState<ServiceOutput>({ thinkingPatterns: [] });
  const [inputHistory, setInputHistory] = useState<InputHistoryItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  return (
    <ThemeProvider>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
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
            <QuestionMarkCircleIcon
              onClick={() => setIsModalOpen(!isModalOpen)}
              color='black'
              className='fixed w-16 h-16 bottom-8 right-8 cursor-pointer'
            />
          </main>
        </JournalContext.Provider>
      </ModalContext.Provider>
    </ThemeProvider>

  )
}
