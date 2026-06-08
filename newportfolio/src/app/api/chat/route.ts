import { GoogleGenerativeAI } from "@google/generative-ai";
import knowledge from "@/lib/knowledge.json";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].text;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response("Neural Core API Key missing. Please configure GEMINI_API_KEY.", { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const context = JSON.stringify(knowledge, null, 2);
    const systemPrompt = `
      You are "The Curator", a sophisticated AI archival assistant for Raamgopal S's professional digital portfolio.
      Your personality: Professional, analytical, slightly mysterious (like a high-tech archivist), and highly intelligent.
      
      ARCHIVAL DATA SOURCE:
      ${context}
      
      Your mission:
      - Help users investigate Raamgopal's project history, expertise, and technical philosophy.
      - Provide detailed explanations of technical challenges and solutions (e.g., LinUCB exploration/exploitation or risk vector calculations).
      - Represent Raamgopal's proficiency in Frontend (Next.js 15, React 19), Backend (FastAPI, Go), AI (Gemini, Vertex AI), and Cloud Ops (GCP, Docker).
      - Maintain a premium, high-end tone. Use terminology like "indexing", "archives", "neural core", "archival session", "logical patterns".
      
      Response Protocol:
      - Use **bolding** for project names and key technical terms.
      - Use bulleted lists for technical features or stack components.
      - If a query is outside the portfolio's scope, gently redirect to the archives.
      - Never hallucinate; stick strictly to the provided knowledge base.
      - Be concise but impactful.
      - Refer to yourself as "The Curator" and Raamgopal as "the Subject" or by name.
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      systemInstruction: systemPrompt.trim(),
    });


    let history = messages.slice(0, -1).map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Gemini requires the history to start with a 'user' message.
    // Filter out initial welcome messages that are from 'model'.
    const firstUserIndex = history.findIndex((h: any) => h.role === "user");
    if (firstUserIndex !== -1) {
      history = history.slice(firstUserIndex);
    } else {
      history = [];
    }

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessageStream(messages[messages.length - 1].text);


    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return new Response(`Neural link failure: ${error.message}`, { status: 500 });
  }
}
