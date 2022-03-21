import { useEffect, useState } from "react";

import ConfettiExplosion from "@reonomy/react-confetti-explosion";

export default function ConfettiCannon({ state }) {
  const [isExploding, setIsExploding] = useState(false);
  const [preReveal, setPreReveal] = useState(false);

  useEffect(() => {
    if (preReveal !== state.game.reveal) {
      // the game reveal state has changed
      setPreReveal(state.game.reveal);
    }
  }, [state]);

  useEffect(() => {
    if (state.game.reveal) {
      // reveal has changed and nows its true
      setIsExploding(true);
    }
  }, [preReveal]);

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
