import { useEffect, useState } from "react";
export default function GetDimensions(ref) {
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  const getS = () => {
    if (ref.current) {
      setW(ref.current.clientWidth);
      setH(ref.current.clientHeight);
    }
  };

  useEffect(() => {
    getS();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getS);
    return () => {
      window.removeEventListener("resize", getS);
    };
  }, []);

  return {
    width: w,
    height: h,
  };
}
