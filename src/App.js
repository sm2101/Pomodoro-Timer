import "./App.css";
import TimerApp from "./Timer";
import Dashboard from "./Dashboard";
import { Notifications } from "react-push-notification";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const App = () => {
  const { userState } = useSelector((state) => ({ ...state }));
  return (
    <>
      <div className="App">
        <Notifications position="bottom-right" />
        <Routes>
          <Route exact path="/" element={<TimerApp />} />
          <Route
            exact
            path="/dashboard"
            element={
              userState.isAuthenticated && userState.user ? (
                <Dashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
