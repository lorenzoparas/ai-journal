import OpenAI from "openai";

const dummy = ["sk-Arhk0KV", "R6c5ptMB4M", "yi7T3BlbkF", "JumYyU8ruT7", "KAYKba93aO"];

const openai = new OpenAI({
  apiKey: dummy.join(''),
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, - use when env vars are set up
  dangerouslyAllowBrowser: true
});

export default openai;
