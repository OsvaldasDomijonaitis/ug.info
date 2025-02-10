import { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import Login from "./Login";

import TokenContext from "./TokenContext";

function App() {
  // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEyLCJpYXQiOjE3MzQ2OTM4ODgsImV4cCI6MTczNDY5NzQ4OH0.RmOekBrw76fhaHcaL4cweNQrTmkXNjg3YYcSLWw-9U8");
  const [token, setToken] = useState("");

  // sesijos užkrovimas iš sessionStorrage
  const loadSessionData = () => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  };

  useEffect(() => {
    loadSessionData();
  }, []);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {token ? <Dashboard /> : <Login />}
    </TokenContext.Provider>
  );
}

export default App;
