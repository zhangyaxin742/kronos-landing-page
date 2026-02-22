import { z } from "zod";

import { sendWaitlistEmails } from "@/lib/resend";
import { checkRateLimit } from "@/lib/rateLimit";
import { incrementWaitlistCount } from "@/lib/waitlistStore";

export const dynamic = "force-dynamic";

const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  plan: z.enum(["free", "pro", "elite"]).default("free"),
});

export async function POST(request: Request) {
  let payload: unknown = {};

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = waitlistSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, name, plan } = parsed.data;
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const limit = checkRateLimit(`waitlist:${ip}`, 5, 60 * 60 * 1000);

  if (!limit.allowed) {
    const retryAfter = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
    return Response.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
        },
      }
    );
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
