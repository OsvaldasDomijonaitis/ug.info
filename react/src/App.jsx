import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Front } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Front />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      {/* <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}
    </Routes>
  );
}

export default App;
