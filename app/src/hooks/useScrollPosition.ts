import { useEffect, useState } from "react";

type ScrollPositionT = {
    previous: number | null,
    current: number | null
}

const updatePosition = (scrollPosition: ScrollPositionT, setScrollPosition: React.Dispatch<React.SetStateAction<ScrollPositionT>>) => {
    console.log(scrollPosition)
    setScrollPosition({
        previous: scrollPosition.current,
        current: window.scrollY
    })
  };


export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState<ScrollPositionT>({
        previous: null,
        current: window.scrollY
    });

    useEffect(() => {
      const updatePositionWithParamsApplied = () => updatePosition(scrollPosition, setScrollPosition);

      updatePositionWithParamsApplied();
      window.addEventListener("scroll", updatePositionWithParamsApplied);

      return () => window.removeEventListener("scroll", updatePositionWithParamsApplied);
    }, []);

    return [scrollPosition];
};
