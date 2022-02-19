import { useState, useEffect } from "react";

const Countdown = ({ toTs }) => {
  const nowTs = Math.round(new Date().getTime() / 1000);
  const [secondsRemaining, setSecondsRemaining] = useState(toTs - nowTs);
  useEffect(() => {
    if (secondsRemaining > 0) {
      setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    }
  }, [secondsRemaining]);

  const clockString = new Date(secondsRemaining * 1000)
    .toISOString()
    .slice(11, 19);

  return <div>{clockString}</div>;
};

export default Countdown;
