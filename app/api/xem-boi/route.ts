import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildFortunePrompt } from "@/app/lib/gemini-fortune-prompt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, birthDate } = body as { name?: string; birthDate?: string };

    /* Validate & sanitize inputs */
    if (!name?.trim() || name.trim().length > 50) {
      return NextResponse.json(
        { error: "Vui lòng nhập tên hợp lệ (tối đa 50 ký tự)." },
        { status: 400 },
      );
    }
    if (!birthDate || isNaN(Date.parse(birthDate))) {
      return NextResponse.json(
        { error: "Vui lòng nhập ngày sinh hợp lệ." },
        { status: 400 },
      );
    }
    /* Strip HTML/script tags from name */
    const sanitizedName = name.trim().replace(/<[^>]*>/g, "");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { error: "Hệ thống đang bảo trì. Vui lòng thử lại sau." },
        { status: 500 },
      );
    }

    /* Build prompt and call Gemini */
    const { systemPrompt, userPrompt } = buildFortunePrompt(
      sanitizedName,
      birthDate,
    );

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.9,
      },
    });

    const result = await model.generateContent(userPrompt);
    const text = result.response.text();
    const fortune = JSON.parse(text);

    /* Validate response structure */
    if (
      !fortune.categories ||
      !Array.isArray(fortune.categories) ||
      fortune.categories.length !== 4
    ) {
      throw new Error("Invalid fortune response structure");
    }

    return NextResponse.json(fortune);
  } catch (error) {
    console.error("Fortune API error:", error);
    return NextResponse.json(
      { error: "Không thể xem bói lúc này. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
