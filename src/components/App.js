import Signup from "./Signup";

function App() {
  return (
    <div class="hero min-h-screen bg-base-200">
  <div class="flex-col justify-center hero-content lg:flex-row">
    <div class="text-center lg:text-left">
      <h1 class="mb-5 text-5xl font-bold">
            Hello there
      </h1> 
    </div> 
    <Signup />
  </div>
</div>
  );
}

export default App;
