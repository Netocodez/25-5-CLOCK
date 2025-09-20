# 25 + 5 Clock ⏱️

A simple **Pomodoro-style timer** built with React and TypeScript.  
This app lets you set a session (work) length and a break length, then automatically counts down and switches between them. It also plays a beep sound when switching.
https://netocodez.github.io/25-5-CLOCK/

<img width="1280" height="596" alt="image" src="https://github.com/user-attachments/assets/f95c84e2-4d8a-4cdc-9bfa-46796c062e7b" />



## Features

- Adjustable **Session Length** (1–60 minutes)
- Adjustable **Break Length** (1–60 minutes)
- Start / Pause and Reset controls
- Automatic switching between session and break when time runs out
- Audible notification using a preloaded beep sound

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Netocodez/25-5-CLOCK.git
cd your-repo
```

### 2. Install dependencies
```
npm install
```

### 3. Run locally
```
npm start
```
or, if you’re using Vite:
```
npm run dev
```

### 4. Build for production
```
npm run build
```
## Usage

- Adjust lengths using the +/– buttons under “Break Length” and “Session Length.”

- Press Start to begin the countdown.

- The label changes to “Break” or “Session” depending on the current phase.

- Press Pause to stop the countdown without resetting.

- Press Reset to restore defaults and stop any sound.


## Code Overview
The main component is `App.tsx`.

### State variables

- sessionlength – current session length in minutes (default 25).

- breaklength – current break length in minutes (default 5).

- timeleft – countdown time left in seconds.

- isRunning – whether the timer is currently running.

- isbreak – whether we are currently on a break.

- intervalRef – a ref to store the interval ID so we can clear it between renders.

### Core logic
- Timer control is inside a useEffect. When isRunning is true, it sets an interval to decrease timeleft every second.

#### When timeleft reaches 0:

- A beep sound plays from an <audio> element with id="beep".

- The app toggles between break and session mode:

- If we were on break, it switches to session and sets timeleft to sessionlength * 60.

- If we were on session, it switches to break and sets timeleft to breaklength * 60.

Start / Pause button toggles isRunning.

#### Reset button:

- Stops the interval, resets state to defaults, and rewinds the audio.

#### Increment/Decrement handlers:

- Adjust session or break length only when appropriate.

- Also update timeleft immediately if you’re adjusting the currently active phase.

### Formatting time

`formatTime(time: number)` converts seconds to `MM:SS` string with leading zeros.

### Audio

An `<audio>` element with `id="beep"` is included at the bottom of the JSX. The app calls `audio.play()` whenever the timer hits zero.
## License

[MIT](https://choosealicense.com/licenses/mit/)

