import { useState } from "react";


export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    console.log('mode:', mode)

    const transition = (newMode) => {
      setMode(newMode);
      console.log('Historystart:', history);
      console.log('modeafter:', newMode);
      setHistory(prev => prev = [...prev, newMode]);
    }

     const back = () => {
       if (history.length > 1) {
         history.pop();
         setMode(history[history.length-1])
       }
       
       console.log('history:', history)
       console.log('modeafterback:', mode);

     };


    return { mode, transition, back };
}
