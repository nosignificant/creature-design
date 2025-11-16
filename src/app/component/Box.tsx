"use client";

import { useDraggable } from "@neodrag/react";
import { useRef, useState, useEffect } from "react";
import Buttons from "./Buttons";

const Box = () => {
  // 드래그 대상 요소의 Ref
  const draggableRef = useRef<HTMLDivElement>(null);

  // 크기 조절 input Ref
  const widthInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const [imagePaths, setImagePaths] = useState([]);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  // 드래그 기능 활성화
  useDraggable(draggableRef);

  // 크기 상태 (초기값 200)
  const [currentWidth, setCurrentWidth] = useState(200);
  const [currentHeight, setCurrentHeight] = useState(200);
  const [isHandleOpen, setHandleOpen] = useState(false);
  const [isListOpen, setListOpen] = useState(false);

  const handleSizeChange = () => {
    const newWidth = widthInputRef.current
      ? parseInt(widthInputRef.current.value)
      : 200;
    const newHeight = heightInputRef.current
      ? parseInt(heightInputRef.current.value)
      : 200;

    if (!isNaN(newWidth) && newWidth > 0) {
      setCurrentWidth(newWidth);
    }
    if (!isNaN(newHeight) && newHeight > 0) {
      setCurrentHeight(newHeight);
    }
  };
  const handleImageChange = () => {
    if (imagePaths.length === 0) return; // 목록이 없으면 종료

    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    setCurrentImageSrc(imagePaths[randomIndex]);
  };
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/images"); // API 호출
        if (!response.ok) throw new Error("API 호출 실패");

        const paths = await response.json();
        setImagePaths(paths); // 파일 목록 저장

        if (paths.length > 0) {
          setCurrentImageSrc(paths[0]); // 첫 번째 이미지를 기본값으로 설정
        }
      } catch (error) {
        console.error("이미지 목록을 가져오는 데 실패했습니다.", error);
      }
    }
    fetchImages();
  }, []); // 마운트 시 한 번만 실행

  return (
    <div
      ref={draggableRef as React.RefObject<HTMLDivElement>}
      className="absolute flex items-start justify-center cursor-grab "
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className="border flex items-center justify-center text-sm"
          style={{ width: currentWidth, height: currentHeight }}
        >
          {currentImageSrc ? (
            <img
              src={currentImageSrc}
              alt="Random Design"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span>이미지 로딩 중...</span>
          )}
        </div>
        <Buttons
          handleImageChange={handleImageChange}
          isHandleOpen={isHandleOpen}
          isListOpen={isListOpen}
          setHandleOpen={setHandleOpen}
          setListOpen={setListOpen}
        />
      </div>

      {isHandleOpen && (
        <div className="flex space-y-2 flex-col items-start bg-black text-white">
          <div className="flex items-center space-x-1 text-sm">
            <div className="w-10">width</div>
            <input
              type="number"
              ref={widthInputRef as React.RefObject<HTMLInputElement>}
              onChange={handleSizeChange} // 값이 변경될 때마다 크기 변경
              defaultValue={currentWidth}
              className="w-16 border"
            />
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <div className="w-10">height</div>
            <input
              type="number"
              ref={heightInputRef as React.RefObject<HTMLInputElement>}
              onChange={handleSizeChange} // 값이 변경될 때마다 크기 변경
              defaultValue={currentHeight}
              className="w-16 border"
            />
          </div>
        </div>
      )}

      {isListOpen ?? (
        <div className="h-full w-[300px] cursor-pointer relative backdrop-blur-sm overflow-y-auto flex flex-col py-12">
          목록
        </div>
      )}
    </div>
  );
};

export default Box;
