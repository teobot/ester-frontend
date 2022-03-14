import React, { useRef, useEffect } from "react";

export default function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setHover(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown_" + props.index, handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener(
          "mousedown_" + props.index,
          handleClickOutside
        );
      };
    }, [ref]);
  }

  return (
    <div key={props.index} onClick={props.onClick} ref={wrapperRef}>
      {props.children}
    </div>
  );
}
