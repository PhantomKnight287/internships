import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/shared/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./utils/firebase";
import { useUserStore } from "./context/user";
import RootRoute from "./routes";
import Login from "./routes/login";

function App() {
  const setUser = useUserStore((s) => s.setUser);
  useEffect(() => {
    const unsub = getAuth(app).onAuthStateChanged((data) => {
      if (!data) {
        setUser(null);
        return;
      }
      setUser({
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
        uid: data.uid,
      });
    });
    return () => unsub();
  }, []);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
