// Centralised FormSubmit (https://formsubmit.co) integration.
//
// Swap INQUIRY_EMAIL to the production address (info@packmaxindia.in) when ready.
// FormSubmit requires the destination email to be activated once: the very first
// POST will trigger a confirmation email at INQUIRY_EMAIL — click the link inside
// it, after that all subsequent submissions are delivered silently.

export const INQUIRY_EMAIL = "naniatworkmail@gmail.com";

const ENDPOINT = `https://formsubmit.co/ajax/${INQUIRY_EMAIL}`;

export interface FormSubmitPayload {
  // Visible business fields — keys become column headers in the email.
  [key: string]: string | undefined;
  _subject?: string;
  _template?: "table" | "box";
  _captcha?: "true" | "false";
  _replyto?: string;
  _honey?: string;
}

export interface FormSubmitResponse {
  success: boolean;
  message: string;
}

export async function sendInquiry(payload: FormSubmitPayload): Promise<FormSubmitResponse> {
  const body: Record<string, string> = {
    _template: "table",
    _captcha: "false",
    ...Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined) as [string, string][]
    ),
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as { success?: string; message?: string };
    const success = res.ok && String(data.success).toLowerCase() === "true";
    return {
      success,
      message:
        data.message ||
        (success
          ? "Inquiry sent."
          : "We could not transmit your inquiry. Please retry or contact us directly."),
    };
  } catch {
    return {
      success: false,
      message: "Network error — please check your connection and retry.",
    };
  }
}
