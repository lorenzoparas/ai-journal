import OpenAI from "openai";

const dummy = ["sk-cbr4VAw", "92uo6OxiM0", "bcYT3BlbkF", "JSM1aVdJLj5", "zxsvD6ae7U"];

const openai = new OpenAI({
  apiKey: dummy.join(''),
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, - use when env vars are set up
  dangerouslyAllowBrowser: true
});

export default openai;
