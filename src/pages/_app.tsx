import "react-toastify/dist/ReactToastify.css"
import "react-widgets/styles.css"

import Head from "next/head"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"
import { useEffect, useState } from "react"

import { AuthProvider } from "../contexts/AuthContext"

import { GlobalStyle } from "../styles/globals"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [sidebar, setSidebar] = useState(false)

  const [isDark, setIsDark] = useState(true)

  function handleSidebarToggle() {
    setSidebar(!sidebar)
  }

  function handleBrowserTheme() {
    const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
    if (prefersColorScheme.matches) {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }

  const showComponent = router.pathname !== "/" && router.pathname !== "/404"

  useEffect(() => {
    handleBrowserTheme()
  }, [])

  return (
    <AuthProvider>
      <Head>
        <link rel="shortcut icon" href={isDark ? "/images/icon.png" : "/images/icon-black.png"} type="image/png" />
      </Head>

      {showComponent && (
        <>
          <Header toggleSidebar={handleSidebarToggle} isOpen={sidebar} />
          <Sidebar toggleSidebar={handleSidebarToggle} isOpen={sidebar} />
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
