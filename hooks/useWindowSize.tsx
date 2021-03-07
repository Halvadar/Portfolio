import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<[number, number, boolean]>([
    window.innerWidth,
    window.innerHeight,
    window.innerHeight > window.innerWidth,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize([
        window.innerWidth,
        window.innerHeight,
        window.innerHeight > window.innerWidth,
      ]);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
