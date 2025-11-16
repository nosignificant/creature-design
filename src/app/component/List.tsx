type ListProps = {
  imagePaths: string[];
  setCurrentImageSrc: (arg: string) => void;
};

const List = ({ imagePaths, setCurrentImageSrc }: ListProps) => {
  if (imagePaths.length === 0) {
    return <p className="text-xs text-gray-300">이미지를 찾을 수 없습니다.</p>;
  }

  return (
    <>
      {imagePaths.map((path) => (
        <button
          key={path}
          className="w-full flex items-center space-x-2 hover:bg-black/10 p-1 transition"
          onClick={() => setCurrentImageSrc(path)}
        >
          <div className="w-10 h-10 border overflow-hidden flex-shrink-0">
            <img
              src={path}
              alt="thumb"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[0.7rem] break-all">
            {path.replace("/images/", "")}
          </span>
        </button>
      ))}
    </>
  );
};

export default List;
