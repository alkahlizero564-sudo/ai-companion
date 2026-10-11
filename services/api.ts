// services/api.ts
import * as SecureStore from "expo-secure-store";

const OPENAI_BASE = "https://api.openai.com/v1";

async function getKey(name: "OPENAI_API_KEY" | "ANTHROPIC_API_KEY"): Promise<string> {
  const key = await SecureStore.getItemAsync(name);
  if (!key) {
    throw new Error(
      `${name} missing. Set it once from the Settings screen — it's stored encrypted on-device, never hardcoded in source.`
    );
  }
  return key;
}

export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

// ---------- CHAT ----------
export async function sendChat(messages: ChatMessage[]): Promise<string> {
  const apiKey = await getKey("OPENAI_API_KEY");

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1",
      messages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Chat request failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content as string;
}

// ---------- IMAGE GENERATION ----------
export async function generateImage(prompt: string, size: "1024x1024" | "1792x1024" | "1024x1792" = "1024x1024") {
  const apiKey = await getKey("OPENAI_API_KEY");

  const res = await fetch(`${OPENAI_BASE}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      size,
      n: 1,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Image request failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.data[0].url as string;
}

// ---------- VIDEO GENERATION ----------
export async function generateVideo(prompt: string): Promise<string> {
  const apiKey = await SecureStore.getItemAsync("RUNWAY_API_KEY");
  if (!apiKey) {
    throw new Error(
      "RUNWAY_API_KEY missing. Video generation needs a separate provider key — see README."
    );
  }

  const res = await fetch("https://api.runwayml.com/v1/image_to_video", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Video request failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.id as string;
}

export async function saveKey(name: string, value: string) {
  await SecureStore.setItemAsync(name, value);
    }
