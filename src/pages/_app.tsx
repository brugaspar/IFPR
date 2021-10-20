import "react-toastify/dist/ReactToastify.css"

import Head from "next/head"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"
import { useState } from "react"

import { AuthProvider } from "../contexts/AuthContext"

import { GlobalStyle } from "../styles/globals"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [sidebar, setSidebar] = useState(false)

  function handleSidebarToggle() {
    setSidebar(!sidebar)
  }

  const showComponent = router.pathname !== "/" && router.pathname !== "/404"

  return (
    <AuthProvider>
      <Head>
        <link rel="shortcut icon" href="/images/icon.png" type="image/png" />
      </Head>

      {showComponent && (
        <>
          <Header toggleSidebar={handleSidebarToggle} isOpen={sidebar} />
          <Sidebar isOpen={sidebar} />
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
