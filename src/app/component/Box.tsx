// Box.tsx
"use client";

import { useDraggable } from "@neodrag/react";
import { useRef, useState, useEffect } from "react";
import List from "./List";
import Buttons from "./Buttons";

type BoxProps = {
  imagePaths: string[];
  randomKey: number;
};

const Box = ({ imagePaths, randomKey }: BoxProps) => {
  const draggableRef = useRef<HTMLDivElement>(null!);
  useDraggable(draggableRef);

  const [currentWidth, setCurrentWidth] = useState(200);
  const [currentHeight, setCurrentHeight] = useState(200);
  const [isHandleOpen, setHandleOpen] = useState(false);
  const [isListOpen, setListOpen] = useState(false);

  const [currentImageSrc, setCurrentImageSrc] = useState<string>("");

  const widthInputRef = useRef<HTMLInputElement | null>(null);
  const heightInputRef = useRef<HTMLInputElement | null>(null);

  const handleSizeChange = () => {
    const newWidth = widthInputRef.current
      ? parseInt(widthInputRef.current.value)
      : 200;
    const newHeight = heightInputRef.current
      ? parseInt(heightInputRef.current.value)
      : 200;

    if (!isNaN(newWidth) && newWidth > 0) setCurrentWidth(newWidth);
    if (!isNaN(newHeight) && newHeight > 0) setCurrentHeight(newHeight);
  };

  // 🔥 randomKey 바뀔 때마다 이 Box도 자기 이미지 랜덤으로 재설정
  useEffect(() => {
    if (!imagePaths || imagePaths.length === 0) return;
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    setCurrentImageSrc(imagePaths[randomIndex]);
  }, [randomKey, imagePaths]);

  // 기존 개별 랜덤 버튼도 계속 쓸 수 있음
  const handleRandomImage = () => {
    if (!imagePaths || imagePaths.length === 0) return;
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    setCurrentImageSrc(imagePaths[randomIndex]);
  };
  return (
    <div
      ref={draggableRef as React.RefObject<HTMLDivElement>}
      className="absolute flex items-start justify-center cursor-grab"
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className="backdrop-blur-sm flex items-center justify-center text-sm"
          style={{ width: currentWidth, height: currentHeight }}
        >
          {currentImageSrc ? (
            <img
              src={currentImageSrc}
              alt="Random Design"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span>이미지 없음</span>
          )}
        </div>

        <Buttons
          handleImageChange={handleRandomImage} // 개별 랜덤 버튼
          isHandleOpen={isHandleOpen}
          isListOpen={isListOpen}
          setHandleOpen={setHandleOpen}
          setListOpen={setListOpen}
        />
      </div>

      <div className="flex flex-col">
        {isListOpen && (
          <div className="h-[300px] w-[300px] cursor-pointer relative backdrop-blur-sm overflow-y-scroll flex flex-col py-4 px-2 text-sm ml-4">
            <List
              imagePaths={imagePaths}
              setCurrentImageSrc={setCurrentImageSrc}
            />
          </div>
        )}
        {isHandleOpen && (
          <div className="flex space-y-2 flex-col items-start backdrop-blur-sm p-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-10">width</div>
              <input
                type="number"
                ref={widthInputRef}
                onChange={handleSizeChange}
                defaultValue={currentWidth}
                className="w-16 border "
              />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-10">height</div>
              <input
                type="number"
                ref={heightInputRef}
                onChange={handleSizeChange}
                defaultValue={currentHeight}
                className="w-16 border"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Box;
