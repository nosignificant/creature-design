// Page.tsx
"use client";

import { useEffect, useState } from "react";
import Box from "../component/Box";

export default function Page() {
  const [divs, setDivs] = useState<number[]>([]);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [randomKey, setRandomKey] = useState(0);

  const handleRandomAll = () => {
    setRandomKey((prev) => prev + 1);
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/images");
        if (!res.ok) throw new Error("API 호출 실패");

        const paths: string[] = await res.json();
        setImagePaths(paths);
      } catch (e) {
        console.error("이미지 목록을 가져오는 데 실패했습니다.", e);
      }
    }
    fetchImages();
  }, []);

  const handleAddDiv = () => {
    const newDivId = divs.length + 1;
    setDivs([...divs, newDivId]);
  };

  return (
    <div>
      <div className="absolute center bg-black text-white ">
        <button className="px-3 py-1 cursor-pointer" onClick={handleAddDiv}>
          새로운 DIV 추가
        </button>
        <button className="px-3 py-1 cursor-pointer" onClick={handleRandomAll}>
          일괄 랜덤
        </button>
      </div>

      <div id="container">
        {divs.map((id) => (
          <Box key={id} imagePaths={imagePaths} randomKey={randomKey} />
        ))}
      </div>
    </div>
  );
}
