import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  try {
    const res = await fetch(`${process.env.RUNNER_URL}/compile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        language: data.language,
        input: data.input,
      }),
    });

    const response = await res.json();
    if (response.error) {
      return NextResponse.json({ message: response.error }, { status: 400 });
    }

    return NextResponse.json({ message: response.output });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occured while running the code." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Hello, World!" });
};
