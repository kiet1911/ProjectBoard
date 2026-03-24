import { useEffect, useRef } from "react";

export const useTypewriter = ({ test, ref }: { test: string[], ref:React.RefObject<HTMLInputElement>|null }) => {
  const topRef = ref;
  const dataTopic = test;

  const currentDataRef = useRef("");
  const arrDataRef = useRef(dataTopic[0].split(""));
  const indexRef = useRef(0);
  const timeoutRef = useRef(0);

  const topicLogin = () => {
    const arrData = arrDataRef.current;

    if (arrData.length > 0) {
      const draw = arrData.shift();
      if (draw) currentDataRef.current += draw;

      topRef.current!.placeholder = currentDataRef.current;

      timeoutRef.current = setTimeout(topicLogin, 40);
    } else {
      if (currentDataRef.current.length > 0) {
        currentDataRef.current = currentDataRef.current.slice(0, -1);
      } else {
        indexRef.current = (indexRef.current + 1) % dataTopic.length;
        arrDataRef.current = dataTopic[indexRef.current].split("");
      }

      topRef.current!.placeholder = currentDataRef.current;

      timeoutRef.current = setTimeout(topicLogin, 40);
    }
  };

  useEffect(() => {
    topicLogin();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
};
