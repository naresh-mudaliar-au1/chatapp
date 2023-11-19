import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route />
        </Routes>
      </Router>
    </>
  );
}

export default App;
