import {useState} from "react";

// Custom hook creates a history of modes
export default function useVisualMode(modeIn) {
  const [mode, setMode] = useState(modeIn)
  const [history, setHistory] = useState([modeIn]);

  // This function will add on to the history or will transmute the current mode and will change the history
  function transition(changeMode, replace = false) {
    setMode(changeMode);
    setHistory(() => {
      let newArray = [...history];
      if (replace) {
        newArray.pop();
        newArray.push(`${changeMode}`)
      } else {
        newArray.push(`${changeMode}`)
      }
      return newArray;
    })
  }

  // This funciton goes back to the previous mode
  function back() {
    let lastValue;
    setHistory((prev) => {
      if (prev.length > 1) {
        
        lastValue = prev[prev.length - 2];
        setMode(lastValue)
        let newArray = [...prev];
        newArray.pop()
        return newArray;
      } else {
        
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

