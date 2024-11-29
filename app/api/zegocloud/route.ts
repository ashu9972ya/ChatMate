import { generateToken04 } from "./zegoServerAssistant";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const userID = url.searchParams.get("userID")!;

  const appID = +process.env.NEXT_PUBLIC_ZEGO_APPID!;
  const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

  const effectiveTimeInSeconds = 3600;

  const payload = "";

  const token = generateToken04(
    appID,
    userID,
    serverSecret,
    effectiveTimeInSeconds,
    payload
  );

  return NextResponse.json({ token, appID });
}
