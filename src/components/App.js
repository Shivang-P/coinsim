import Signup from "./Signup";

function App() {
  return (
    <div className="grid grid-cols-2 gap-4" style={{minHeight: "100vh"}}>
      <div className="col-auto" style={{maxWidth: "400px"}}>
        <Signup />
      </div>
    </div>
  );
}

export default App;
