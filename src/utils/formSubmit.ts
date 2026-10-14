// Centralised FormSubmit (https://formsubmit.co) integration.
//
// Every inquiry (product bulk inquiry + contact page) is delivered to
// INQUIRY_EMAIL and CC'd to INQUIRY_CC_EMAILS — all recipients get the full
// email with every field (and the logo attachment, if any).
//
// FormSubmit requires the primary email to be activated once: the very first
// POST will trigger a confirmation email at INQUIRY_EMAIL — click the link inside
// it, after that all subsequent submissions are delivered silently.

export const INQUIRY_EMAIL = "info.packmaxindia@gmail.com";
export const INQUIRY_CC_EMAILS = ["marketingpackmaxindia@gmail.com"];

const ENDPOINT = `https://formsubmit.co/ajax/${INQUIRY_EMAIL}`;

export interface FormSubmitPayload {
  // Visible business fields — keys become column headers in the email.
  [key: string]: string | undefined;
  _subject?: string;
  _template?: "table" | "box";
  _captcha?: "true" | "false";
  _replyto?: string;
  _cc?: string;
  _honey?: string;
}

export interface FormSubmitResponse {
  success: boolean;
  message: string;
}

export async function sendInquiry(
  payload: FormSubmitPayload,
  file?: File | null
): Promise<FormSubmitResponse> {
  const fields: Record<string, string> = {
    _template: "table",
    _captcha: "false",
    _cc: INQUIRY_CC_EMAILS.join(","),
    ...Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined) as [string, string][]
    ),
  };

  try {
    let res: Response;

    if (file) {
      // A file can only be delivered as an email attachment through a
      // multipart/form-data request — the JSON endpoint cannot carry binary
      // data. We let the browser set the multipart boundary itself.
      const form = new FormData();
      Object.entries(fields).forEach(([key, value]) => form.append(key, value));
      form.append("attachment", file, file.name);

      res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });
    } else {
      res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(fields),
      });
    }

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
