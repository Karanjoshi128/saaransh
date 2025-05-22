import { NextRequest } from "next/server";
import Stripe from "stripe";
import {
  incrementUserCreditsBasic,
  incrementUserCreditsPro,
  createUserCredits,
} from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

// No need for bodyParser config in app router, just ensure raw body is used
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  let body: Buffer;

  console.log("[Webhook] Incoming Stripe webhook POST");
  try {
    // Read the raw body for Stripe signature verification
    body = Buffer.from(await req.arrayBuffer());
    if (!sig || !webhookSecret) {
      console.error("[Webhook] Missing Stripe signature or webhook secret", {
        sig,
        webhookSecret,
      });
      return new Response("Missing Stripe signature or webhook secret", {
        status: 400,
      });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("[Webhook] Stripe event constructed:", event.type);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Webhook] Error constructing event:", message, err);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkUserId = session.metadata?.clerkUserId;
    const plan = session.metadata?.plan;
    console.log(
      "[Webhook] Received checkout.session.completed for user:",
      clerkUserId,
      "plan:",
      plan
    );
    if (!clerkUserId || !plan) {
      console.error("[Webhook] Missing user or plan metadata", {
        clerkUserId,
        plan,
        metadata: session.metadata,
      });
      return new Response("Missing user or plan metadata", { status: 400 });
    }
    // Ensure user exists in DB
    try {
      console.log(
        "[Webhook] Creating user credits if not exists for:",
        clerkUserId
      );
      await createUserCredits(clerkUserId);
      console.log("[Webhook] User credits ensured for:", clerkUserId);
    } catch (e) {
      console.error("[Webhook] Error creating user credits:", e);
    }
    let result = false;
    if (plan === "basic") {
      console.log("[Webhook] Incrementing BASIC credits for:", clerkUserId);
      result = await incrementUserCreditsBasic(clerkUserId);
      console.log("[Webhook] incrementUserCreditsBasic result:", result);
    } else if (plan === "pro") {
      console.log("[Webhook] Incrementing PRO credits for:", clerkUserId);
      result = await incrementUserCreditsPro(clerkUserId);
      console.log("[Webhook] incrementUserCreditsPro result:", result);
    } else {
      console.error("[Webhook] Unknown plan type:", plan);
    }
    console.log("[Webhook] Credit increment result:", result);
  } else {
    console.log("[Webhook] Ignored event type:", event.type);
  }

  return new Response("Webhook received", { status: 200 });
}
