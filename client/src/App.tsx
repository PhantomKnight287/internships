import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Register from "./routes/auth/register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/auth/login"
            element={
              <div>
                <h1>Login</h1>
              </div>
            }
          />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
