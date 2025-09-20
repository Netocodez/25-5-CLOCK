import React, {useEffect, useState, useRef} from 'react';
import './App.css';

function App() {
  const [sessionlength, setSessionlength] = useState(25);
  const [breaklength, setBreaklength] = useState(5);
  const [timeleft, setTimeLeft] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [isbreak, setIsBreak] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            const audio = document.getElementById('beep') as HTMLAudioElement;
            audio.currentTime = 0;
            audio.play();
            if (isbreak) {
              setIsBreak(false);
              return sessionlength * 60;
            } else {
              setIsBreak(true);
              return breaklength * 60;
            }
          }
          return prev - 1;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isbreak, sessionlength, breaklength]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSessionlength(25);
    setBreaklength(5);
    setTimeLeft(25 * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const audio = document.getElementById('beep') as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };

  const decbreak = () => {
    if (breaklength > 1) {
      setBreaklength(breaklength - 1);
      if (isbreak) {
        setTimeLeft((breaklength - 1) * 60);
      }
    }
  }

  const incbreak = () => {
    if (breaklength < 60) {
      setBreaklength(breaklength + 1);
      if (isbreak) {
        setTimeLeft((breaklength + 1) * 60);
      }
    }
  }

  const decsession = () => {
    if (sessionlength > 1) {
      setSessionlength(sessionlength - 1);
      if (!isbreak) {
        setTimeLeft((sessionlength - 1) * 60);
      }
    }
  }

  const incsession = () => {
    if (sessionlength < 60) {
      setSessionlength(sessionlength + 1);
      if (!isbreak) {
        setTimeLeft((sessionlength + 1) * 60);
      }
    }
  } 

  return (
    <div className="clock-container">
      <h1>25 + 5 Clock</h1>
      <div className="length-controls">
        <div className="break-control">
          <h2 id="break-label">Break Length</h2>
          <div className="buttons">
            <button id="break-decrement" onClick={decbreak}>-</button>
            <span id="break-length">{breaklength}</span>
            <button id="break-increment" onClick={incbreak}>+</button>
          </div>
        </div>
        <div className="session-control">
          <h2 id="session-label">Session Length</h2>
          <div className="buttons">
            <button id="session-decrement" onClick={decsession}>-</button>
            <span id="session-length">{sessionlength}</span>
            <button id="session-increment" onClick={incsession}>+</button>
          </div>
        </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{isbreak ? 'Break' : 'Session'}</h2>
        <span id="time-left">{formatTime(timeleft)}</span>
      </div>
      <div className="controls">
        <button id="start_stop" onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>  
      {/* Beep audio (must be ≥1s long) */}
      <audio
        id="beep"
        preload="auto"
        src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
      />
    </div>
  );
}

export default App;
