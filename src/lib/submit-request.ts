import { useCallback, useState, type FormEvent } from "react";
import { API_URL } from "@/lib/api-url";

export type RequestStatus = "idle" | "sending" | "sent" | "error";

/**
 * Posts a request form straight to the admin (multipart, so the nameplate
 * photo goes along). If the API is down, falls back to /api/request, which
 * retries it and then e-mails the request (without the file).
 */
async function submitRequest(form: HTMLFormElement) {
  const data = new FormData(form);
  const page = window.location.href;
  const file = data.get("attachment");
  if (file instanceof File && !file.size) data.delete("attachment");
  data.set("source_page", page.slice(0, 255));

  try {
    const response = await fetch(`${API_URL}/api/v1/leads/`, { method: "POST", body: data });
    if (response.ok) return;
    // Validation errors would fail the fallback too.
    if (response.status < 500) throw new RejectedError(response.status);
  } catch (error) {
    if (error instanceof RejectedError) throw error;
  }

  const payload = Object.fromEntries(
    [...data.entries()].filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  const response = await fetch("/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, page }),
  });

  if (!response.ok) {
    throw new Error(`request failed: ${response.status}`);
  }
}

class RejectedError extends Error {
  constructor(status: number) {
    super(`leads API rejected the request: ${status}`);
  }
}

export function useRequestSubmit() {
  const [status, setStatus] = useState<RequestStatus>("idle");

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await submitRequest(event.currentTarget);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => setStatus("idle"), []);

  return { status, onSubmit, reset };
}
