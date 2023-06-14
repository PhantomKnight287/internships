import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Header from "./components/shared/header";
import RootRoute from "./routes";
import "./App.css";
import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import CreateTask from "./routes/task/create";
import TaskInfo from "./routes/task/slug";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditTask from "./routes/task/edit";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="task">
            <Route path="create" element={<CreateTask />} />
            <Route path=":slug" element={<TaskInfo />} />
            <Route path=":slug/edit" element={<EditTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
