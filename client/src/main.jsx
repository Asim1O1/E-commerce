import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // Import App
import { Provider } from "react-redux"; // Import Provider
import store from "./store/store.js"; // Import your store

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* Wrap the App in Provider */}
    <App /> {/* Render the App component */}
  </Provider>
);
