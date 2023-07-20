import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import NeoList from "./components/NeoList/NeoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NeoList></NeoList>
    </div>
  );
}

export default App;
