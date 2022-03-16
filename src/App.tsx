import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { MyRoutes } from "./MyRoutes";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <MyRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        closeButton={false}
        pauseOnHover={false}
        theme="colored"
        style={{
          zIndex: 2147483647,
        }}
      />
    </>
  );
}

export default App;
