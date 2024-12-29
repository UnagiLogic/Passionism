import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { sleep } from "../src/gameSlice"; // Assuming you have a sleep action to toggle sleep state

function SleepScreen() {
  const dispatch = useDispatch();
  const isSleeping = useSelector((state: RootState) => state.game.isSleeping); // Assuming you have an isSleeping state
  const [timeSlept, setTimeSlept] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isSleeping) {
      interval = setInterval(() => {
        setTimeSlept((prevTime) => prevTime + 1); // Increment timeSlept every second
      }, 1000);
    } else {
      clearInterval(interval); // Clear interval when player wakes up
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isSleeping]);

  const handleWakeUp = () => {
    dispatch(sleep()); // Dispatch action to toggle sleep state
    console.log("Is player sleeping?", {isSleeping});
  };

  return (
    <div className="sleep-screen">
      <h2>Sleeping...</h2>
      <p>Time slept: {timeSlept} seconds</p> {/* Display time slept */}
      <button onClick={handleWakeUp}>Wake Up</button>
    </div>
  );
}

export default SleepScreen;