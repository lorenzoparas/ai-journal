import { Card, Textarea } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { JournalContextType } from "../types/journal";
import { JournalContext } from "../context/journal";
import './JournalEntry.css'

const JournalEntry = () => {
    const { journal, setJournal, serviceOutput: { thinkingPatterns = [] } } = useContext<JournalContextType>(JournalContext);
    const [journalOutput, setJournalOutput] = useState('');

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
                /> : <div className="font-sans" dangerouslySetInnerHTML={{ __html: resultText() }} />}
                    
                    {/* <Textarea
                    onChange={e => setJournal(e.target.value)}
                    rows={24}
                    variant='static'
                    placeholder="what's on your mind?"
                    size="lg"
                /> */}
            </div>
        </Card>
    );
};

export default JournalEntry

// [
//     {
//         "quote": "Sometimes I don't know why I even try so hard.",
//         "thinkingPattern": "Mind reading",
//         "explanation": "This is an example of mind reading, assuming you know what others are thinking or feeling without any evidence. A more helpful reframe would be to communicate directly with others to understand their perspectives and not make assumptions about their intentions."
//     },
//     {
//         "quote": "There are so many times when other people try to hurt me.",
//         "thinkingPattern": "Overgeneralisation",
//         "explanation": "This is an example of overgeneralisation, assuming that because some people have hurt you, everyone will hurt you. A more helpful reframe would be to recognize that not everyone will behave the same way and to address specific instances of hurtful behavior individually."
//     },
//     {
//         "quote": "I guess I just gotta let it go.",
//         "thinkingPattern": "Fortune telling",
//         "explanation": "This is an example of fortune telling, predicting that nothing will change or improve in the future. A more helpful reframe would be to focus on taking positive actions to address the situation and create change rather than assuming nothing can be done."
//     },
//     {
//         "quote": "I don't even know what to do myself.",
//         "thinkingPattern": "Catastrophising",
//         "explanation": "This is an example of catastrophising, imagining the worst-case scenario and feeling overwhelmed. A more helpful reframe would be to break down the problem into smaller, manageable steps and seek support in finding a solution."
//     }
// ]