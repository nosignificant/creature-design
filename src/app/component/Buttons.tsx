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
  {
    /* 버튼들 */
  }
  <div className="flex text-[0.7rem] backdrop-blur-sm ">
    <button className="p-1" onClick={handleImageChange}>
      다른 랜덤 이미지 /
    </button>

    <button className="p-1" onClick={() => setHandleOpen(!isHandleOpen)}>
      {isHandleOpen ? "크기 숨기기" : "크기 설정"}
    </button>
    <button className="p-1" onClick={() => setListOpen(!isHandleOpen)}>
      {isListOpen ? "목록에서 이미지 선택" : "닫기"}
    </button>
  </div>;
};
export default Buttons;
