const { GoogleGenerativeAI } = require("@google/generative-ai");
import { NextResponse } from "next/server";

// Define an interface for the expected error structure
interface APIError {
  name?: string;
  status?: number;
  headers?: Record<string, string>;
  message: string;
}

const prompt =
  "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

   // console.log("Suggested Messages backend:", text);
    const response = NextResponse.json({ suggestedMessages: text });
   // console.log("After steaming Suggested Messages backend:", response);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const apiError = error as APIError;

      if ("status" in apiError) {
        // This is likely an API error
        const { name, status, headers, message } = apiError;
        return NextResponse.json(
          { name, status, headers, message },
          { status: status || 500 }
        );
      } else {
        // This is a general Error
        console.error("An unexpected error occurred:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    } else {
      // This is an unknown error type
      console.error("An unexpected error occurred:", error);
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
