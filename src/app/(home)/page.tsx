// 파일 맨 위에 "use client"를 꼭 추가해야 합니다.
"use client";

import { useState } from "react";
import Box from "../component/Box";
import "../globals.css";

export default function Page() {
  const [divs, setDivs] = useState<number[]>([]);

  const handleAddDiv = () => {
    const newDivId = divs.length + 1;
    setDivs([...divs, newDivId]);
  };

  return (
    <div>
      <button
        className="absolute center bg-black text-white px-3 py-1"
        onClick={handleAddDiv}
      >
        새로운 DIV 추가
      </button>

      <div id="container">
        {divs.map((id) => (
          <div key={id}>
            <Box />
          </div>
        ))}
      </div>
    </div>
  );
}
