import { useEffect, useRef, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<
    [number, number, boolean, number]
  >([
    window.innerWidth,
    window.innerHeight,
    window.innerHeight > window.innerWidth,
    window.innerHeight / window.innerWidth,
  ]);
  const timeOutRef = useRef(null);

  useEffect(() => {
    const setResize = () => {
      setWindowSize([
        window.innerWidth,
        window.innerHeight,
        window.innerHeight > window.innerWidth,
        window.innerHeight / window.innerWidth,
      ]);
    };
    const handleResize = () => {
      clearTimeout(timeOutRef.current);

      const timeOutId = setTimeout(setResize, 100);

      timeOutRef.current = timeOutId;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeOutRef.current);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
