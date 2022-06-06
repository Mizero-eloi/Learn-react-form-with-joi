import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ValidationJoiHome from "./ValidationJoi";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ValidationJoiHome />
    </div>
  );
}

export default App;
