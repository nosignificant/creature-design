import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const directoryPath = path.join(process.cwd(), "public", "images");

  try {
    const files = fs.readdirSync(directoryPath);

    const imagePaths = files
      .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file))
      .map((file) => `/images/${file}`);

    return NextResponse.json(imagePaths);
  } catch (error) {
    console.error("파일 목록을 읽는 중 오류 발생:", error);
    return NextResponse.json(
      { error: "이미지 폴더 접근 실패" },
      { status: 500 }
    );
  }
}
