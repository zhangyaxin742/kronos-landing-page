import { getWaitlistCount } from "@/lib/waitlistStore";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ count: getWaitlistCount() });
}
