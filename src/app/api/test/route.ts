import { NextResponse } from "next/server";

// Simple test API route to verify the API functionality
export async function GET() {
  return NextResponse.json({ message: "API is working" });
}
