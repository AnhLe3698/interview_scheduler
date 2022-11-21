import {useState} from "react";

export default function useVisualMode(modeIn) {
  const [mode, setMode] = useState(modeIn)
  const [history, setHistory] = useState([modeIn]);

  function transition(changeMode, replace = false) {
    setMode(changeMode);
    setHistory((prev) => {
      let newArray = [...prev];
      if (replace) {
        newArray.pop();
        newArray.push(`${changeMode}`)
      } else {
        newArray.push(`${changeMode}`)
      }
      return newArray;
    })
  }

  function back() {
    let lastValue;
    setHistory((prev) => {
      if (prev.length > 1) {
        console.log(prev)
        lastValue = prev[prev.length - 2];
        setMode(lastValue)
        let newArray = [...prev];
        newArray.pop()
        return newArray;
      } else {
        console.log(prev)
        lastValue = prev[0];
        setMode(lastValue)
        return prev;
      }
    })
  }

  return {
    mode,
    transition,
    back
  };
}

