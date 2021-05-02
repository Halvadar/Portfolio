import { useEffect, useRef, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    windowWidth: number;
    windowHeight: number;
    windowHeightIsGreater: boolean;
    windowRatio: number;
    mobileDevice: boolean;
  }>({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    windowHeightIsGreater: window.innerHeight > window.innerWidth,
    windowRatio: window.innerHeight / window.innerWidth,
    mobileDevice: window.innerWidth <= 768,
  });
  const timeOutRef = useRef(null);

  useEffect(() => {
    const setResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        windowHeightIsGreater: window.innerHeight > window.innerWidth,
        windowRatio: window.innerHeight / window.innerWidth,
        mobileDevice: window.innerWidth <= 768,
      });
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
