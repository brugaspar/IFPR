import "react-toastify/dist/ReactToastify.css"
import "semantic-ui-css/semantic.min.css"
import type { AppProps } from "next/app"
import { ToastContainer } from "react-toastify"

import { AuthProvider } from "../contexts/AuthContext"

import { GlobalStyle } from "../styles/globals"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />

      <GlobalStyle />
    </AuthProvider>
  )
}