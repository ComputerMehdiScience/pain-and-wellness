import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const dm = await draftMode();
  dm.disable();
  // Go back to the page we came from (same-site paths only).
  const back = new URL(request.url).searchParams.get("redirect") || "/";
  const safe = back.startsWith("/") && !back.startsWith("//") ? back : "/";
  return NextResponse.redirect(new URL(safe, request.url));
}
