"use server";

import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

// Get user credits by Clerk user ID
export async function getUserCredits(
  clerkUserId: string
): Promise<number | null> {
  const sql = await getDbConnection();
  const result =
    await sql`SELECT credits FROM user_credits WHERE clerk_user_id = ${clerkUserId}`;
  if (result.length > 0) {
    return result[0].credits;
  }
  return null;
}

// Create user with 1 credit
export async function createUserCredits(clerkUserId: string): Promise<void> {
  const sql = await getDbConnection();
  await sql`
        INSERT INTO user_credits (clerk_user_id, credits)
        VALUES (${clerkUserId}, 1)
        ON CONFLICT (clerk_user_id) DO NOTHING
    `;
}

// Decrement user credits by 1, ensuring credits never go below zero
export async function decrementUserCredits(
  clerkUserId: string
): Promise<boolean> {
  const sql = await getDbConnection();
  const result = await sql`
        UPDATE user_credits 
        SET credits = credits - 1 
        WHERE clerk_user_id = ${clerkUserId} AND credits > 0
        RETURNING credits;
    `;
  // If result.length > 0, decrement succeeded and credits >= 0
  return result.length >     0;
}

// Increment user credits by 5 for basic plan
export async function incrementUserCreditsBasic(
  clerkUserId: string
): Promise<boolean> {
  const sql = await getDbConnection();
  const result = await sql`
        UPDATE user_credits 
        SET credits = credits + 5 
        WHERE clerk_user_id = ${clerkUserId}
        RETURNING credits;
    `;
  // If result.length > 0, increment succeeded
  return result.length > 0;
}


// Increment user credits by 50 for Pro plan
export async function incrementUserCreditsPro(
  clerkUserId: string
): Promise<boolean> {
  const sql = await getDbConnection();
  const result = await sql`
        UPDATE user_credits 
        SET credits = credits + 50 
        WHERE clerk_user_id = ${clerkUserId}
        RETURNING credits;
    `;
  // If result.length > 0, increment succeeded
  return result.length > 0;
}
