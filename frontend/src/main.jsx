// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import SignupForm from "./components/signup";
import LoginForm from "./components/login";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SignupForm />
      <hr />
      <LoginForm /> */}
      <App />
    </Provider>
  </React.StrictMode>
);
