import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export async function POST(req: NextRequest) {
  try {
    const {
      provider,
      apiKey,
      model,
      prompt,
    } = await req.json();

    switch (provider) {
      case "huggingface": {
        const client = new InferenceClient(apiKey);

        const response = await client.chatCompletion({
          model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 256,
          temperature: 0.7,
          top_p: 0.95,
        });

        return NextResponse.json({
          text:
            response.choices?.[0]?.message?.content ??
            "No response.",
        });
      }

      default:
        return NextResponse.json(
          { error: "Unsupported provider" },
          { status: 400 }
        );
    }
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
