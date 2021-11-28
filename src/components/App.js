import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    
      <div class="hero min-h-screen bg-base-200">
        <div class="flex-col justify-center hero-content lg:flex-row">
          <div class="text-center lg:text-left">
            <h1 class="mb-5 text-5xl font-bold">
            Welcome to 
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">CoinSim</h1>
            </h1> 
          </div> 
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </div>
    
  );
}

export default App;
