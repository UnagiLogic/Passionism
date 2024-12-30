import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

function SleepScreen({ handleWakeUp }: { handleWakeUp: () => void }) {
  const isSleeping = useSelector((state: RootState) => state.game.isSleeping); // Access isSleeping from Redux store
  const [timeSlept, setTimeSlept] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isSleeping) {
      interval = setInterval(() => {
        setTimeSlept((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [isSleeping]);

  return (
    <div className="sleep-screen">
      <h2>Sleeping...</h2>
      <p>Time slept: {timeSlept} seconds</p> {/* Display time slept */}
      <button onClick={handleWakeUp}>Wake Up</button>
    </div>
  );
}

export default SleepScreen;