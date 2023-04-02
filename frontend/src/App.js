import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Layout from './components/Layout/Layout';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/contact" element={<Contact/>}/>
       <Route path="/policy" element={<Policy/>}/>
       <Route path="*" element={<PageNotFound/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
