import { useEffect } from "react";
import { useReward } from "react-rewards";

const CONFETTI_ID = "confetti";

const Confetti = () => {
  const { reward } = useReward(CONFETTI_ID, "confetti", {
    lifetime: 500,
  });

  useEffect(() => {
    reward();
  }, []);

  return (
    <div
      id={CONFETTI_ID}
      style={{
        position: "fixed",
        left: "50%",
        top: "33%",
        transform: "translateX(-50%)",
      }}
    />
  );
};

export default Confetti;
