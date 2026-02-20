type WaitlistEmailPayload = {
  email: string;
  name: string;
  plan?: string;
};

export type WaitlistEmailResult = {
  skipped: boolean;
};

export const sendWaitlistEmails = async (
  payload: WaitlistEmailPayload
): Promise<WaitlistEmailResult> => {
  if (!process.env.RESEND_API_KEY) {
    return { skipped: true };
  }

  console.warn(
    "Resend integration placeholder: configure RESEND_API_KEY to send emails.",
    payload
  );
  return { skipped: true };
};
