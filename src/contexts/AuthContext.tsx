import { createContext, ReactNode, useEffect, useState } from "react"
import { setCookie, destroyCookie } from "nookies"
import { useRouter } from "next/router"

import { api } from "../services/api.service"

import { getAccessToken } from "../helpers/getAccessToken"

type User = {
  id: string
  name: string
  permissions: string[]
  disabled: boolean
  disabled_at?: string
  created_at: string
  updated_at: string
  last_disabled_by?: string
  last_updated_by?: string
}

type SignInProps = {
  username: string
  password: string
  keepConnected: boolean
}

type AuthContextProps = {
  user: User | null
  authenticated: boolean
  signIn: (props: SignInProps) => Promise<void>
  signOut: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)

  const authenticated = !!user

  async function signIn({ username, password, keepConnected }: SignInProps) {
    const {
      data: { user, token },
    } = await api.post("/users/authenticate", {
      username,
      password,
    })

    const ONE_DAY = 60 * 60 * 24

    setCookie(undefined, "@mark-one:token", token, {
      maxAge: keepConnected ? ONE_DAY : undefined,
    })

    setUser(user)

    api.defaults.headers["Authorization"] = `Bearer ${token}`

    router.push("/dashboard")
  }

  function signOut() {
    router.push("/")

    destroyCookie(null, "@mark-one:token", { path: "/" })
    api.defaults.headers["Authorization"] = undefined

    new Promise((resolve) => setTimeout(resolve, 500)).then(() => setUser(null))
  }

  async function loadData() {
    const { accessToken } = getAccessToken()

    if (accessToken) {
      api.defaults.headers["Authorization"] = `Bearer ${accessToken}`

      const { data } = await api.get("/users/token")

      setUser(data)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
