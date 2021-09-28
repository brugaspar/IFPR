import { GetServerSideProps } from "next"
import { useRef, useState, FormEvent } from "react"
import { FaCheckSquare } from "react-icons/fa"
import { toast } from "react-toastify"

import { Input } from "../components/Input"

import { getAccessToken } from "../helpers/getAccessToken"
import { useAuth } from "../hooks/useAuth"

import { Container, Content } from "../styles/home.styles"

export default function Home() {
  const { signIn } = useAuth()

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const [checkbox, setCheckbox] = useState(false)

  function handleToggleCheckbox() {
    setCheckbox(!checkbox)
  }

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()

    try {
      await signIn({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        keepConnected: checkbox
      })
    } catch (error: any) {
      console.log(error.response.data)
      if (error.response.data.message) {
        if (Array.isArray(error.response.data.message)) {
          for (const message of error.response.data.message) {
            toast.error(message)
          }
        } else {
          toast.error(error.response.data.message)
        }
      } else {
        toast.error("Problemas internos")
      }
    }
  }

  return (
    <Container>
      <img
        src="/images/wave.png"
        alt="Onda"
      />

      <Content>
        <div className="illustration">
          <h1>Gerencie seus membros de forma fácil</h1>

          <img src="/images/illustration.png" alt="Trabalho em equipe" />

          <p>
            O melhor para seus membros, ganhando
            praticidade e controle no seu negócio
          </p>
        </div>

        <div className="sign-in">
          <img src="/images/logo.png" alt="Mark One" />

          <form onSubmit={handleSignIn}>
            <label htmlFor="email">E-mail</label>
            <Input
              id="email"
              type="email"
              inputType="email"
              placeholder="Informe seu e-mail"
              inputRef={emailRef}
            />

            <label htmlFor="password">Senha</label>
            <Input
              id="password"
              type="password"
              inputType="password"
              placeholder="Informe sua senha"
              inputRef={passwordRef}
            />

            <button
              type="button"
              className="checkbox"
              onClick={handleToggleCheckbox}
            >
              {checkbox ? (
                <FaCheckSquare
                  size={25}
                  color="var(--text-title)"
                />
              ) : (
                <span />
              )}

              <h5>Manter conectado</h5>
            </button>

            <button type="submit">Entrar</button>
          </form>
        </div>
      </Content>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = getAccessToken(ctx)

  if (accessToken) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    }
  }

  return {
    props: {
    }
  }
}