import { Resend } from "resend";

import WaitlistWelcome from "@/emails/WaitlistWelcome";

type WaitlistEmailPayload = {
  email: string;
  name: string;
  plan?: string;
};

export type WaitlistEmailResult = {
  skipped: boolean;
};

const getFromAddress = () => {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!fromEmail) return undefined;
  return `KRONOS <${fromEmail}>`;
};

export const sendWaitlistEmails = async (
  payload: WaitlistEmailPayload
): Promise<WaitlistEmailResult> => {
  const { email, name, plan } = payload;
  const apiKey = process.env.RESEND_API_KEY;
  const from = getFromAddress();
  const teamEmail = process.env.RESEND_TEAM_EMAIL;

  if (!apiKey || !from) {
    return { skipped: true };
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: email,
    subject: "You're in. KRONOS is ready when you are.",
    react: WaitlistWelcome({ name, plan }),
  });

  if (teamEmail) {
    await resend.emails.send({
      from,
      to: teamEmail,
      subject: `New signup: ${email} (${plan ?? "free"})`,
      text: `${name} signed up for ${plan ?? "free"}.`,
    });
  }

  return { skipped: false };
};
