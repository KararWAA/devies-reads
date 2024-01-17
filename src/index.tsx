import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import BookPage from "./components/book-page";
import Login from "./components/login";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={""} element={<Navigate to="/login" />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="/books" element={<App />} />
        <Route path="books/:id" element={<BookPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
