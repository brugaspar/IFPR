import "react-toastify/dist/ReactToastify.css"

import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"

import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"

import { AuthProvider } from "../contexts/AuthContext"

import { GlobalStyle } from "../styles/globals"
import { useState } from "react"

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  function handleSidebarToggle() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <AuthProvider>
      {router.pathname !== "/" && router.pathname !== "/404" && (
        <>
          <Header isSidebarOpen={isSidebarOpen} sidebarToggle={handleSidebarToggle} />
          <Sidebar isSidebarOpen={isSidebarOpen} />
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