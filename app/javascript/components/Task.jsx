import React, { useRef, useState, useEffect } from "react";

export default function Task() {
  const [wd, setWd] = useState(0);
  const intervalRef = useRef(null);
  const [color, setColor] = useState("green")

  const startLogic = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setWd(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 100;
        }

        return prev + 10;
      });
    }, 1000);
  };

  const stopLogic = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetLogic = () => {
    stopLogic();
    setWd(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const generalLogic = ()=>{
      paraRef  
  }

  return (
    <div>
      <div style={{ backgroundColor: "red", width: "70%", height: "10px" }}>
        <div
          style={{
            width: `${wd}%`,
            backgroundColor: "green",
            height: "100%"
          }}
        />
      </div>

      <div
        style={{
          width: "40%",
          display: "flex",
          gap: "10px",
          marginTop: "10px"
        }}
      >
        <button onClick={startLogic}>Start</button>
        <button onClick={stopLogic}>Stop</button>
        <button onClick={resetLogic}>Reset</button>
      </div>
      <div>
        <p ref={(el) => (paraRef,current = el)}>hello</p>
        <button onClick={generalLogic}>delete text</button>
      </div>
    </div>
  );
}