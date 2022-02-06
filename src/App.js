import "./App.css";
import { useEffect } from "react";
import TimerApp from "./Timer";
import Dashboard from "./Dashboard";
import { Notifications } from "react-push-notification";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTodoTasks, getTags } from "./Firebase/db";
import { setTasks } from "./App/Actions/todoActions";
import { getTags as onGetTags } from "./App/Actions/tagActions";
const App = () => {
  const { userState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (userState.isAuthenticated && userState.user) {
      getTodoTasks(userState.user?.id)
        .then((data) => {
          setTasks(dispatch, data);
        })
        .catch((err) => {
          console.error(err);
        });
      getTags(userState.user?.id)
        .then((data) => {
          onGetTags(dispatch, data.tags);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setTasks(dispatch, []);
      onGetTags(dispatch, []);
    }
  }, [dispatch, userState.isAuthenticated, userState.user]);
  return (
    <>
      <div className="App">
        <Notifications position="bottom-right" />
        <Routes>
          <Route exact path="/" element={<TimerApp />} />
          <Route
            path="/dashboard/*"
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
