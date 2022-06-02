import { Display } from "./index";
import { useState } from "react";

const Timer = () => {
  const [inputTimer, setTimer] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [displayNumber, setDisplayNumber] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleInputHour = (e) => {
    const val = e.target.value;
    if (val.length < 3 && val[0] !== "0") {
      setTimer((inputTimer) => ({ ...inputTimer, hours: val }));
      setDisplayNumber((displayNumber) => ({ ...displayNumber, hours: Number(val) }));
    }
  };

  const handleInputMinutes = (e) => {
    const val = e.target.value;
    const num = Number(val);
    if (val.length < 3 && num < 60 && val[0] !== "0") {
      setTimer((inputTimer) => ({ ...inputTimer, minutes: val }));
      setDisplayNumber((displayNumber) => ({ ...displayNumber, minutes: Number(val) }));
    }
  };

  const handleInputSeconds = (e) => {
    const val = e.target.value;
    const num = Number(val);
    if (val.length < 3 && num < 60 && val[0] !== "0") {
      setTimer((inputTimer) => ({ ...inputTimer, seconds: val }));
      setDisplayNumber((displayNumber) => ({ ...displayNumber, seconds: Number(val) }));
    }
  };

  const isInitialVal = (val) => {
    return val == "" ? "00" : val;
  };

  const countDown = () => {
    setDisplayNumber((displayNumber) => ({ ...displayNumber, seconds: displayNumber.seconds - 1 }));
  };

  const start = () => {
    let hoursCount = displayNumber.hours;
    let minutesCount = displayNumber.minutes;
    let secondsCount = displayNumber.seconds;

    const id = setInterval(() => {
      secondsCount--;
      if (minutesCount > 0 && secondsCount < 0) {
        setDisplayNumber((displayNumber) => ({ ...displayNumber, seconds: 60 }));
        setDisplayNumber((displayNumber) => ({ ...displayNumber, minutes: displayNumber.minutes - 1 }));
        minutesCount--;
        secondsCount = 59;
      } else if (hoursCount == 0 && minutesCount == 0 && secondsCount == 0) clearInterval(id);

      countDown();
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center">
        <div className="lg:w-2/4 sm:w-full py-3 flex justify-around">
          <input value={inputTimer.hours} onChange={handleInputHour} type="number" className="pl-3 border-2 border-gray-400" placeholder="時間" />
          <input value={inputTimer.minutes} onChange={handleInputMinutes} type="number" className="pl-3 border-2 border-gray-400" placeholder="分" />
          <input value={inputTimer.seconds} onChange={handleInputSeconds} type="number" className="pl-3 border-2 border-gray-400" placeholder="秒" />
          <button onClick={start} className="btn btn-primary">
            開始
          </button>
        </div>
      </div>
      <Display hours={isInitialVal(displayNumber.hours)} minutes={isInitialVal(displayNumber.minutes)} seconds={isInitialVal(displayNumber.seconds)} />
      <div className="flex justify-center mt-10">
        <div className="w-5/12 flex justify-around">
          <button className="btn btn-primary">一時停止</button>
          <button className="btn btn-primary">再スタート</button>
          <button className="btn btn-primary">リセット</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
