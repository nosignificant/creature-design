// component/Buttons.tsx
type ButtonsProps = {
  handleImageChange: () => void;
  isHandleOpen: boolean;
  isListOpen: boolean;
  setHandleOpen: (arg: boolean) => void;
  setListOpen: (arg: boolean) => void;
};

const Buttons = ({
  handleImageChange,
  isHandleOpen,
  isListOpen,
  setHandleOpen,
  setListOpen,
}: ButtonsProps) => {
  return (
    <div className="flex text-[0.7rem] backdrop-blur-sm w-[280px]">
      <button className="p-2 cursor-pointer" onClick={handleImageChange}>
        다른 랜덤 이미지
      </button>
      <div>|</div>
      <button
        className="p-2 cursor-pointer"
        onClick={() => setHandleOpen(!isHandleOpen)}
      >
        {isHandleOpen ? "크기 숨기기 " : " 크기 설정 "}
      </button>
      <div>|</div>
      <button
        className="p-2 cursor-pointer"
        onClick={() => setListOpen(!isListOpen)}
      >
        {isListOpen ? "이미지 목록 닫기" : "이미지 목록 열기"}
      </button>
    </div>
  );
};

export default Buttons;
