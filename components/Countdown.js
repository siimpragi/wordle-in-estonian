import { useState, useEffect } from "react";

const Countdown = ({ toTs }) => {
  const nowTs = Math.round(new Date().getTime() / 1000);
  const [remaining, setRemaining] = useState(toTs - nowTs);
  useEffect(() => {
    if (remaining > 0) {
      const timeoutID = setTimeout(() => {
        setRemaining(remaining - 1);
      }, 1000);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [remaining]);

  const clockString = new Date(remaining * 1000).toISOString().slice(11, 19);

  return <div>{clockString}</div>;
};

export default Countdown;
