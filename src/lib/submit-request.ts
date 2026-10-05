import { useCallback, useState, type FormEvent } from "react";

export type RequestStatus = "idle" | "sending" | "sent" | "error";

/** Posts a request form to /api/request; throws if the server could not deliver it. */
async function submitRequest(form: HTMLFormElement) {
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.page = window.location.href;

  const response = await fetch("/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`request failed: ${response.status}`);
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
