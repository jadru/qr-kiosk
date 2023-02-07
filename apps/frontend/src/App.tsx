import React, { useState } from "react";

const App = () => {
  const [value, setValue] = useState(99);
  setInterval(() => {
    value >= 0 && setValue(value - 1);
  }, 1000);
  return (
    <div className="p-16">
      <p className="text-xl">Nuclear lunched detected</p>
      <span className="font-mono yar-6xl text-4xl text-center">
        {/* @ts-ignore */}
        <span style={{ "--value": value, textAlign: "center" }}></span>
      </span>
    </div>
  );
};
export default App;
