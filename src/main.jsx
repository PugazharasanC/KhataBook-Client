import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer
      position="top-right" // Position of the toast
      autoClose={5000} // Auto close after 5 seconds
      hideProgressBar={false} // Whether to show the progress bar
      newestOnTop={true} // Position new toasts on top of the others
      closeOnClick={true} // Whether to close the toast when clicked
      rtl={false} // If you need right-to-left layout
      pauseOnFocusLoss={false} // Pause toast if the user clicks out of focus
      draggable={true} // Allow toasts to be draggable
      pauseOnHover={true} // Pause on hover
    />
    <App />
  </Provider>
);
