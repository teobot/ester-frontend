import { useEffect, useState, useContext } from "react";

import ConfettiExplosion from "@reonomy/react-confetti-explosion";

import { GlobalContext } from "../context/GlobalContext";

export default function ConfettiCannon({ state }) {
  const { enableConfetti, MEGAConfetti } = useContext(GlobalContext);
  const [isExploding, setIsExploding] = useState(false);
  const [preReveal, setPreReveal] = useState(false);

  useEffect(() => {
    if (preReveal !== state.game.reveal) {
      // the game reveal state has changed
      setPreReveal(state.game.reveal);
    }
  }, [state]);

  useEffect(() => {
    if (state.game.reveal && enableConfetti) {
      // reveal has changed and nows its true
      setIsExploding(true);
    }
  }, [preReveal]);

  // enableConfetti is true when the user has enabled confetti in the settings
  const ExplodeProps = MEGAConfetti
    ? {
        force: 1.4,
        duration: 4000,
        particleCount: 200,
        floorHeight: 2000,
        floorWidth: 2000,
      }
    : {
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

  if (!enableConfetti) {
    return null;
  } else {
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
}
