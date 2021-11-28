import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute"

function App() {
  return (
      <div>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<PrivateRoute>
                  <Dashboard />
                </PrivateRoute>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthProvider>
          </Router>
      </div>
  );
}

export default App;
