import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Front } from "@/layouts";
import UserContext from "@/UserContext";
import { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");
    setUser(user);
    setToken(token);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser, token, setToken]}>
      <Routes>
        <Route path="*" element={<Front />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        {/* <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
