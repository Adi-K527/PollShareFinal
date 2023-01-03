import {BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom"
import StartingPage from "./pages/StartingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Compose from "./pages/Compose"
import Results from "./pages/Results"
import PostResults from "./pages/Postresults"


function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<Post/>} />
          <Route path="/compose" element={<Compose/>} />
          <Route path="/results" element={<Results/>} />
          <Route path="/results/:id" element={<PostResults/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
