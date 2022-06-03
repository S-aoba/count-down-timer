import { Display } from "./index";
import { useState } from "react";

const Timer = () => {
  const [inputTimer, setTimer] = useState({
    hours: "",
    minutes: "",
    seconds: "",
    flag: true,
  });
  const [displayTimer, setDisplayTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    flag: false,
  });

  const [id, setId] = useState(0);

  const handleChangeHours = (e) => {
    const val = e.target.value;
    const num = Number(val);
    const len = val.length - 1;
    if (inputTimer.flag) {
      if (len > 1) {
        setTimer((inputTimer) => ({ ...inputTimer, hours: "" }));
        setDisplayTimer((displayTimer) => ({ ...displayTimer, hours: 0 }));
      } else {
        setDisplayTimer((displayTimer) => ({ ...displayTimer, hours: num }));
        setTimer((inputTimer) => ({ ...inputTimer, hours: val }));
      }
    }
  };

  const handleChangeMinutes = (e) => {
    const val = e.target.value;
    const num = Number(val);
    const len = val.length - 1;
    if (inputTimer.flag) {
      if (val[0] === "0") setTimer((inputTimer) => ({ ...inputTimer, minutes: "" }));
      else if (num >= 59) {
        setTimer((inputTimer) => ({ ...inputTimer, minutes: "" }));
        setDisplayTimer((displayTimer) => ({ ...displayTimer, minutes: 59 }));
      } else if (len > 1) {
        setTimer((inputTimer) => ({ ...inputTimer, minutes: "" }));
        setDisplayTimer((displayTimer) => ({ ...displayTimer, minutes: 0 }));
        return;
      } else {
        setDisplayTimer((displayTimer) => ({ ...displayTimer, minutes: num }));
        setTimer((inputTimer) => ({ ...inputTimer, minutes: val }));
      }
    }
  };

  const handleChangeSeconds = (e) => {
    const val = e.target.value;
    const num = Number(val);
    const len = val.length - 1;
    if (inputTimer.flag) {
      if (val[0] === "0") setTimer((inputTimer) => ({ ...inputTimer, seconds: "" }));
      else if (num >= 59) {
        setTimer((inputTimer) => ({ ...inputTimer, seconds: "" }));
        setDisplayTimer((displayTimer) => ({ ...displayTimer, seconds: 59 }));
      } else if (len > 1) {
        setTimer((inputTimer) => ({ ...inputTimer, seconds: "" }));
        setDisplayTimer((displayTimer) => ({ ...displayTimer, seconds: 0 }));
        return;
      } else {
        setDisplayTimer((displayTimer) => ({ ...displayTimer, seconds: num }));
        setTimer((inputTimer) => ({ ...inputTimer, seconds: val }));
      }
    }
  };

  const initialInput = (number) => {
    // displayの表示の仕方の規定
    if (number === 0) return "00";
    else if (number < 10) return "0" + number;
    else return number;
  };

  const countDown = () => {
    setDisplayTimer((displayTimer) => ({ ...displayTimer, seconds: displayTimer.seconds - 1 }));
  };

  const start = () => {
    setTimer((inputTimer) => ({ ...inputTimer, flag: false }));
    setDisplayTimer((displayTimer) => ({ ...displayTimer, flag: true }));

    if (!displayTimer.flag) {
      let hoursNum = displayTimer.hours;
      let minutesNum = displayTimer.minutes;
      let secondsNum = displayTimer.seconds;
      const i = setInterval(() => {
        if (hoursNum > 0 && minutesNum === 0 && secondsNum === 0) {
          setDisplayTimer((displayTimer) => ({ ...displayTimer, hours: displayTimer.hours - 1 }));
          setDisplayTimer((displayTimer) => ({ ...displayTimer, minutes: 59 }));
          setDisplayTimer((displayTimer) => ({ ...displayTimer, seconds: 60 }));
          hoursNum--;
          minutesNum = 59;
          secondsNum = 59;
        }
        if (minutesNum > 0 && secondsNum === 0) {
          setDisplayTimer((displayTimer) => ({ ...displayTimer, minutes: displayTimer.minutes - 1 }));
          setDisplayTimer((displayTimer) => ({ ...displayTimer, seconds: 60 }));
          minutesNum--;
          secondsNum = 59;
        }
        secondsNum--;
        countDown();
      }, 1000);
      const stopTime = (displayTimer.hours * 3600 + displayTimer.minutes * 60 + displayTimer.seconds) * 1000;
      setTimeout(() => {
        clearInterval(i);
        reset();
      }, stopTime);
      setId(i);
    }
  };

  //一時停止
  const pause = () => {
    if (displayTimer.flag) clearInterval(id);
    setDisplayTimer((displayTimer) => ({ ...displayTimer, flag: false }));
  };

  //再スタート
  const restart = () => {
    if (!inputTimer.flag) {
      if (!displayTimer.flag) start();
      setDisplayTimer((displayTimer) => ({ ...displayTimer, flag: true }));
    }
  };

  const reset = () => {
    setDisplayTimer((displayTimer) => ({ ...displayTimer, hours: 0 }));
    setDisplayTimer((displayTimer) => ({ ...displayTimer, minutes: 0 }));
    setDisplayTimer((displayTimer) => ({ ...displayTimer, seconds: 0 }));
    setDisplayTimer((displayTimer) => ({ ...displayTimer, flag: false }));

    setTimer((inputTimer) => ({ ...inputTimer, hours: "" }));
    setTimer((inputTimer) => ({ ...inputTimer, minutes: "" }));
    setTimer((inputTimer) => ({ ...inputTimer, seconds: "" }));
    setTimer((inputTimer) => ({ ...inputTimer, flag: true }));

    clearInterval(id);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center">
        <div className="lg:w-2/4 sm:w-full py-3 flex justify-around">
          <input value={inputTimer.hours} onChange={handleChangeHours} type="number" className="pl-3 border-2 border-gray-400" placeholder="時" />
          <input value={inputTimer.minutes} onChange={handleChangeMinutes} type="number" className="pl-3 border-2 border-gray-400" placeholder="分" />
          <input value={inputTimer.seconds} onChange={handleChangeSeconds} type="number" className="pl-3 border-2 border-gray-400" placeholder="秒" />
          <button onClick={start} className="btn btn-primary">
            開始
          </button>
        </div>
      </div>
      <Display hours={initialInput(displayTimer.hours)} minutes={initialInput(displayTimer.minutes)} seconds={initialInput(displayTimer.seconds)} />
      <div className="flex justify-center mt-10">
        <div className="w-5/12 flex justify-around">
          <button onClick={pause} className="btn btn-primary">
            一時停止
          </button>
          <button onClick={restart} className="btn btn-primary">
            再スタート
          </button>
          <button onClick={reset} className="btn btn-primary">
            リセット
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
