import { Card, Textarea } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { JournalContextType } from "../types/journal";
import { JournalContext } from "../context/journal";
import './JournalEntry.css'

const JournalEntry = () => {
    const { journal, setJournal, serviceOutput: { thinkingPatterns = [] } } = useContext<JournalContextType>(JournalContext);

    const resultText = () => {
        let journalCopy = journal;
        journalCopy = journalCopy.replaceAll(/\n/g, `<br>`);

        if (thinkingPatterns.length === 0) return '';
        thinkingPatterns.forEach(thinkingPattern => {
            const quoteText = `<div class="tooltip">${thinkingPattern.quote}<span
                    class='tooltip-text'
                    style='color: white; background: #252525;'
                >
                    <b>${thinkingPattern.thinkingPattern}:</b> ${thinkingPattern.explanation}
                </span>
            </div>`
            journalCopy = journalCopy.replace(thinkingPattern.quote, quoteText);
        });

        return journalCopy;
    }

    return (
        <Card className="h-full p-4 w-3/5 shadow-blue-gray-900/5">
            <div className='h-full p-8'>
                { thinkingPatterns.length === 0 ? <textarea
                    onChange={e => setJournal(e.target.value)}
                    rows={24}
                    placeholder="What's on your mind?"
                    className="whitespace-pre-wrap focus:outline-none focus:ring-0 w-full" 
                /> : <div className="font-sans" dangerouslySetInnerHTML={{ __html: resultText() }} /> }
            </div>
        </Card>
    );
};

export default JournalEntry
