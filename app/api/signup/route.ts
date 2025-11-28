import { NextResponse } from "next/server";

(globalThis as any).users = (globalThis as any).users || [];

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const users = (globalThis as any).users;

  const exists = users.find((u: any) => u.email === email);

  if (exists) {
    return NextResponse.json({ message: "Email already exists" }, { status: 400 });
  }

  users.push({ name, email, password });

  return NextResponse.json({ message: "Signup successful" }, { status: 200 });
}

