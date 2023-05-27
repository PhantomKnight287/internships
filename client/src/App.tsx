import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/shared/header";
import Register from "./routes/auth/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Login from "./routes/auth/login";
import Events from "./routes/events";
import EventInfo from "./routes/event";
import CreateEvent from "./routes/events/create";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventInfo />} />
          <Route path="/events/create" element={<CreateEvent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
