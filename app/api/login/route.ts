import { NextResponse } from "next/server"; //This imports NextResponse, which is used to send JSON responses back from a Next.js API route.

(globalThis as any).users = (globalThis as any).users || []; // It stores all registered users in memory, not in a database.

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const users = (globalThis as any).users;

  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ message: "Login success" });
}