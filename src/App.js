import "./App.css";
import { useState } from "react";
import Timer from "./Components/Timer";
import SettingDialog from "./Components/Dialogs/Settings";
const App = () => {
  const [bg] = useState("https://picsum.photos/1920/1080");
  return (
    <div className="App" style={{ background: `url(${bg})` }}>
      <Timer />
      <SettingDialog />
    </div>
  );
};

export default App;
