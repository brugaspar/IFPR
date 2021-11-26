import React from "react"

import Head from "next/head"
import { Container , Content } from "./styles"

export const MobileScreen = () => {
    return (
        <Container>
            <Head>
                <title>Mark One | Mobile : Em Breve</title>
            </Head>

            <img src="/images/backgroundMobile.jpg" alt="Wallpaper Mobile" />

            <Content>
                <div id="divLogo">
                    <img src="/images/logo_com_slogan.png" alt="" />
                </div> 
                <div id="divText">
                    <p>Em breve disponivel </p>
                </div>
                <div id="divImgs">
                    <img className="downloadImage" src="/images/appStore.png" alt="AppStore e PlayStore" />  
                </div>
            </Content>
        </Container>
    )
  }