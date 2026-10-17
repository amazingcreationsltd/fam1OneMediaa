export interface InquiryPayload {
  audience: 'brand' | 'creator';
  name: string;
  email: string;
  details: Record<string, string | number>;
  message?: string;
}

export interface SubmitResponse {
  ok: boolean;
  message: string;
}

/**
 * Submits client or creator inquiry.
 * Falls back to structured mailto trigger if no backend endpoint is configured.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<SubmitResponse> {
  const env = (import.meta as any).env;
  const endpoint = env?.VITE_INQUIRY_ENDPOINT;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      return {
        ok: true,
        message: 'Your brief has been logged. Our partners will respond within 24 hours.',
      };
    } catch (err: any) {
      return {
        ok: false,
        message: err.message || 'Unable to submit inquiry at this moment. Please email directly.',
      };
    }
  }

  // Structured fallback: prepare mailto dispatch
  const subject = encodeURIComponent(
    `[Fam1Media Inquiry] - ${payload.audience.toUpperCase()} - ${payload.name}`
  );

  const bodyContent = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Audience Track: ${payload.audience}`,
    ...Object.entries(payload.details).map(([key, val]) => `${key}: ${val}`),
    payload.message ? `\nBrief / Notes:\n${payload.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const mailtoUrl = `mailto:partners@fam1media.com?subject=${subject}&body=${encodeURIComponent(
    bodyContent
  )}`;

  // Slight asynchronous pause to simulate submission state
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (typeof window !== 'undefined') {
    window.location.href = mailtoUrl;
  }

  return {
    ok: true,
    message: 'Inquiry brief composed. Opening your email client to dispatch...',
  };
}
