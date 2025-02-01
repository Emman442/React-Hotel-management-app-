import { useEffect, useRef } from "react";
import { TbRulerMeasure2 } from "react-icons/tb";

export function useOutsideClick(handler, listenCapturing=true){
    const ref = useRef();
    
      useEffect(
        function () {
          function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
              console.log("Clicked Outside");
              handler();
            }
          }
          document.addEventListener("click", handleClick, listenCapturing);
    
          return () => document.removeEventListener("click", handleClick);
        },
        [handler, listenCapturing]

      );
      return ref;
}