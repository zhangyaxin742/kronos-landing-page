import { validateEmail, validateName } from "@/lib/validation";
import { sendWaitlistEmails } from "@/lib/resend";
import { incrementWaitlistCount } from "@/lib/waitlistStore";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: {
    email?: string;
    name?: string;
    plan?: string;
    company?: string;
  } = {};

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { email, name, plan } = payload;

  if (!email || !validateEmail(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!name || !validateName(name)) {
    return Response.json({ error: "Invalid name" }, { status: 400 });
  }

  try {
    await sendWaitlistEmails({ email, name, plan });
    const count = incrementWaitlistCount();
    return Response.json({ success: true, count });
  } catch (error) {
    console.error("Waitlist signup failed", error);
    return Response.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
