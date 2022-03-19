import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import mainContext from "./context/mainContext";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SingleViewPage from "./pages/SingleViewPage";
import UploadPage from "./pages/UploadPage";
import Toolbar from "./components/Toolbar";
import TitlePage from "./pages/TitlePage";
import {useState} from "react";

function App() {

  const [error, setError] = useState(null)
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState("")
  const [posts, setPosts] = useState([])
  const [singlePost, setSinglePost] = useState(null)
  const [myBookings, setMyBookings] = useState([])
  const [show, setShow] = useState(false)

  return (
    <div className="App">
      <mainContext.Provider value={{error, setError, user, setUser, loggedIn, setLoggedIn, posts, setPosts, singlePost, setSinglePost, myBookings, setMyBookings, show, setShow}}>
        <BrowserRouter>
          <Toolbar/>
          <Routes>
            <Route path="/" element={<TitlePage />}/>
            <Route path="/main" element={<MainPage />}/>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/single/:postId" element={<SingleViewPage />} />
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
    </div>
  );
}

export default App;
