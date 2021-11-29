import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute"
import Coinlist from "./Coinlist";
import CoinData from "./CoinData";
import Navbar from "./Navbar";

function App() {
  return (
      <div>
          <Router>
            <AuthProvider>
              <Routes>
                  <Route path="/" element={<PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>} />
                
                <Route path="/search" element={<Coinlist />} />
                <Route path="/data/:id" element={<CoinData />} />

                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthProvider>
          </Router>
      </div>
  );
}

export default App;
