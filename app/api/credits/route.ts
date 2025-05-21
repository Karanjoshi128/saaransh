import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  getUserCredits,
  createUserCredits,
  decrementUserCredits,
} from "@/lib/db";

// GET: Return current user's credits, create if not exists
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  let credits = await getUserCredits(userId);
  if (credits === null) {
    await createUserCredits(userId);
    credits = 1;
  }
  return new Response(JSON.stringify({ credits }), { status: 200 });
}

// POST: Use a credit (decrement by 1 if available)
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  let credits = await getUserCredits(userId);
  if (credits === null) {
    await createUserCredits(userId);
    credits = 1;
  }
  if (credits < 1) {
    return new Response(JSON.stringify({ error: "No credits left" }), { status: 403 });
  }
  const success = await decrementUserCredits(userId);
  if (!success) {
    return new Response(JSON.stringify({ error: "Failed to decrement credits" }), { status: 500 });
  }
  return new Response(JSON.stringify({ credits: credits - 1 }), { status: 200 });
}
