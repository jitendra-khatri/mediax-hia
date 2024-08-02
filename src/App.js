import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Privateroute from "./component/Privateroute";
import Listings from "./pages/Listings";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Privateroute/>}>
        <Route path="/" element={<Home/>} />
        </Route>
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/listings" element={<Listings/>} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
