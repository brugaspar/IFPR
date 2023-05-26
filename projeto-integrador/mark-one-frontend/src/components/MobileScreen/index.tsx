import React from "react"

import Head from "next/head"
import { Container, Content } from "./styles"

export const MobileScreen = () => {
  return (
    <Container>
      <Head>
        <title>Mark One | Mobile</title>
      </Head>
      <img src="/images/wave.png" alt="Onda" />
      <Content>
        <div id="logo">
          <img src="/images/logo_com_slogan.png" alt="Mark One" />
        </div>

        <div id="center-image">
          <img src="/images/download.png" alt="Download" />
        </div>

        <div id="text">
          <p>Aplicativo mobile em desenvolvimento</p>
          <span>Em breve nas lojas</span>
        </div>
      </Content>
    </Container>
  )
}
