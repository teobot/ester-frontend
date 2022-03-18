import { useEffect, useState } from "react";

import ConfettiExplosion from "@reonomy/react-confetti-explosion";

export default function ConfettiCannon({ state }) {
  const [isExploding, setIsExploding] = useState(false);
  const [hasExploded, setHasExploded] = useState(false);

  useEffect(() => {
    console.log(state.game.reveal);
    if (state.game.reveal && !hasExploded) {
      setIsExploding(true);
      console.log("exploding", state.game.reveal);
    } else if (!state.game.reveal && hasExploded) {
      setHasExploded(false);
    }
  }, [state]);

  const ExplodeProps = {
    force: 0.7,
    particleCount: 100,
    duration: 4000,
    floorHeight: 1000,
    floorWidth: 1000,
  };

  useEffect(() => {
    if (isExploding) {
      setTimeout(() => {
        setIsExploding(false);
        setHasExploded(true);
      }, ExplodeProps.duration);
    }
  }, [isExploding]);

  return (
    <div
      key="explosion-container"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        right: "50%",
        bottom: "50%",
      }}
    >
      {isExploding && (
        <ConfettiExplosion key="explosion-object" {...ExplodeProps} />
      )}
    </div>
  );
}
