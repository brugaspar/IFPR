import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"

import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"

import { AuthProvider } from "../contexts/AuthContext"

import { GlobalStyle } from "../styles/globals"

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [visible, setVisible] = useState(false)

  function handleSidebarToggle() {
    setVisible(!visible)
  }

  return (
    <AuthProvider>
      {router.pathname !== "/" && router.pathname !== "/404" && (
        <>
          <Header sidebarToggle={handleSidebarToggle} />
          <Sidebar visible={visible} sidebarToggle={handleSidebarToggle} />
        </>
      )}

      <Component {...pageProps} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
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